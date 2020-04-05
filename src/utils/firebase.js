import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAAgH9oVPY07f4W64q3zBIqosBVH3Irfp0',
  authDomain: 'knight-bus.firebaseapp.com',
  databaseURL: 'https://knight-bus.firebaseio.com',
  projectId: 'knight-bus',
  storageBucket: 'knight-bus.appspot.com',
  messagingSenderId: '699821551493',
  appId: '1:699821551493:web:a944b29b62db1445',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const add = async ({ age, frequency }) => {
  await db.collection('frequency').add({ age, frequency });
};

export const get = async () => {
  const ids = await db.collection('frequency').get().then((stream) => {
    if (stream.forEach) {
      const result = [];
      stream.forEach((doc) => result.push(doc.id));
      return result;
    }

    return stream;
  });

  const data = ids.map((id) => db.collection('frequency').doc(id).get({ source: 'server' }));
  return Promise.all(data).then((e) => e.map((x) => x.data()));
};

export default { add };
