const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://ollon.uat.cardweb.cardworks.com/x/RegisterDeviceRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
