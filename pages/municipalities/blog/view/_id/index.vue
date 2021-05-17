<template>
  <b-container>
    <article class="blog">
      <header class="header">
        <h2>{{ post.title }}</h2>
        <div class="author">
          <nuxt-link to="/municipality" class="mun"
            >Општина {{ opstina.name }}</nuxt-link
          >
          <img
            v-if="opstina.grbUrl"
            style="height: 50px; width: 50px"
            :src="opstina.grbUrl"
            alt=""
          />
          <img
            v-else
            style="height: 50px; width: 50px"
            src="https://republika.mk/wp-content/uploads/2019/12/grb-opshtina-tuzi-sonce-kutlesh-476x640.jpg"
            alt=""
          />
        </div>
      </header>
      <body>
        <div class="banner">
          <h2 class="w-100">
            Планирање буџет за Општина {{ opstina.name }}
            <span class="float-right">2021 година</span>
          </h2>
        </div>
        <!-- <img v-if="post.files.length" :src="post.files[0]" style="max-height: 300px" alt=""> -->
        <p class="blog-post">
          {{ post.body }}
        </p>
        <p class="text-right text-secondary">
          Oбјавено на
          {{
            $moment(randomDate(new Date(2020, 0, 1), new Date())).format('lll')
          }}.
        </p>
      </body>
      <footer class="documents">
        <h4>Документи на предлогот</h4>
        <b-list-group horizontal="md">
          <b-list-group-item
            href="/files/budzet_stip.pdf"
            target="_blank"
            v-for="(i, k) in 6"
            :key="k"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <p>budzet.pdf</p>
              <small class="text-secondary">12/03</small>
            </div>
            <p class="text-center">
              <b-icon icon="file-earmark-spreadsheet-fill"></b-icon>
            </p>
          </b-list-group-item>
        </b-list-group>
      </footer>
    </article>
    <blog-comments />
  </b-container>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      post: {},
      filetype: '',
      opstina: {},
      opstini: [],
    }
  },
  // mounted() {
  //     console.log(this.post);
  //     firebase.storage().refFromURL(this.post.files[0]).getMetadata()
  //     .then(function(metadata) {
  //         console.log(metadata)
  //     })
  //     .catch(e => { console.error(e) })
  // },
  async asyncData({ params, store }) {
    await store.dispatch('blogs/getSinglePost', params.id)
    let arr = store.state.blogs.blogPost
    let ops = store.state.municipality.municipalities
    let opsT = store.state.municipality.municipality
    return {
      post: arr,
      opstini: ops,
      opstina: opsT
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
    randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      )
    },
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

<style>
.blog h2,
.blog h4 {
  margin: 0;
}
.blog .header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
}
.blog .author {
  display: flex;
  align-items: center;
}
.blog .author a {
  text-align: right;
  font-size: 18px;
  color: #343a40;
}
.blog .author img {
  border-radius: 100%;
  margin-left: 1rem;
}
.blog body {
  font-size: 1.25rem;
  text-align: justify;
}
.blog .text-right {
  font-size: 1.1rem;
}
.blog body > *,
.blog footer > * {
  margin-bottom: 2rem;
}
.blog .img-holder {
  width: 100%;
  /* background: #303030 */
}
.blog .b-icon {
  font-size: 2rem;
}
.blog .banner {
  background-image: url(https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg);
  background-size: cover;
  background-position: center;
  height: 190px;
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
}
.blog .banner::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(23 162 184 / 60%);
  left: 0;
  top: 0;
}
.blog .banner h2 {
  z-index: 2;
  color: #ffffff;
  position: relative;
}
</style>
