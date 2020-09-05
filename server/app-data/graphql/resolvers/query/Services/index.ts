import Service, { IService } from '../../../../db/models/Service';

export default async (root: any, args: any, ctx: any): Promise<IService[]> => {
  try {
    const services = (await Service.find({})) || [];

    return services;
  } catch (err) {
    throw new Error(err);
  }
};
