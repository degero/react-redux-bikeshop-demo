const { app } = require('@azure/functions');

let bikes = [
    {
        id: 1,
        manufacturerId: 1,
        model: "Bronson",
        price: 6999,
        slug: "santa-cruz-bronson",
    },
];

let manufacturers = [
  {
    id: 1,
    name: "Santa Cruz",
    slug: "santa-cruz"
  },
  {
    id: 2,
    name: "Yeti",
    slug: "yeti"
  },
];


app.http('bikes', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        if (request.method === 'GET') {
            // Handle GET request
            return {
                status: 200,
                jsonBody: bikes
            };
        } else if (request.method === 'POST') {
            // Handle POST request
            return {
                status: 201,
                body: bike
            };
        }
    }
});


app.http('manufacturers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        if (request.method === 'GET') {
            // Handle GET request
            return {
                status: 200,
                jsonBody: manufacturers
            };
        } else if (request.method === 'POST') {
            // Handle POST request
            return {
                status: 201,
                body: bike
            };
        }
    }
});
