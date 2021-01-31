import mongoose from 'mongoose';
import Service, { IService } from '../../../../db/models/Service';
import { storeFile } from '../../utils';
import ModError from '../../utils/error';

const updateService: (
  root: any,
  args: any,
  ctx: any
) => Promise<IService> = async (root, { _id, serviceInput }, ctx) => {
  try {
    const serviceExist: IService = await Service.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!serviceExist) {
      throw new ModError(404, 'Service not exist');
    }

    const { img, ...restServiceData } = serviceInput;
    const serviceData = (restServiceData as unknown) as IService;

    if ((img as any).base64) {
      const vId = `${_id}-${restServiceData.title.toUpperCase()}`;

      const fileData = {
        fileName: (img as any).title,
        fileBase64Data: (img as any).base64,
        dirName: vId,
        extension: (img as any).ext,
      };

      const imgPath = await storeFile(fileData);

      const { base64, ...restImgData } = img as any;
      const imageData = {
        ...restImgData,
        path: imgPath,
      };

      serviceData.img = imageData;
    }

    const updatedService = await Service.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(_id),
      },
      {
        $set: {
          category: serviceData.category,
          discount: serviceData.discount,
          html: serviceData.html,
          img: serviceData.img,
          price: serviceData.price,
          subCategory: serviceData.subCategory,
          title: serviceData.title,
          video: serviceData.video,
          slug: serviceData.slug,
        },
      }
    );

    const { __v, ...result } = updatedService.toObject();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default updateService;
