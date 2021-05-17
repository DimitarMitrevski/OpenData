<template>
  <b-container>
    <div class="blog-form">
      <h2>Креирај нова објава</h2>
      <b-form @submit.prevent="submitForm" @reset="resetForm">
        <b-form-group id="input-group-2" label="Наслов:" label-for="input-2">
          <b-form-input
            id="naslov"
            v-model="naslov"
            placeholder="Внесете наслов на објавата"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Содржина:" label-for="input-3">
          <b-form-textarea
            id="textarea"
            v-model="sodrzina"
            placeholder="Внесете содржина..."
            rows="8"
            no-resize
          ></b-form-textarea>
        </b-form-group>

        <!-- <b-form-group id="input-group-3" label="Датотеки:" label-for="input-3">
                    <b-form-file
                    multiple
                    v-model="files"
                    :state="Boolean(files)"
                    placeholder="Одберете датотеки или повлечете ги тука..."
                    drop-placeholder="Повлечете ја датотеката тука..."
                    browse-text="Пребарај"
                    @change.prevent="upload($event.target.files)"
                    ></b-form-file>
                </b-form-group> -->

        <b-button size="lg" type="submit" variant="primary">Објави</b-button>
        <b-button
          size="lg"
          type="reset"
          variant="danger"
          @click="$router.go(-1)"
          >Откажи</b-button
        >
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { db } from '~/plugins/firebase'
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      naslov: '',
      sodrzina: '',
      files: null,
      imgUrl: [],
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

    resetForm() {
      this.naslov = this.files = this.sodrzina = null
      this.deleteFiles()
    },
    upload(files) {
      const storage = firebase.storage()

      for (var i = 0; i < files.length; i++) {
        const imageRef = storage.ref(`blogs/files/${files[i].name}`)

        const metadata = {
          contentType: files[i].type,
        }

        const uploadTask = imageRef
          .put(files[i], metadata)
          .then((snapshot) => {
            return snapshot.ref.getDownloadURL().then((url) => {
              return url
            })
          })
          .catch((error) => {
            console.error('Error uploading image', error)
          })

        uploadTask.then((url) => {
          this.imgUrl.push(url)
        })
        console.log(this.imgUrl)
      }
    },
    deleteFiles() {
      for (var i = 0; i < this.imgUrl.length; i++) {
        firebase
          .storage()
          .refFromURL(this.imgUrl[i])
          .delete()
          .catch((error) => {
            console.error('Error deleting image', error)
          })
      }
      this.imgUrl = []
    },
    submitForm() {
      try {
        var blogPost = {
          title: this.naslov,
          body: this.sodrzina,
          files: this.imgUrl,
        }
        db.collection('blogPosts').add(blogPost)
        this.naslov = this.files = this.sodrzina = null
        this.imgUrl = []
        this.$router.push('/municipalities/blog/list-all')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style>
.blog-form {
  font-size: 1.25rem;
  margin-top: 2rem;
}
.blog-form > * {
  margin-bottom: 2rem;
}
.blog-form input,
.blog-form textarea {
  font-size: 1.25rem;
}
</style>
