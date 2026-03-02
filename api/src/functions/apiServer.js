const { app } = require('@azure/functions');

app.http('bikes', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        if (request.method === 'GET') {
            // Handle GET request
            return {
                status: 200,
                body: JSON.stringify([
                    {
                        id: 1,
                        manufacturerId: 1,
                        model: "Bronson",
                        price: 6999,
                        slug: "santa-cruz-bronson",
                    },
                ])
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
