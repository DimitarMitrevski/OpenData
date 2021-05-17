<template>
  <div>
    <div class="circle"></div>
    <div class="signIn">
      <b-form id="form" @submit.prevent="onSubmit">
        <h3 class="logInText">Логирај се како Супер Админ</h3>
        <b-form-group id="input-group-1" label="E-mail" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="username"
            maxlength="50"
            required
            :placeholder="'Внеси е-маил'"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Лозинка" label-for="input-1">
          <b-form-input
            id="input-2"
            v-model="password"
            maxlength="50"
            type="password"
            required
            placeholder="Внесете Лозинка"
          ></b-form-input>
        </b-form-group>
        <input type="submit" value="Најави Се" id="submitBtn" />
      </b-form>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  async created() {
    this.$store.dispatch('municipality/setAllMunicipalities', this.opstini)
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.callStore(user.uid)
      } else {
      }
    })
  },
  methods: {
    async callStore(uid) {
      console.log(uid, 'log form 89')
      await this.$store.dispatch('users/getUser', uid)
      const userDatas = await this.$store.state.users.userInfo
      this.userID = uid
      this.userDatas = userDatas
      console.log(this.userDatas)
    },
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          var usr = firebase.auth().currentUser
          console.log(usr.uid)
          this.$router.push('/superAdmins/profile')
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
        })
    },
  },
}
</script>
<style scoped>
.circle {
  box-sizing: border-box;
  background: white;
  position: absolute;
  top: -50%;
  right: -5%;
  width: 200vw;
  rotate: 90deg;
  height: 70vw;
  border-radius: 50%;
  z-index: 0;
}
.logInText {
  box-sizing: border-box;
  color: cadetblue;
  position: relative;
  margin-bottom: 3vw;
}
.signIn {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: cadetblue;
  z-index: 4;
  color: cadetblue;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#form {
  box-sizing: border-box;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 3;
  position: relative;
  width: 30vw;
  height: 60vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#submitBtn {
  box-sizing: border-box;
  width: 20vw;
  height: 2.5vw;
  border-radius: 10px;
  border: none;
  background: cadetblue;
  color: white;
  font-size: 1vw;
}
#input-2 {
  width: 25vw;
  height: 2.5vw;
  margin-bottom: 1vw;
}
#input-group-2 {
  margin-bottom: 2.5vw;
}
</style>
