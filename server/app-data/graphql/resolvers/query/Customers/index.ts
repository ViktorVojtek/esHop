import Customer from '../../../../db/models/Customer';

export default async () => {
  const customers = await Customer.find({});

  return customers || [];
};
