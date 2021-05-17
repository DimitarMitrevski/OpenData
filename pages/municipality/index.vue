<template>
  <div class="bg-all">
    <!-- Send Message Modal -->
    <b-modal
      id="modal-lg"
      size="xl"
      centered
      :title="`Испрати порака до ${opstina}`"
    >
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email адреса:"
          label-for="input-1"
          description
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Внесете e-mail адреса"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Вашето Име и Презиме:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Внесете Име и Презиме"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Предмет на пораката:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.subject"
            type="text"
            placeholder="Внесете го предметот на пораката"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Изберете сектор кој е одговорен:"
          label-for="input-5"
        >
          <b-form-select
            v-model="form.selected"
            :options="options"
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-4" label="Порака" label-for="input-4">
          <b-form-textarea
            rows="5"
            id="input-4"
            v-model="form.body"
            type="text"
            placeholder="Внесете го предметот на пораката"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          id="input-group-6"
          label="Додадете датотека:"
          label-for="input-6"
        >
          <b-form-file
            v-model="file1"
            :state="Boolean(file1)"
            @change.prevent="uploadFile($event.target.files)"
            placeholder="Изберете датотека или повлечете ја тука"
            drop-placeholder="Спуштете датотека тука..."
          ></b-form-file>
        </b-form-group>
        <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="form.checked"
            id="checkboxes-4"
            :aria-describedby="ariaDescribedby"
            required
          >
            <b-form-checkbox value="Се согласувам со условите за користење."
              >Се согласувам со условите за користење.</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">
          Испрати порака
          <b-icon icon="cursor"></b-icon>
        </b-button>
        <h4 v-if="send">Успешно Испратена Порака!</h4>
      </b-form>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">Назад</b-button>
      </template>
    </b-modal>
    <!-- End Send Message Modal -->

    <!-- Vote for Company Modal -->
    <b-modal id="modal-lg-1" size="lg" centered :title="`Оцени ја ${opstina}`">
      <b-form @submit.prevent="onSubmit1">
        <div v-if="next === 0">
          <b-form-group
            label="Дали општината е транспарентна?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer10"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали општината дава доволно отчетност?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer1"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали општината има добра комуникација со граѓаните?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer2"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали граѓаните се вклучени во планирање на буџетот?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer3"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали општината се грижи за буџетот?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer4"
              :options="answers"
            ></b-form-select>
          </b-form-group>
        </div>
        <div v-if="next === 1">
          <b-form-group
            label="Дали општината го користи буџетот за тоа што е наменет?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer5"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали буџетот е доволен за активностите на општината?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer6"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали општината има добра комуникација со граѓаните?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer7"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали граѓаните се вклучени во планирање на буџетот?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer8"
              :options="answers"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="Дали општината се грижи за буџетот?"
            label-for="select"
          >
            <b-form-select
              v-model="answer.answer9"
              :options="answers"
            ></b-form-select>
          </b-form-group>
        </div>
        <div v-if="next === 2">
          <b-container>
            <b-row>
              <h3>Дали сте сигурни дека сакате да ја поденсете формата?</h3>
            </b-row>
            <b-row>
              <b-col class="text-center">
                <b-button variant="primary" @click.prevent="onSubmit1()"
                  >Да, поднеси</b-button
                >
                <b-button
                  variant="danger"
                  @click="$bvModal.hide('modal-lg-1'), (next = 0)"
                  >Не, откажи</b-button
                >
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-form>
      <template #modal-footer>
        <b-container>
          <b-row>
            <b-col>
              <b-button variant="secondary" @click="next--" v-if="next !== 0"
                >&laquo; Претходно</b-button
              >
            </b-col>
            <b-col class="text-right">
              <b-button v-if="next !== 2" variant="dark" @click="next++"
                >Следно &raquo;</b-button
              >
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
    <!-- End Voting Modal -->
    <!-- Default View -->
    <b-container fluid style="min-height: 100vh" align-v="vertical">
      <b-row>
        <b-col cols="8">
          <b-row>
            <b-col cols="2" class="logo">
              <img :src="opstinaObj.grbUrl" width="100%" />
            </b-col>
            <b-col cols="8">
              <h2>
                {{ opstina }}
                <b-badge variant="success" v-if="ocena != 0"
                  >Оцена: {{ ocena }}</b-badge
                >
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                sit amet auctor ligula. Ut vitae viverra lectus. Sed in felis
                tincidunt, lobortis nunc nec, tempus urna. Aenean convallis
                vitae sapien eleifend interdum. Aliquam semper lobortis euismod.
                Integer eget sollicitudin ante. Suspendisse potenti.
              </p>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4">
          <div
            class="side-banner"
            @click="
              () => {
                $router.push('municipalities/blog/list-all')
              }
            "
          >
            <b-icon icon="info-circle-fill" scale="3" variant="light"></b-icon>
            <p style="margin-left: 21px"><br />Новости за Општината</p>
          </div>
          <br />
          <b-button v-b-modal.modal-lg variant="primary" block>
            Испрати порака
            <b-icon icon="chat-text"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <br />
      <div class="bg">
        <b-row>
          <b-col> <b-icon icon="geo-alt"></b-icon>бул. 1-ви Мај бр.61 </b-col>
          <b-col>
            <b-icon icon="globe2"></b-icon>
            <a href="https://bitola.gov.mk" target="_blank"
              >https://bitola.gov.mk</a
            >
          </b-col>
          <b-col>
            <b-button v-b-modal.modal-lg-1 variant="outline-light" block>
              <b-icon icon="pencil-square"></b-icon>Оцени ја Општината
            </b-button>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col> <b-icon icon="telephone"></b-icon>+389 47 208 442 </b-col>
          <b-col> <b-icon icon="printer"></b-icon>+389 47 208 307 </b-col>
          <b-col>
            <b-icon icon="envelope"></b-icon>
            <a href="mailto://bitola@t-home.mk">bitola@t-home.mk</a>
          </b-col>
        </b-row>
      </div>
      <hr />
      <b-container fluid class="cont">
        <b-row>
          <b-col>
            <div class="actions">
              <h3>
                Жители:
                <br />
                <b-icon icon="people"></b-icon>200,000
              </h3>
              <column-chart
                width="100"
                :data="[
                  ['2018', 100000],
                  ['2019', 98000],
                  ['2020', 97500],
                ]"
                xtitle="Година"
                ytitle="Популација"
              ></column-chart>
            </div>
          </b-col>
          <b-col>
            <div class="actions">
              <h3>
                Буџет:
                <br />
                <b-icon icon="cash-stack"></b-icon>200,000ден
              </h3>
              <pie-chart
                width="100"
                :data="[
                  ['Вкупен буџет', 100],
                  ['Реализиран', 40],
                ]"
              ></pie-chart>
            </div>
          </b-col>
          <b-col>
            <div class="actions">
              <h3>
                Искористени:
                <br />
                <b-icon icon="cash"></b-icon>100,000ден
              </h3>
              <bar-chart
                :data="[
                  ['Јануари-Март', 30000],
                  ['Април-Мај', 20000],
                  ['Мај-Јуни', 10000],
                ]"
                width="100%"
              ></bar-chart>
            </div>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col></b-col>
          <b-col>
            <div style="min-height: 100%; text-align: center">
              <h3 class="nabavki" @click="scroll">
                <b-icon
                  icon="book"
                  variant="light"
                  style="margin-right: 10px"
                ></b-icon
                >Јавни набавки
              </h3>

              <b-button
                variant="outline-light"
                style="text-decoration: none"
                class="d-block mx-auto mb-3"
                target="_blank"
                href="/files/budzet_stip.pdf"
                >Симни ги јавните набавки <b-icon icon="download"></b-icon
              ></b-button>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
        <div
          style="border-radius: 1rem"
          class="d-flex justify-content-center align-items-center flex-column bg-light p-3"
        >
          <h4 class="text-dark">Потрошени средства: 50,000 мкд.</h4>
          <bar-chart
            :max="25000"
            :data="[
              ['Еуро Фарм', 19460],
              ['Раткошпед', 10670],
              ['Зегин', 9480],
              ['Осигурителна полиса - Скопје', 5536],
              ['Манче Дент', 4000],
            ]"
            :colors="[['#3366cc', '#17a2b8', 'cadetblue', '#20c997']]"
          ></bar-chart>
        </div>
        <br />
        <Nabavki :opstina="opstina" />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import firebaseApp from 'firebase/app'
export default {
  head() {
    return {}
  },
  data() {
    return {
      opstina: '',
      opstinaObj: {},
      file1: null,
      send: false,
      ocena: 0,
      form: {
        email: '',
        name: '',
        subject: '',
        body: '',
        checked: [],
        selected: null,
        file: null,
      },
      show: true,
      options: [
        { value: null, text: 'Ве молиме изберете сектор' },
        { value: 'Финансии', text: 'Финансии' },
        { value: 'Образование', text: 'Образование' },
        { value: 'Урбанизам', text: 'Урбанизам' },
        { value: 'Отворени податоци', text: 'Отворени податоци' },
        {
          value: 'Здравство',
          text: 'Здравство - Нема ваков сектор',
          disabled: true,
        },
      ],

      answer: {
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        answer5: null,
        answer6: null,
        answer7: null,
        answer8: null,
        answer9: null,
        answer10: null,
      },
      answers: [
        { value: null, text: 'Изберете еден одговор' },
        { value: 2, text: 'Незадоволително' },
        { value: 3, text: 'Доволно' },
        { value: 4, text: 'Многу добро' },
        { value: 5, text: 'Одлично' },
      ],
      next: 0,
    }
  },
  methods: {
    ok() {},
    async onSubmit(event) {
      event.preventDefault()
      this.form['opstina'] = this.opstina
      // console.log(this.form)
      // alert(JSON.stringify(this.form))
      await this.$store.dispatch('municipality/saveMsg', this.form)
      // let msg = await this.$store.getters['municipality/getMsg']
      console.log(this.$store.state.municipality.message)
      this.form.email = ''
      this.form.name = ''
      this.form.subject = ''
      this.form.body = ''
      this.form.checked = []
      this.form.file = ''
      this.file1 = null
      this.send = true
      this.$nextTick(function () {
        setTimeout(() => {
          this.send = false
        }, 2500)
      })
    },
    uploadFile(files) {
      // if (this.form.file) this.deleteImage()
      if (!files.length) {
        return
      }
      const file = files[0]
      // if (!file.type.match('image.*')) {
      //   alert('Please upload an image.')
      //   return
      // }
      const metadata = {
        contentType: file.type,
      }
      this.isUploadingImage = true
      const storage = firebase.storage()
      const imageRef = storage.ref(`messages/toMunicipality/${file.name}`)
      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          return snapshot.ref.getDownloadURL().then((url) => {
            this.form.file = url
          })
        })
        .catch((error) => {
          console.error('Error uploading image', error)
        })
      uploadTask.then((url) => {
        // this.form.file[this.form.file.length] = url
        // this.isUploadingImage = false
      })
    },
    deleteImage() {
      // this.isDeletingImage = true
      firebase
        .storage()
        .refFromURL(this.form.file)
        .delete()
        .then(() => {
          this.form.file = null
        })
        .catch((error) => {
          console.error('Error deleting image', error)
        })
      this.$refs.imageFile.value = null
      this.form.file = null
      // this.isDeletingImage = false;
    },
    onSubmit1() {
      let numAnswers = 0
      for (const [key, value] of Object.entries(this.answer)) {
        if (value) {
          this.ocena += value
          numAnswers++
        } else {
          alert('Не смее да оставите не одговорени прашања!')
          return
          break
        }
      }
      this.ocena /= numAnswers
      alert(`Вашата просечна оцена за ${this.opstina} изнесува ${this.ocena}`)
      this.$bvModal.hide('modal-lg-1')
    },
    scroll() {
      window.scrollTo({
        top: window.screen.height - 20,
        behavior: 'smooth',
      })
    },
  },
  async created() {
    if (localStorage.getItem('opstina') !== null && this.opstina === '') {
      const opsO = JSON.parse(localStorage.getItem('opstina'))
      console.log(opsO, 'line 546')
      this.opstina = 'Општина ' + opsO.name
      this.opstinaObj = await opsO
    } else if (this.opstina === '') {
      const municipalities = this.$store.state.municipality.municipalities
      var result = municipalities.filter(
        (municipality) => municipality.name === 'Битола'
      )
      this.opstina = 'Општина Битола'
      this.opstinaObj = result[0]
    }
  },
  asyncData({ store }) {
    if (
      store.state.municipality.municipality == null ||
      store.state.municipality.municipality == ''
    )
      return
    else {
      let arr = store.state.municipality.municipality

      if (arr.length > 10) {
        let municipalities = store.state.municipality.municipalities
        var result = municipalities.filter(
          (municipality) => municipality.name === arr.substr(8, arr.length)
        )

        return {
          opstina: arr,
          opstinaObj: result[0],
        }
      } else {
        // return {
        //   opstina: 'Општина ' + arr.name,
        //   opstinaObj: arr,
        //   opstinaSelected: arr.name,
        // }
      }
    }
    // await store.getters.getMunicipality;
  },
}
</script>

<style scoped>
.bg-all {
  padding-top: 10px;
  background: cadetblue;
  color: white;
}
.nabavki {
  cursor: pointer;
}
.nabavki:hover {
  text-decoration: underline;
}

a {
  color: white;
  text-decoration: underline;
}
td a {
  color: #17a2b8;
}
.h3 {
  text-align: center;
  color: white;
}
hr {
  background: white;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.side-banner {
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  cursor: pointer;
  transition: 0.3s;
}
.side-banner:hover {
  background: white;
  color: cadetblue;
}
h2 {
  margin: 15px;
}
.min-heigth .col {
  min-height: 200px;
  /* background: yellow; */
  padding: 35px auto;
}
.col .actions {
  background: #f7f7fe;
  min-height: 100%;
  padding: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 20px;
}
.col .actions:hover {
  background: #ffffff;
}
.cont {
  padding: 20px;
}
.cont .col {
  min-height: 70px;
}
.actions h3 {
  text-align: center;
  font-size: 1.5rem;
  color: black;
}
</style>
