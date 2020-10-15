export default async (req, res) => {
  const { email, fname, lname, tel } = req.body;
  try {
    const API_KEY = 'a2bb51bbfd2f36dd99cec19e22256ee3-us17';
    const LIST_ID = '447d8cc287';
    const DATACENTER = API_KEY.split('-')[1];

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: fname,
        LNAME: lname,
        PHONE: tel,
      },
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
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
    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
