import * as firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyACpJhjHOADme49teekGxswsqFyNNjc578",
    authDomain: "trial-e8754.firebaseapp.com",
    databaseURL: "https://trial-e8754.firebaseio.com",
    projectId: "trial-e8754",
    storageBucket: "trial-e8754.appspot.com",
    messagingSenderId: "973061802312"
};

const devConfig = {
    apiKey: "AIzaSyACpJhjHOADme49teekGxswsqFyNNjc578",
    authDomain: "trial-e8754.firebaseapp.com",
    databaseURL: "https://trial-e8754.firebaseio.com",
    projectId: "trial-e8754",
    storageBucket: "trial-e8754.appspot.com",
    messagingSenderId: "973061802312"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
