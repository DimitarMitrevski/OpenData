<template>
  <div>
    <b-modal
      id="my-modal"
      v-b-modal.my-modal
      size="xl"
      title="Испратете порака до админот"
      centered
    >
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-2" label="Порака" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Внесете го предметот на пораката"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Порака">
          <b-form-textarea
            id="textarea"
            v-model="form.body"
            placeholder="Напишете порака"
            rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <b-button type="submit" variant="primary">Испратете порака</b-button>
          <p v-if="message">Успешно испратена порака...</p>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            size="sm"
            class="float-right"
            @click="$bvModal.hide('my-modal')"
          >
            Назад
          </b-button>
        </div>
        <div></div>
      </template>
    </b-modal>
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
              <b-button class="post" to="/municipalities/blog/create">
                Објави Пост
                <b-icon icon="box-arrow-in-up-right" scale="1"> </b-icon>
              </b-button>
            </div>
            <div class="newAdmin">
              <b-button
                v-b-modal.my-modal
                variant="primary"
                block
                @click="post = !post"
              >
                Прати порака до админ
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
      userID: {},
      message: false,
      form: {
        email: '',
        name: '',
        body: '',
      },
    }
  },
  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getdispatch(user.uid)
      } else {
        this.$router.push('/signInSectorAdmin')
      }
    })
  },
  watch: {
    message(newVal, oldVal) {
      console.log(oldVal, newVal, 'line 163')
      if (newVal) {
        this.$nextTick(function () {
          setTimeout(() => {
            this.message = false
          }, 2000)
        })
      }
    },
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
      await this.$store.dispatch('admins/getSector', uid)
      const datas = await this.$store.state.admins.sectorAdminInfo
      const userID = uid
      this.datas = datas
    },
    onSubmit(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.body = ''
      this.message = true

      this.timeOut()
    },
    timeOut() {
      setTimeout(function () {
        this.message = false
      }, 1000)
    },
  },
}
</script>
<style scoped>
.adminProfileCont {
  width: 100vw;
  background: cadetblue;
  z-index: 104;
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
