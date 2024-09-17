import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.fbs.aora',
  projectId: '66e2baeb0035531ae004',
  databaseId: '66e2c27c0026474ba5ec',
  userCollectionId: '66e2c2df003e10b43041',
  videoCollectionId: '66e2c33700290021b04f',
  storageId: '66e2c898003ad1794fe8'
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);

const databases = new Databases(client);

// Function to check if there is an active session

export const checkActiveSession = async () => {
  try {
    const session = await account.getSession('current'); // Get the current session
    return session !== null; // Return true if there is an active session
  } catch (error) {
    // If there's an error (e.g., no active session), handle it appropriately
    if (error.code === 401) {
      return false; // No active session
    }
    throw error; // Re-throw other unexpected errors
  }
};


// Function to delete all sessions for the current user

export const deleteSessions = async () => {
  try {
    // Get the list of all sessions
    const sessions = await account.listSessions();

    // Delete each session
    await Promise.all(
      sessions.sessions.map(async (session) => {
        await account.deleteSession(session.$id);
      })
    );

    console.log('All sessions deleted successfully');
  } catch (error) {
    console.error('Error deleting sessions:', error.message);
    throw error; // Re-throw the error for further handling
  }
};

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw new Error('Failed to create account');
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
      throw new Error(error);
  }
}
