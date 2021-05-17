<template>
  <div class="blog-list-wrap">
    <b-container>
      <h2>Објави од Општините</h2>
      <b-card v-for="(blog, k) in currentBlogs" :key="k" :title="blog.title">
        <small class="text-secondary"
          >Објава од: Општина {{ opstina.name }}</small
        >
        <b-card-text>
          {{ blog.body }}
        </b-card-text>
        <b-button :to="'/municipalities/blog/view/' + blog.title" variant="info"
          >Отворија објавата</b-button
        >
      </b-card>
      <div class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" @click.prevent="previous" href="#">Previous</a>
          </li>
          <li
            class="page-item"
            v-for="(i, k) in noPages"
            :key="k"
            @click="selectPage(i - 1)"
            :class="{ active: i === currentPage + 1 }"
          >
            <a class="page-link" href="#!">{{ i }}</a>
          </li>
          <li class="page-item">
            <a class="page-link" @click.prevent="next" href="#">Next</a>
          </li>
        </ul>
      </div>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      allBlogs: [],
      currentBlogs: [],
      pageSize: 4,
      currentPage: 0,
      noPages: 0,
      opstini: [],
      opstina: {},
    }
  },
  async asyncData({ store }) {
    await store.dispatch('blogs/getAllBlogPosts')
    let arr = store.state.blogs.blogPosts
    let ops = store.state.municipality.municipalities
    let opsT = store.state.municipality.municipality
    return {
      allBlogs: arr,
      noPages: Math.ceil(arr.length / 4),
      opstini: ops,
      opstina: opsT,
    }
  },
  async created() {
    if (
      !localStorage.getItem('opstina') ||
      !this.$store.state.municipality.municipality
    ) {
      const idx = Math.floor(Math.random() * this.opstini.length)
      this.opstina = this.opstini[idx]
      this.$store.dispatch('municipality/setSelectedMunicipality', this.opstina)
      localStorage.setItem('opstina', JSON.stringify(this.opstina))
    }
    this.currentBlogs = this.allBlogs.slice(0, this.pageSize)
    
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

    next() {
      if (this.currentPage == this.noPages - 1) return
      this.currentPage++
      this.currentBlogs = this.allBlogs.slice(
        this.pageSize * this.currentPage,
        this.pageSize * this.currentPage + this.pageSize
      )
    },
    previous() {
      if (this.currentPage == 0) return
      this.currentPage--
      this.currentBlogs = this.allBlogs.slice(
        this.pageSize * this.currentPage,
        this.pageSize * this.currentPage + this.pageSize
      )
    },
    selectPage(i) {
      this.currentPage = i
      this.currentBlogs = this.allBlogs.slice(
        this.pageSize * this.currentPage,
        this.pageSize * this.currentPage + this.pageSize
      )
    },
  },
}
</script>

<style>
.blog-list-wrap {
  margin-top: 2rem;
}
.blog-list-wrap .container > * {
  margin-bottom: 2rem;
}
.blog-list-wrap .page-item .page-link {
  box-shadow: none !important;
}
.blog-list-wrap .page-item:not(.active) .page-link {
  color: #17a2b8 !important;
}
.blog-list-wrap .page-item.active .page-link {
  background: #17a2b8 !important;
  border-color: #17a2b8 !important;
}
</style>
