import { Account, Client, Databases, ID, Storage } from 'appwrite';

export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('665ee8cf002301f949ac'); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = '66655893003896c51ade'; 
export const COLLECTION_PURCHASES = '666558a90025d1d5e7d4'; 

export { ID };
