import { Client, Account, ID } from 'react-native-appwrite';

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

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
.then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
};
