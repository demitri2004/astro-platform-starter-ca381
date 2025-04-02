const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body);

    // Get target endpoint from the payload
    const endpoint = body.targetEndpoint;
    if (!endpoint) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing targetEndpoint in request body' })
      };
    }

    // Remove targetEndpoint from the body before forwarding
    delete body.targetEndpoint;

    const response = await fetch(`https://ollon.uat.cardweb.cardworks.com${endpoint}`, {
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
