import Service, { IService } from '../../../../db/models/Service';
import { storeFile } from '../../utils';
import ModError from '../../utils/error';

export default async (
  root: any,
  args: {
    serviceInput: {
      category: object;
      html: string;
      img: object;
      price: number;
      subCategory: object;
      title: string;
      video: string;
    };
  },
  ctx: any
): Promise<IService> => {
  try {
    const { serviceInput } = args;
    const { title } = serviceInput;
    const serviceExist = await Service.findOne({ title });

    if (!serviceExist) {
      throw new ModError(403, 'Service allready exist');
    }

    const { img, ...restServiceData } = serviceInput;

    const serviceData = new Service(restServiceData);

    if ((img as any).base64) {
      const vId = `${serviceData._id}-${title.toUpperCase()}`;

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

    const newService = await Service.create(serviceData);

    const { __v, ...result } = newService.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};
