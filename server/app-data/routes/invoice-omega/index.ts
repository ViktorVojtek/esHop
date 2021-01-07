import { Request, Response } from 'express';

const API_KEY: string = '7ecec41b-612a-4710-82f6-071f856419f4';
const ESHOP_INV_API_URI: string = 'https://eshops.inteo.sk/api/v1/invoices';

export const omegaRoute: (
  req: Request,
  res: Response
) => Promise<Response<any>> = async (req, res) => {
  const {
    email,
    orderId,
    totalPrice,
    paymentMethode,
    deliveryMethode,
    deliveryPrice,
    firstName,
    lastName,
    phone,
    address,
    postalCode,
    city,
    optionalAddress,
    optionalCity,
    optionalPostalCode,
    companyDTAXNum,
    companyDVATNum,
    companyName,
    companyVatNum,
    products,
  } = req.body;

  try {
    products.forEach((product) => {
      if (product.type !== 'poukazka') {
        product.name = product.title;
        product.count = product.variant.count;
        product.productCode = product.variant.productCode;
        product.unitPriceWithVat = product.variant.discount
          ? product.variant.price.value -
            (product.variant.price.value * product.variant.discount) / 100
          : product.variant.price.value;

        product.unitPriceWithVat =
          Math.round(product.unitPriceWithVat * 100) / 100;
        product.totalPriceWithVat = product.unitPriceWithVat * product.count;
        product.totalPriceWithVat =
          Math.round(product.totalPriceWithVat * 100) / 100;
      } else {
        product.name = 'Darčeková poukážka';
        product.count = 1;
        product.unitPriceWithVat = formatGiftCardPrice(product.totalPrice);
        product.unitPriceWithVat =
          Math.round(product.unitPriceWithVat * 100) / 100;
        product.totalPriceWithVat = product.unitPriceWithVat;
      }
    });

    type deliveryProductType = {
      name: string;
      count: number;
      unitPriceWithVat: number;
      totalPriceWithVat: number;
    };

    const deliveryProduct: deliveryProductType = {
      name: deliveryMethode,
      count: 1,
      unitPriceWithVat: +deliveryPrice,
      totalPriceWithVat: +deliveryPrice,
    };
    const finalProducts: any[] = [...products, deliveryProduct];
    const clientHasDifferentPostalAddress: boolean =
      optionalAddress !== undefined;
    const senderIsVatPayer: boolean = companyDTAXNum !== undefined;

    const data = {
      documentNumber: orderId,
      numberingSequence: 'OFEsh',
      totalPriceWithVat: totalPrice,
      paymentType: `${paymentMethode}`,
      deliveryType: `${deliveryMethode}`,
      clientName: companyName ? `${companyName}` : `${firstName} ${lastName}`,
      clientContactName: `${firstName}`,
      clientContactSurname: `${lastName}`,
      clientPhone: `${phone}`,
      clientEmail: `${email}`,
      clientStreet: `${address}`,
      clientPostCode: `${postalCode}`,
      clientTown: `${city}`,
      clientCountry: 'Slovenská republika',
      clientHasDifferentPostalAddress: clientHasDifferentPostalAddress,
      clientPostalName: companyName
        ? `${companyName}`
        : `${firstName} ${lastName}`,
      clientPostalContactName: `${firstName}`,
      clientPostalContactSurname: `${lastName}`,
      clientPostalPhone: `${phone}`,
      clientPostalStreet: optionalAddress != '' ? optionalAddress : address,
      clientPostalPostCode:
        optionalAddress != '' ? optionalPostalCode : postalCode,
      clientPostalTown: optionalAddress != '' ? optionalCity : city,
      clientPostalCountry: 'Slovenská republika',
      clientRegistrationId: companyVatNum ? `${companyVatNum}` : '',
      clientTaxId: companyDVATNum ? `${companyDVATNum}` : '',
      clientVatId: companyDTAXNum ? `${companyDTAXNum}` : '',
      currency: 'EUR',
      exchangeRate: 1,
      senderIsVatPayer: senderIsVatPayer,
      discountPercent: null,
      discountValue: null,
      discountValueWithVat: null,
      priceDecimalPlaces: null,
      deposit: 0,
      depositText: null,
      depositDate: null,
      orderNumber: `${orderId}`,
      clientNote: '',
      isVatAccordingPayment: true,
      items: finalProducts,
    };

    console.log(data);

    const response: globalThis.Response = await fetch(ESHOP_INV_API_URI, {
      body: JSON.stringify([data]),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // console.log(response);

    if (response.status >= 400) {
      return res.status(400).json({
        error: `Nastala chyba`,
      });
    }

    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

function formatGiftCardPrice(val: string): string {
  return parseFloat(val.replace(',', '.')).toFixed(2);
}
