<template>
  <b-container>
    <article class="blog">
      <header class="header">
        <h2>Предлог буџет</h2>
        <div class="author">
          <a href="#!" class="mun">Општина Битола</a>
          <img src="https://placekitten.com/50/50" alt="" />
        </div>
      </header>
      <body>
        <div class="img-holder">
          <img
            class="d-block mx-auto"
            src="https://placekitten.com/1000/400"
            alt=""
          />
        </div>
        <p class="blog-post">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus
          elit eu viverra dignissim. Sed lobortis rutrum leo, et elementum odio
          pretium id. Phasellus id rhoncus felis. Integer venenatis felis eget
          justo blandit semper. Sed accumsan tempus tristique. Sed id cursus
          est. Mauris vehicula odio ut consectetur tincidunt. Nam nec sapien
          ultrices dolor facilisis tristique in aliquam nunc. Duis tincidunt
          felis eget molestie tristique. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Etiam
          facilisis feugiat libero, nec dapibus sapien pellentesque sit amet.
          <br /><br />
          Vivamus eget eleifend dolor. Nunc faucibus ipsum eget felis
          consectetur, vel molestie sem efficitur. Suspendisse sit amet velit et
          eros mollis porta a vel eros. Cras feugiat vel justo in cursus. Ut
          nulla diam, vulputate non tincidunt ut, accumsan a mauris. Cras sit
          amet neque in mi pellentesque placerat et in massa. Sed pretium eros
          id leo consequat fermentum. Nunc scelerisque felis in turpis tempus
          fermentum. Maecenas ac mauris pulvinar, porta ligula quis, eleifend
          purus. Curabitur id viverra libero. Aliquam finibus tincidunt mauris
          non vehicula.
        </p>
        <p class="text-right text-secondary">Oбјавено на 11 март 2020.</p>
      </body>
      <footer class="documents">
        <h4>Документи на предлогот</h4>
        <b-list-group horizontal="md">
          <b-list-group-item
            v-for="(i, k) in 6"
            :key="k"
            href="#"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <p>excel.xsl</p>
              <small class="text-secondary">12/03/2021</small>
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
export default {
  data() {
    return {
      post: {},
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
  },
  // async asyncData({ params, store }){
  //     await store.dispatch('blogs/getSinglePost', params.id);
  //     let arr = store.state.blogs.blogPost;
  //     return {
  //         post: arr
  //     }
  // },
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
</style>
