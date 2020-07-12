import { createElement, ComponentClass, FunctionComponent } from 'react';

export const getSteps: (data: string[]) => string[] = (data) => {
  return data;
};

export const getStepContent = (
  stepIndex: number,
  data: any,
  handler: any,
  Components:
    | string[]
    | FunctionComponent<{ props: any }>[]
    | ComponentClass<{ props: any }, any>[],
  componentProps: any
) => {
  switch (stepIndex) {
    case 0:
      return Components[0]; // <GeneralProductData productData={data} setProductData={handler} />;
    case 1:
      return Components[1]; // <VariantProductData productData={data} setProductData={handler} />;
    case 2:
      return Components[2]; // <ProductResult productData={data} setProductData={handler} />;
    default:
      return 'Unknown stepIndex';
  }
};
