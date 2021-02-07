import mongoose, { Document } from 'mongoose';

export interface IGiftCard extends Document {
  title: string;
  image: object;
}
const GiftCardSchema = new mongoose.Schema({
  title: String,
  image: Object,
});

const GiftCard = mongoose.model<IGiftCard>('GiftCard', GiftCardSchema);

export default GiftCard;
