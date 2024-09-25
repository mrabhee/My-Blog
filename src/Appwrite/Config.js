import { appwriteUrl, projectId } from './AppwriteIds'
import { Account, Client, Databases, Storage } from 'appwrite'


//Creating Client
export const client = new Client().setEndpoint(appwriteUrl).setProject(projectId)

//Creating Account For Client
export const account = new Account(client)

//Creating Database 
export const database = new Databases(client)

//Storage
export const storage = new Storage(client);

