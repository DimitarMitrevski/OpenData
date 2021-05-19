<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/"
      ><b-icon icon="search"></b-icon> Отворени податоци</b-navbar-brand
    >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item to="/municipalities/blog/list-all"
          >Објави на општините</b-nav-item
        >
      </b-navbar-nav> -->
      <b-navbar-nav>
        <b-nav-item to="/municipalities">Сите општините</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/about-us">За нас</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      isLoggedIn1: false,
      userr: {},
    }
  },

  computed: {
    userDatas() {
      this.$store.dispatch('users/getUser1')
      const userDatas = this.$store.state.users.userInfo
      return userDatas
    },
  },
  methods: {
    odjavi() {
      this.$store.dispatch('admins/signOutGlobal')
    },
  },
}
</script>

<style>
.navbar {
  z-index: 2;
  box-sizing: border-box;
}
</style>
