import mongoose, { Document } from 'mongoose';

export interface ITokenSchema extends Document {
  _userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const TokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

export default mongoose.model<ITokenSchema>('EmailVerification', TokenSchema);
