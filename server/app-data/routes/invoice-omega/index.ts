export default async (req, res) => {
  const { email, orderId, totalPrice } = req.body;
  try {
    const API_KEY = 'f77a1954-8ba5-4cd9-8722-5d4703be34ab';

    const data = [
      {
        "documentNumber": orderId,
        "numberingSequence": "OF",
        "totalPrice": "128.50",
        "totalPriceWithVat": `${totalPrice}`,
        "senderCountry": "",
        "senderBankAccount": 123,
        "senderBankIban": "SK9802000000000000000123",
        "senderBankSwift": "SUBASKBX",
        "paymentType": "bankový prevod",
        "deliveryType": "osobný odber",
        "clientPostalName": "Firma Ján Malý",
        "clientPostalContactName": "Ján",
        "clientPostalContactSurname": "Malý",
        "clientPostalPhone ": "",
        "clientPostalStreet": "Na vŕšku 15",
        "clientPostalPostCode": "029 01",
        "clientPostalTown": "Námestovo",
        "clientPostalCountry": "",
        "clientHasDifferentPostalAddress": true,
        "currency": "EUR",
        "exchangeRate": 1,
        "senderIsVatPayer": true,
        "discountPercent": null,
        "discountValue": null,
        "discountValueWithVat": null,
        "priceDecimalPlaces": null,
        "deposit": 0,
        "depositText": null,
        "depositDate": null,
        "orderNumber": "90140001",
        "clientNote": "",
        "isVatAccordingPayment": true,
        "items": [
          {
            "name": "Skrinka",
            "description": "Skrinka s policami",
            "count": 1,
            "measureType": "ks",
            "totalPrice": 12.25,
            "totalPriceWithVat": 14.7,
            "unitPrice": "12.25",
            "unitPriceWithVat": "14.70",
            "vat": 20,
            "hasDiscount": true,
            "discountName": "Vernostná zľava",
            "discountPercent": 10,
            "discountValue": -1.23,
            "discountValueWithVat": -1.47,
            "productCode": "L1250",
            "typeId": 1,
            "warehouseCode": "S1",
            "foreignName": "",
            "customText": "",
            "ean": "",
            "jkpov": "",
            "plu": 0,
            "numberingSequenceCode": "",
            "specialAttribute": null
          },
          {
            "name": "Stolička",
            "description": null,
            "count": 5,
            "measureType": "ks",
            "totalPrice": 116.25,
            "totalPriceWithVat": 139.5,
            "unitPrice": "23.25",
            "unitPriceWithVat": "27.90",
            "vat": 0,
            "hasDiscount": false,
            "discountName": null,
            "discountPercent": null,
            "discountValue": null,
            "discountValueWithVat": null,
            "productCode": "LAC12",
            "typeId": 0,
            "warehouseCode": null,
            "foreignName": "",
            "customText": "",
            "ean": "",
            "jkpov": "",
            "plu": 0,
            "numberingSequenceCode": "",
            "specialAttribute": null
          }
        ]
      }
    ]

    console.log(JSON.stringify(data));


   const response = await fetch(
      'https://eshops.inteo.sk/api/v1/invoices',
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer f77a1954-8ba5-4cd9-8722-5d4703be34ab',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );

    console.log(response);

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
