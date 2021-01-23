import Service, { IService } from '../../../../db/models/Service';
import ModError from '../../utils/error';

const serviceBySlug: (
  root: any,
  args: any,
  ctx: any
) => Promise<IService> = async (root, { slug }, ctx) => {
  const service = await Service.findOne({ slug });

  if (!service) {
    throw new ModError(404, 'Product not exist');
  }

  return service;
};

export default serviceBySlug;
