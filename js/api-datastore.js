const { GoogleAuth } = require('google-auth-library');
const { Datastore } = require('@google-cloud/datastore');
const path = require('path');

// Construct the relative path to the JSON key file
const keyFilePath = path.join(__dirname, 'resolute-client-420805-b76218d69ac6.json');

// Authenticate with Google Cloud Datastore API
async function authenticate() {
    const auth = new GoogleAuth({
        keyFile: keyFilePath,
        scopes: 'https://www.googleapis.com/auth/datastore',
    });

    try {
        const client = await auth.getClient();
        return client;
    } catch (error) {
        console.error('Authentication failed:', error);
        return null;
    }
}

// Example usage: Query entities from Cloud Datastore
async function queryEntities() {
    const client = await authenticate();
    if (!client) {
        console.error('Failed to authenticate.');
        return;
    }

    const datastore = new Datastore({ projectId: 'resolute-client-420805', auth: client });
    const query = datastore.createQuery('YourData');
    const [entities] = await datastore.runQuery(query);
    console.log('Entities:', entities);
}

// Export the function to query entities
module.exports = {
    queryEntities
};
