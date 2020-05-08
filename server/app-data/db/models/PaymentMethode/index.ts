import mongoose, { Document } from 'mongoose';

interface IPaymentMethode extends Document {
  title: string;
  value: number;
}

const PaymentSchema: mongoose.Schema<IPaymentMethode> = new mongoose.Schema({
  title: String,
  value: Number,
});

const PaymentMethode = mongoose.model<IPaymentMethode>(
  'PaymentMethode',
  PaymentSchema
);

export default PaymentMethode;
