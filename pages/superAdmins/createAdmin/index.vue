<template>
  <div class="col-10 col-md-4 form">
    <b-container>
      <h2>Регистирај Админ</h2>
    </b-container>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        :label="'Име и презиме'"
        label-for="input-2"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          maxlength="50"
          required
          :state="
            form.name.length > 2 && form.name != ''
              ? true
              : form.name === ''
              ? null
              : false
          "
          :placeholder="'Внеси име и презиме'"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Емаил" label-for="input-1">
        <b-form-input
          id="input-2"
          v-model="form.email"
          maxlength="50"
          type="text"
          :state="
            form.reg.test(form.email) ? true : form.email === '' ? null : false
          "
          required
          placeholder="Внесете Емаил Адреса"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Изберете Општина"
        label-for="input-1"
      >
        <b-form-select
          name="selectOpstini"
          v-model="selectedOpstina"
          :options="optionsOpstini"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Адреса" label-for="input-1">
        <b-form-input
          id="input-2"
          v-model="form.adress"
          maxlength="50"
          type="text"
          required
          placeholder="Внесете адреса"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Телефон:" label-for="input-3">
        <b-container>
          <b-row>
            <b-col cols="4" style="padding: 0px">
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </b-col>
            <b-col>
              <b-form-input
                id="input-3"
                v-model="form.contactTel"
                required
                maxlength="8"
                placeholder="Внесете ваш телефонски број"
                type="tel"
                :state="
                  form.phoneReg.test(form.contactTel)
                    ? true
                    : form.contactTel === ''
                    ? null
                    : false
                "
              ></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Лозинка"
        label-for="input-1"
        :description="
          form.passwordReg.test(form.password)
            ? ''
            : 'Лозинката треба да содржи најмалку 8 карактери од кои најмалку три на латиница од а-Z, најмалку еден специјален знак или број и eдна голема буква'
        "
      >
        <b-form-input
          id="input-4"
          v-model="form.password"
          type="password"
          maxlength="30"
          :state="
            form.passwordReg.test(form.password)
              ? true
              : form.password === ''
              ? null
              : false
          "
          required
          placeholder="Внесете лозинка"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-5"
        label="Потврдете ја лозинката"
        label-for="input-5"
        :description="
          form.password === form.checkPassword
            ? ''
            : 'Лозинките не се совпаѓаат!'
        "
      >
        <b-form-input
          id="input-5"
          v-model="form.checkPassword"
          type="password"
          maxlength="30"
          :state="
            form.password === form.checkPassword && form.password != ''
              ? true
              : form.password === ''
              ? null
              : false
          "
          required
          placeholder="Внесете ја лозинката"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-5">
          <b-form-checkbox value="me" required
            >Се согласувам со условите за користење</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-form-group>

      <b-container>
        <b-button type="submit" variant="primary" align-content="center"
          >Регистрирај профил</b-button
        >
      </b-container>
      <a href="/admins/profile"><p>Оди на профил</p></a>
    </b-form>
  </div>
</template>
<script>
import { db } from '~/plugins/firebase'
import firebase from 'firebase'
require('firebase/auth')

export default {
  name: 'name',
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        checkPassword: '',
        contactTel: '',
        city: '',
        adress: '',
        checked: [],
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        passwordReg: /^(((?=.*\d)(?=.*[a-z])(?=.*[A-Z])){3}|((?=.*\d)(?=.*[a-z])(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])){3}|((?=.*\d)(?=.*[a-z])(?=.*[\u0080-\uffff])){3}|((?=.*\d)(?=.*[A-Z])(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])){3}|((?=.*\d)(?=.*[A-Z])(?=.*[\u0080-\uffff])){3}|((?=.*\d)(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])(?=.*[\u0080-\uffff])){3}|((?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])){3}|((?=.*[a-z])(?=.*[A-Z])(?=.*[\u0080-\uffff])){3}|((?=.*[a-z])(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])(?=.*[\u0080-\uffff])){3}|((?=.*[A-Z])(?=.*[!"#$%&'()*+, \-./:;<=>?@ [\\\]^_`}|}~])(?=.*[\u0080-\uffff])){3}).{8,}$/,
        /*Password Validator
Password must - Have at least 8 characters - Contain characters from at least 3 of the following categories: - English uppercase letters (A-Z) - English lowercase letters (a-z) - numbers (0-9) - Non-alphanumeric symbols (e.g.: !, #, $, %, Space) - Unicode characters */
        phoneReg: /^\d{8}$/,
      },
      userInfo: {},
      selectedOpstina: null,
      optionsOpstini: [
        { value: null, text: 'Изберете една оштина' },
        { value: 'Општина Битола', text: 'Општина Битола' },
        { value: 'Општина Валандово', text: 'Општина Валандово' },
        { value: 'Општина Гостивар', text: 'Општина Гостивар' },
        { value: 'Општина Штип', text: 'Општина Штип' },
        { value: 'Општина Карпош', text: 'Општина Карпош' },
      ],
      show: true,
      selected: '+389',
      options: [{ value: '+389', text: '+389' }],
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
    async onSubmit(evt) {
      evt.preventDefault()
      const contactTel = this.selected + this.form.contactTel
      const forma = {
        adress: this.form.adress,
        city: this.selectedOpstina,
        contactTel: contactTel,
        email: this.form.email,
        imePrezime: this.form.name,
        password: this.form.password,
      }
      this.$store.dispatch('superAdmins/createAdmin', forma)
      this.onReset(evt)
    },

    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.tel = ''
      this.form.password = ''
      this.form.checkPassword = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
<style scoped>
.text-muted {
  font-size: 12px;
}
.custom-select {
  height: auto;
  padding: 0.275rem 1.75rem 0.275rem 0.75rem;
}
.form {
  margin: 0 auto;
  background: #fdfdfd;
  border-radius: 10px;

  /* border-right: 20px solid #f36f62; */
}
.container {
  text-align: center;
}
.container h2 {
  color: #54aec7;
  font-weight: bolder;
  font-size: 30px;
  padding-top: 11px;
}
.btn-primary {
  margin-bottom: 14px;
  background: #54aec7;
  border: none;
  transition: 0.5s;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-weight: 500;
}
.btn-primary:hover {
  background-color: #54aec7;
}

.form-group label {
  font-weight: normal;
  font-size: 14px;
  color: #9c9999;
}
.form-control {
  background: #ebebeb;
  font-size: 14px;
  letter-spacing: -0.03em;
  color: #c4c4c4;
}
.form-control :focus {
  border-color: #54aec7;
  box-shadow: 0 0 0 0.2rem rgba(255, 150, 99, 0.85);
}

.btn-primary-company {
  background: #59c7d6;
}
h2.company {
  color: #59c7d6;
}
.btn-primary-company:hover {
  background-color: #00c7d6;
}
</style>
