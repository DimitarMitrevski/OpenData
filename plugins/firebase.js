import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCgMUTSfkEgNQcACdiVryCzGxxfT4tbPfQ',
  authDomain: 'e-opstini.firebaseapp.com',
  databaseURL:
    'https://e-opstini-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'e-opstini',
  storageBucket: 'e-opstini.appspot.com',
  messagingSenderId: '156574750669',
  appId: '1:156574750669:web:ae9fbb871117ea990f9684',
  measurementId: 'G-2HH05KQS2X',
}
let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(config)
}
export const db = firebase.firestore()
// var ref = firebase.database().ref('budzet2020')
// ref.once('value', function (snapshot) {
//   var data = snapshot.val()
//   for (let i in data) {
//     console.log(data[1])
//   }
// })
export default firebase
