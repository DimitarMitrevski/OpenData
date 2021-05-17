<template>
  <div class="signUpCont">
    <SignUpForm tip="user" style="z-index: 1000" />
    <!-- <div class="circle"></div> -->
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  name: 'userSignUp',
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
  },
}
</script>
<style scoped>
.circle {
  background: white;
  position: absolute;
  top: -70%;
  right: -5%;
  width: 200vw;
  rotate: 90deg;
  height: 70vw;
  border-radius: 50%;
  z-index: 0;
}
.signUpCont {
  padding-top: 40px;
  padding-bottom: 40px;
  background: cadetblue;
  min-height: 100vh;
}
</style>
