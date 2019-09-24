import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

import { firebaseAPI } from '../security/google';

const firebaseConfig = {
      apiKey: firebaseAPI,
      authDomain: "lets-meet-6cae4.firebaseapp.com",
      databaseURL: "https://lets-meet-6cae4.firebaseio.com",
      projectId: "lets-meet-6cae4",
      storageBucket: "lets-meet-6cae4.appspot.com",
      messagingSenderId: "621508718903",
      appId: "1:621508718903:web:3fc1839267e8acd4882ab2"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.firestore();

    export default firebase;