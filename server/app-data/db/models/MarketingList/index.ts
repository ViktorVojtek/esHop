import mongoose, { Document } from 'mongoose';

export interface IMarketingList extends Document {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
}

const MarketingListSchema = new mongoose.Schema({
  email: String,
  tel: String,
  firstName: String,
  lastName: String,
});

export default mongoose.model<IMarketingList>(
  'MarketingList',
  MarketingListSchema
);
