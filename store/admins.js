import { db } from '~/plugins/firebase'
import firebase from '~/plugins/firebase'
require('firebase/auth')

export const state = () => ({
  adminInfo: {},
  sectorAdminInfo: {},
  isLoggedIn: false,
})

export const mutations = {
  setCurrentAdmin(state, payload) {
    state.adminInfo = payload
  },
  setCurrentSectorAdmin(state, payload) {
    state.sectorAdminInfo = payload
  },
  loggedIn(state, payload) {
    state.isLoggedIn = payload
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
        db.collection('Admins').doc(usr.uid).set(payload)
        usr
          .sendEmailVerification()
          .then(function () {})
          .catch(function (error) {})
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
        db.collection('SectorAdmins').doc(usr.uid).set(payload)
        usr
          .sendEmailVerification()
          .then(function () {
            document.loaction.href = '/sectorAdmins'
          })
          .catch(function (error) {})
      })
  },
  async getUser(state, payload) {
    await db
      .collection('Admins')
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

  async getSector(state, payload) {
    await db
      .collection('SectorAdmins')
      .doc(payload)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          state.commit('setCurrentSectorAdmin', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
  },
  signOutGlobal() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/')
        state.commit('loggedIn', false)
      })
  },
}
