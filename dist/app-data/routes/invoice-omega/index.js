"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res) => {
    const { email, orderId, totalPrice, paymentMethode, deliveryMethode, deliveryPrice, firstName, lastName, phone, address, postalCode, city, optionalAddress, optionalCity, optionalPostalCode, companyDTAXNum, companyDVATNum, companyName, companyVatNum, products, } = req.body;
    try {
        const API_KEY = '7ecec41b-612a-4710-82f6-071f856419f4';
        const formatGiftCardPrice = (value) => {
            let stringToFormat = value.replace(',', '.');
            return parseFloat(stringToFormat).toFixed(2);
        };
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
            }
            else {
                product.name = 'Darčeková poukážka';
                product.count = 1;
                product.unitPriceWithVat = formatGiftCardPrice(product.price);
                product.unitPriceWithVat =
                    Math.round(product.unitPriceWithVat * 100) / 100;
                product.totalPriceWithVat = product.unitPriceWithVat;
            }
        });
        const deliveryProduct = {
            name: deliveryMethode,
            count: 1,
            unitPriceWithVat: +deliveryPrice,
            totalPriceWithVat: +deliveryPrice,
        };
        const finalProducts = [...products, deliveryProduct];
        const clientHasDifferentPostalAddress = optionalAddress !== undefined;
        const senderIsVatPayer = companyDTAXNum !== undefined;
        const data = [
            {
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
                clientPostalPostCode: optionalAddress != '' ? optionalPostalCode : postalCode,
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
            },
        ];
        const response = await fetch('https://eshops.inteo.sk/api/v1/invoices', {
            body: JSON.stringify(data),
            headers: {
                Authorization: 'Bearer 7ecec41b-612a-4710-82f6-071f856419f4',
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        console.log(response);
        if (response.status >= 400) {
            return res.status(400).json({
                error: `Nastala chyba`,
            });
        }
        return res.status(201).json({ error: '' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
};
