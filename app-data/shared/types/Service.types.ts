export type ServiceCategory = {
  id: string;
  title: string;
};

export type ServiceSubCategory = {
  id: string;
  title: string;
};

export type ServicePrice = {
  currency: string;
  value: number;
};

export type ServiceImage = {
  base64?: string;
  path?: string;
  ext: string;
  imgId: string;
  size: string;
  title: string;
};

type Service = {
  _id: string;
  category: ServiceCategory;
  html: string;
  img: ServiceImage;
  price: ServicePrice;
  discount?: number;
  subCategory: ServiceSubCategory;
  title: string;
  video?: string;
  slug: string;
};

export default Service;
