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
            const body = await request.json();
            const newBike = {
            id: bikes.length ? Math.max(...bikes.map(b => b.id)) + 1 : 1,
            ...body,
            };
            bikes.push(newBike);
            return {
                status: 201,
                jsonBody: newBike,
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
            const body = await request.json();
            const newManufacturer = {
                id: manufacturers.length ? Math.max(...manufacturers.map(m => m.id)) + 1 : 1,
                ...body,
            };
            manufacturers.push(newManufacturer);
            return {
                status: 201,
                jsonBody: newManufacturer,
            };
        }
    }
});
