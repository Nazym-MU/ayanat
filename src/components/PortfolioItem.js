import mongoose from 'mongoose';

const PortfolioItemSchema = new mongoose.Schema({
  mediaType: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  title: { type: String, required: true },
  medium: { type: String },
  size: { type: String },
  date: { type: String, required: true }
});

export default mongoose.model('PortfolioItem', PortfolioItemSchema);
