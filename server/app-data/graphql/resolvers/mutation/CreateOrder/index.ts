const pdf = require('pdf-creator-node');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
import nodemailer from 'nodemailer';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import Order, { IOrder } from '../../../../db/models/Order';
import { calculateOrderId } from '../../utils';

const formatPrice = (number: number) => {
  let numberToFormat = number.toFixed(2).toString();
  return numberToFormat.replace('.', ',');
};

var orderPDF = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/productsOrder/template.html`
  ),
  'utf8'
);

const orderCreated = fs.readFileSync(
  path.join(
    __dirname,
    `../../../../../../public/html/orderTemplate/order_created.html`
  ),
  'utf8'
);

function sendMailNotification(
  from: string,
  to: string,
  orderData: any
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465, // 587,
        secure: true, // true, // ssl
        auth: {
          user: process.env.EMAIL_LOGIN, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });

      const templateOrderMail = handlebars.compile(orderCreated);
      var replacement = {
        orderId: orderData.orderId,
        date: orderData.createdAt,
        name: orderData.firstName,
        surname: orderData.lastName,
        address: orderData.address,
        deliveryAdress: {
          address:
            orderData.optionalAddress != ''
              ? orderData.optionalAddress
              : orderData.address,
          postalCode:
            orderData.optionalAddress != ''
              ? orderData.optionalPostalCode
              : orderData.postalCode,
          city:
            orderData.optionalAddress != ''
              ? orderData.optionalCity
              : orderData.city,
          state:
            orderData.optionalAddress != ''
              ? orderData.optionalState
              : orderData.state,
        },
        postalCode: orderData.postalCode,
        city: orderData.city,
        state: orderData.state,
        phone: orderData.phone,
        deliveryMethode: orderData.deliveryMethode,
        paymentMethode: orderData.paymentMethode,
        products: orderData.products ? orderData.products : [],
        totalPriceWithoutVat: formatPrice(orderData.totalPriceWithoutVat),
        totalPriceVat: formatPrice(orderData.totalPriceVat),
        totalPrice: formatPrice(orderData.totalPrice),
        isBankovyPrevod: orderData.paymentMethode === 'Bankový prevod',
        giftCards: orderData.giftCards ? orderData.giftCards : [],
        areProducts: orderData.products.length > 0,
        areGiftCards: orderData.giftCards.length > 0,
        isCompany: orderData.companyName != '',
        companyName: orderData.companyName,
        companyVatNum: orderData.companyVatNum,
        companyDVATNum: orderData.companyDVATNum,
        companyDTAXNum: orderData.companyDTAXNum,
        isLoyalityProduct: orderData.loyalityProduct ? true : false,
        loyalityProduct: orderData.loyalityProduct,
        deliveryPrice: orderData.deliveryPrice,
        paymentPrice: orderData.paymentPrice,
        isCoupon: orderData.coupon ? true : false,
        coupon: orderData.coupon,
      };

      const orderMailToSend = templateOrderMail(replacement);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Eshop KúpeleCKS" <eshop@kupelecks.sk>',
        to, // list of receivers
        subject: 'Červený Kláštor | Vaša objednávka bola prijatá', // Subject line
        html: orderMailToSend, // html body
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

const createOrder: (
  root: any,
  args: any,
  ctx: any,
  orderIdIn?: string
) => Promise<String> = async (root, { data }, ctx, orderIdIn) => {
  let updatedData: any;
  let orderId: string = '';
  let createdAt: string = new Date().toLocaleDateString('sk-SK');
  let totalPriceWithoutVat = 0;
  let totalPriceVat = 0;
  let totalPrice = 0;

  if (!orderIdIn) {
    orderId = await calculateOrderId();
  } else {
    orderId = orderIdIn;
  }

  totalPriceWithoutVat = data.totalPrice / 1.2;
  totalPriceWithoutVat = Math.round(totalPriceWithoutVat * 100) / 100;
  totalPriceVat = data.totalPrice - data.totalPrice / 1.2;
  totalPriceVat = Math.round(totalPriceVat * 100) / 100;
  totalPrice = Math.round(data.totalPrice * 100) / 100;

  updatedData = {
    ...data,
    orderId,
    createdAt,
    totalPriceWithoutVat,
    totalPriceVat,
    totalPrice: totalPrice,
  };

  const newOrder: IOrder = new Order(updatedData);
  try {
    await Order.create(newOrder);
  } catch (err) {
    throw err;
  }

  const filteredProducts = updatedData.products.filter(
    (product) => product.variant !== undefined
  );

  const readyData = {
    ...updatedData,
    products: filteredProducts,
  };

  readyData.products.forEach((product, index) => {
    if (product.type !== 'poukazka') {
      product.price = product.variant.discount
        ? product.variant.price.value -
          (product.variant.price.value * product.variant.discount) / 100
        : product.variant.price.value;
      product.price = Math.round(product.price * 100) / 100;
      product.totalPrice = product.variant.count * product.price;
      product.totalPriceVat = product.totalPrice - product.totalPrice / 1.2;
      product.totalPriceVat = Math.round(product.totalPriceVat * 100) / 100;
      product.totalPriceWithoutVat = product.totalPrice / 1.2;
      product.totalPriceWithoutVat =
        Math.round(product.totalPriceWithoutVat * 100) / 100;
      product.price = formatPrice(product.price);
      product.totalPrice = formatPrice(product.totalPrice);
      product.totalPriceVat = formatPrice(product.totalPriceVat);
      product.totalPriceWithoutVat = formatPrice(product.totalPriceWithoutVat);
      product.productNumber = index + 1;
    }
  });

  const giftCards = updatedData.products.filter(
    (product) => product.variant === undefined
  );

  giftCards.forEach((card, index) => {
    card.cardNumber = index + 1;
    card.totalPrice = formatPrice(card.totalPrice);
    card.services.length > 0
      ? (card.areServices = true)
      : (card.areServices = false);
    card.priceValue > 0
      ? (card.isPriceValue = true)
      : (card.isPriceValue = false);
    if (card.services.length > 0) {
      card.services.forEach((service) => {
        service.price = formatPrice(service.price);
      });
    }
    if (card.priceValue > 0) {
      card.priceValue = formatPrice(card.priceValue);
    }
  });

  const pdfData = {
    ...readyData,
    giftCards,
    isDeliveryAddress: readyData.optionalAddress != '',
    areProducts: readyData.products.length > 0,
    areGiftCards: giftCards.length > 0,
    isLoyalityProduct: readyData.loyalityProduct ? true : false,
    loyalityProduct: readyData.loyalityProduct,
    deliveryPrice: formatPrice(readyData.deliveryPrice),
    paymentPrice: formatPrice(readyData.paymentPrice),
    isCoupon: readyData.coupon ? true : false,
  };

  var options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
  };

  const document = {
    html: orderPDF,
    data: pdfData,
    path: path.join(
      __dirname,
      `../../../../../../static/orders/order-${orderId}.pdf`
    ),
  };
  await pdf.create(document, options);
  if (
    !(
      data.paymentMethode.toLowerCase().indexOf('card') > -1 ||
      data.paymentMethode.toLowerCase().indexOf('kart') > -1
    )
  ) {
    try {
      await sendMailNotification(
        'info@codebrothers.sk',
        readyData.email,
        pdfData
      );
    } catch (err) {
      throw err;
    }
  }

  const { email } = readyData;

  if (email) {
    const customerExist: ICustomer = await Customer.findOne({
      email: email,
    });

    if (customerExist) {
      if (readyData.loyalityProduct) {
        const custData = customerExist.toObject();
        const updatedCustData = {
          ...custData,
          customerPoints:
            custData.customerPoints -
            readyData.loyalityProduct.costPoints +
            updatedData.totalPrice * 100,
        };
        await Customer.findByIdAndUpdate(customerExist._id, updatedCustData);
      } else {
        const custData = customerExist.toObject();
        const updatedCustData = {
          ...custData,
          customerPoints:
            custData.customerPoints + updatedData.totalPrice * 100,
        };

        await Customer.findByIdAndUpdate(customerExist._id, updatedCustData);
      }
    }
  }
  const { __v, ...result } = newOrder.toObject();

  return result._id;
};

export default createOrder;
