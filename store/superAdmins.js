import { db } from '~/plugins/firebase'
import firebase from '~/plugins/firebase'
require('firebase/auth')

export const state = () => ({
  superAdminInfo: {},
})

export const mutations = {
  setCurrentAdmin(state, payload) {
    state.superAdminInfo = payload
  },
}

export const actions = {
  async signUp(state, payload) {
    const email = payload.email
    const password = payload.password
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var usr = firebase.auth().currentUser
        db.collection('SuperAdmins').doc(usr.uid).set(payload)
        usr
          .sendEmailVerification()
          .then(function () {
            document.location.href = '/superAdmins/profile'
          })
          .catch(function (error) {})
      })
  },
  async getUser(state, payload) {
    await db
      .collection('SuperAdmins')
      .doc(payload)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          state.commit('setCurrentAdmin', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
  },
  async createAdmin(state, payload) {
    const email = payload.email
    const password = payload.password
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        var usr = firebase.auth().currentUser
        db.collection('Admins').doc(usr.uid).set(payload)
        usr
          .sendEmailVerification()
          .then(function () {
            document.location.href = '/Admins/profile'
          })
          .catch(function (error) {})
      })
  },
}
