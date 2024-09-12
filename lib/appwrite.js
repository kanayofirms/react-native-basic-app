import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e2baeb0035531ae004')
    .setPlatform('com.fbs.aora')
    .setDatabase('66e2c27c0026474ba5ec')
    .setUserCollection('66e2c27c0026474ba5ec')
    .setVideoCollection('66e2c33700290021b04f')
    .setStorage('66e2c898003ad1794fe8')

const account = new Account(client);



export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        }
        );
};