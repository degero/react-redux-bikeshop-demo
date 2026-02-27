const { app } = require('@azure/functions');

app.http('bikes', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

      
    }
});
