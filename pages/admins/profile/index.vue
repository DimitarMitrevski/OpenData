<template>
  <div>
    <PostPopUp :post="post" v-on:close-modal="post = false" />
    <div class="adminProfileCont">
      <div class="darken" v-if="post"></div>
      <b-container fluid class="profileTab">
        <b-row align-v="center" id="profile">
          <b-col cols="7">
            <b-row align-v="center" align-h="center">
              <b-col cols="1">
                <b-icon icon="file-person" variant="light" scale="11"></b-icon>
              </b-col>
              <b-col cols="1">
                <h1>+</h1>
                <h1>+</h1>
              </b-col>
              <b-col cols="8">
                <h1>{{ datas.imePrezime }}</h1>
                <p>Адреса: {{ datas.adress }}</p>
                <p>Место на живеење: {{ datas.city }}</p>
                <p>Број на телефон: {{ datas.contactTel }}</p>
              </b-col>
            </b-row>
          </b-col>
          <b-col align-h="center">
            <div class="block">
              <button
                class="post"
                @click="
                  () => {
                    $router.push('/municipalities/blog/create')
                  }
                "
              >
                Објави Пост
                <b-icon icon="box-arrow-in-up-right" scale="1"> </b-icon>
              </button>
            </div>
            <div class="newAdmin">
              <b-button
                href="/admins/createSektorAdmin"
                v-b-modal.modal-lg
                variant="primary"
                block
              >
                Креирај нов админ на сектор
              </b-button>
              <b-button
                href="/municipality"
                v-b-modal.modal-lg
                variant="light"
                block
              >
                Отвори профил на општина
              </b-button>
            </div>
          </b-col>
        </b-row>
        <div class="underline"></div>
      </b-container>

      <b-row class="News" align-v="center">
        <b-col
          ><div id="bigBlock">
            <h3>Граѓански буџет</h3>
            <pie-chart
              :colors="['cadetblue', '#FF6868', '#A6E2A8']"
              :data="[
                ['Приходи', '222.3 милијарди денари'],
                ['Расходи', '239.7 милијарди денари'],
                ['Дефицит', '17.4 милијарди денари'],
              ]"
            ></pie-chart>
          </div>
        </b-col>
        <b-col>
          <div class="rects">
            <h3>Буџет на {{ datas.city }} во последните 3 години</h3>
            <column-chart
              width="95%"
              height="95%"
              :colors="['#54C9BB']"
              :data="[
                ['2018', 100000],
                ['2019', 98000],
                ['2020', 97500],
              ]"
              xtitle="Година"
              ytitle="Буџет"
            ></column-chart>
          </div>
          <div class="rects1" @click="scroll"><h3>Јавни Набавки</h3></div>
        </b-col>
      </b-row>
      <div class="popUp" v-if="modal" style="margin-bottom: 10px">
        <Nabavki :opstina="datas.city" />
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  name: 'adminProfile',
  data() {
    return {
      datas: {},
      dataFire: {},
      modal: false,
      post: false,
    }
  },
  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getdispatch(user.uid)
      } else {
        this.$router.push('/signInAdmin')
      }
    })
  },
  methods: {
    scroll() {
      this.modal = !this.modal
      setTimeout(function () {
        window.scrollTo({
          top: window.screen.height - 20,

          behavior: 'smooth',
        })
      }, 250)
    },
    odjava() {
      firebase.auth().signOut()
      this.$router.push('/')
    },
    async getdispatch(uid) {
      await this.$store.dispatch('admins/getUser', uid)
      const datas = await this.$store.state.admins.adminInfo
      const userID = uid
      this.datas = datas
    },
  },
}
</script>
<style scoped>
.adminProfileCont {
  width: 100vw;
  background: cadetblue;
  z-index: 104;
  padding-bottom: 10px;
}
.profileTab {
  width: 100vw;
  background: cadetblue;
  height: 40vh;
  color: white;
}
.underline {
  width: 95vw;
  height: 0.1vw;

  background: white;
}
#profile {
  height: 40vh;
  width: 80vw;
  margin: 0 auto;
}
.block {
  width: 30vw;
  height: 7vw;
  background: none;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  transition: 0.3s;
}
.block:hover {
  background-color: white;
  color: cadetblue;
}
.block:hover .post {
  color: cadetblue;
}
.post {
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.5vw;
  font-weight: 100;
  background: none;
  transition: 0.3s;
}
.post:hover {
  color: cadetblue;

  background: white;
}
.newAdmin {
  width: 30vw;

  color: white;
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
}
.newAdmin h2 {
  font-size: 1vw;
  font-weight: 100;

  color: white;
}
.News {
  height: 60vh;
  width: 90vw;
  margin: 0 auto !important;
}
#bigBlock {
  height: 50vh;
  width: 25vw;
  border-radius: 10px;
  background: white;
  display: flex;
  color: cadetblue;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.rects {
  transition: 0.3s;
  width: 50vw;
  height: 40vh;
  background: white;
  border-radius: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: cadetblue;
}
.rects1 {
  transition: 0.3s;
  width: 50vw;
  height: 10vh;
  background: none;
  border: 2px solid white;
  border-radius: 10px;
  margin-bottom: 25px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
}
.rects1:hover {
  border: none;
  background-color: white;
  color: cadetblue;
}
.row {
  margin: 0;
}
#circle {
  border: solid 1px black;
  text-align: center;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
