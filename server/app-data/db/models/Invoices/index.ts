import mongoose, { Document } from 'mongoose';

export interface IInvoices extends Document {
  name: string;
  count: number;
}

const InvoicesSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

export default mongoose.model<IInvoices>('Invoices', InvoicesSchema);
