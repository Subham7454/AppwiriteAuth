//resusable service

import { ID, Account, Client } from 'appwrite'
import config from 'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    email: string;
    userName: string;
    password: string;
 
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService{

    account;
    
    constructor(){   //for connecting to appwrite

    appwriteClient
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
        
    this.account=new Account(appwriteClient)
    }
    
    //create a new record of user inside appwrite
    
    async CreateAccount = ({ email, password, userName }: CreateUserAccount)=>{
     try {
         const UserAccount= await this.account.create(
             ID.unique(),
             email,
             password,
             userName
         )
         if (UserAccount) {
            //TODO:create login feature
             return .this.LoginUser({ email, password })
         }
         else {
             return UserAccount;
         }
     } catch (error) {
         Snackbar.show({
             text: String(error),
             duration:Snackbar.LENGTH_LONG
         })
         console.log("error::CreateAccount"+error)
     }
        
    }
    
    async LoginUser = ({ email, password }: LoginUserAccount)=>{
    try {
        return await this.account.createEmailPasswordSession('email@example.com', 'password');

    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })
        console.log("error::Login user"+error)
    }
    
    }
    
    async getCurrentUser() {
    try {
       return await this.account.get();
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })
        console.log("error:: getCurrentuser"+error)
    }
    }
    async logout() {
    try {
       return await this.account.deleteSession('current');
    } catch (error) {
        Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
        })
        console.log("error:: getCurrentuser"+error)
    }
    }
}
export default AppwriteService;