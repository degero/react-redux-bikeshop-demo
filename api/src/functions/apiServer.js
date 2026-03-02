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
                id: bikes.length ? bikes.length + 1 : 1,
                model: body.model,
                price: body.price,
                slug: manufacturers[body.manufacturerId - 1].slug,
                manufacturerId: body.manufacturerId
            };
            bikes.push(newBike);
            return {
                status: 201,
                jsonBody: newBike,
            };
        }
    }
});
app.http('bikesById', {
    methods: ['GET', 'PUT', 'DELETE'],
    route: 'bikes/{id}',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const id = parseInt(request.params.id);
        const index = bikes.findIndex(b => b.id === id);

        if (index === -1) {
            return { status: 404, jsonBody: { error: `Bike with id ${id} not found` } };
        }

        if (request.method === 'GET') {
            return { status: 200, jsonBody: bikes[index] };
        } else if (request.method === 'PUT') {
            const body = await request.json();
            bikes[index] = { ...bikes[index], ...body, id, slug: manufacturers[body.manufacturerId - 1].slug };
            return { status: 200, jsonBody: bikes[index] };
        } else if (request.method === 'DELETE') {
            const deleted = bikes.splice(index, 1)[0];
            return { status: 200, jsonBody: deleted };
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
                id: manufacturers.length ? manufacturers.length + 1 : 1,
                name: body.name,
                slug: body.name.toLowerCase().replace(/\s+/g, '-')
            };
            manufacturers.push(newManufacturer);
            return {
                status: 201,
                jsonBody: newManufacturer,
            };
        }
    }
});

app.http('manufacturersById', {
    methods: ['GET', 'PUT', 'DELETE'],
    route: 'manufacturers/{id}',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const id = parseInt(request.params.id);
        const index = manufacturers.findIndex(m => m.id === id);

        if (index === -1) {
            return { status: 404, jsonBody: { error: `Manufacturer with id ${id} not found` } };
        }

        if (request.method === 'GET') {
            return { status: 200, jsonBody: manufacturers[index] };
        } else if (request.method === 'PUT') {
            const body = await request.json();
            manufacturers[index] = {
                ...manufacturers[index],
                ...body,
                id,
                slug: body.name
                    ? body.name.toLowerCase().replace(/\s+/g, '-')
                    : manufacturers[index].slug
            };
            return { status: 200, jsonBody: manufacturers[index] };
        } else if (request.method === 'DELETE') {
            const deleted = manufacturers.splice(index, 1)[0];
            return { status: 200, jsonBody: deleted };
        }
    }
});
