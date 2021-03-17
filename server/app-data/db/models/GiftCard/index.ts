import mongoose, { Document } from 'mongoose';

export interface IGiftCard extends Document {
  title: string;
  image: object;
  textColor: string;
  borderColor: string;
}
const GiftCardSchema = new mongoose.Schema({
  title: String,
  image: Object,
  textColor: String,
  borderColor: String,
});

const GiftCard = mongoose.model<IGiftCard>('GiftCard', GiftCardSchema);

export default GiftCard;
