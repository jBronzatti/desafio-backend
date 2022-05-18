import * as mongoDB from "mongodb"
import dotenv from 'dotenv';
dotenv.config();


// Iniciando conexão com o db

export const InitiateMongoServer = async (): Promise<void> => {
  try {
    const MONGOURI: string = String(process.env.MONGOURI);
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGOURI);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    const reservationsCollection: mongoDB.Collection = db.collection(String(process.env.RESERVATION_COLLECTION_NAME));
    collections.reservations = reservationsCollection;
    console.log(`Connected to DB: ${db.databaseName} and collection: ${reservationsCollection.collectionName}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// variáveis globais

export const collections: { reservations?: mongoDB.Collection } = {}