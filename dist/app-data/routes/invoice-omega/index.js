"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res) => {
    console.log("volam");
    const { email } = req.body;
    try {
        const API_KEY = 'f77a1954-8ba5-4cd9-8722-5d4703be34ab';
        const data = {
            clientEmail: email,
        };
        console.log(data);
        /* const response = await fetch(
           'https://eshops.inteo.sk/api/v1/invoices',
           {
             body: JSON.stringify(data),
             headers: {
               Authorization: `Bearer ${API_KEY}`,
               'Content-Type': 'application/json',
             },
             method: 'POST',
           }
         );
     
         if (response.status >= 400) {
           return res.status(400).json({
             error: `Nastala chyba`,
           });
         }
         return res.status(201).json({ error: '' });*/
    }
    catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
};
