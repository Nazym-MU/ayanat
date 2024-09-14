import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    const email = emails[0].value;

    try {
      const userResult = await pool.query(
        'SELECT * FROM users WHERE google_id = $1 OR email = $2',
        [id, email]
      );

      let user = userResult.rows[0];

      if (!user) {
        const insertResult = await pool.query(
          'INSERT INTO users (name, email, google_id, role) VALUES ($1, $2, $3, $4) RETURNING *',
          [displayName, email, id, 'admin']
        );
        user = insertResult.rows[0];
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  done(null, userResult.rows[0]);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/oauth/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/admin');
  }
);

app.get('/api/portfolio', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM portfolio_items');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/');
}

app.get('/admin', isAdmin, (req, res) => {
  res.send('Welcome to the admin dashboard. You can manage posts here.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
