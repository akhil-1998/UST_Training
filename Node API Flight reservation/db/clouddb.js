// /**
//  * Setup the Database URL
//  */

const DB_USER = "akhil";
const DB_PASSWORD = "ust123456";
const DB_NAME = "flight";
const CLUSTER_HOST = "apidemo.7z7s3.mongodb.net";

//DB Connection String
//mongodb+srv://akhil:<password>@apidemo.7z7s3.mongodb.net/<dbname>?retryWrites=true&w=majority

exports.DB_URI=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

