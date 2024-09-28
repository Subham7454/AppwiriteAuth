import { ID, Account, Client } from 'appwrite';
import config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID: string = config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
  email: string;
  userName: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    // Initialize Appwrite client
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  // Create a new record for the user inside Appwrite
  async createAccount({ email, password, userName }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );

      if (userAccount) {
        // If account creation is successful, log the user in
        return this.loginUser({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('error::CreateAccount ' + error);
    }
  }

  // Log in the user
  async loginUser({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('error::Login user ' + error);
    }
  }

  // Get the current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('error::getCurrentUser ' + error);
    }
  }

  // Log out the user
  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log('error::logout ' + error);
    }
  }
}

export default AppwriteService;
