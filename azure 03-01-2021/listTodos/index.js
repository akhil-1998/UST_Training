// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://cosmosdb-ust-todos1:80GcJ1UXVJRV5vFxxz1PI6gSbgLxF962VsqM9H0miUPQeBKLBodKqkt4ObcWptyB5RCcBSu6icsemCp48Q7tPg==@cosmosdb-ust-todos1.mongo.cosmos.azure.com:10255/?ssl=true&appName=@cosmosdb-ust-todos1@", function (err, db) {
//   db.close();
// });

const MongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {

    // const URL = 'mongodb://cosmosdb-ust-todos1:80GcJ1UXVJRV5vFxxz1PI6gSbgLxF962VsqM9H0miUPQeBKLBodKqkt4ObcWptyB5RCcBSu6icsemCp48Q7tPg%3D%3D@cosmosdb-ust-todos1.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosdb-ust-todos1@';
    const URL = process.env.MONGODB_URL;
    // const DATABASE_NAME = 'serverless';
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
    // const COLLECTION_NAME = 'todos';
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME;

    const connection = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const todoCollection = connection.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const results = await todoCollection.find({}).toArray();

    await connection.close();

    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    return{
        body: JSON.stringify(results).replace(/_id/g, "id")
    }
}