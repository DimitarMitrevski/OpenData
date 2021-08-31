import firebase from 'firebase'

var config = {
  //Your Firebase config goes here
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
