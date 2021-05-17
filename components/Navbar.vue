<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Е-општини</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/municipalities/blog/list-all">Објави на општините</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav> </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right text="Најави се">
          <b-dropdown-item to="/users/userSignUp"
            >Регистрирај се</b-dropdown-item
          >
          <b-dropdown-item to="/singin"
            >Најави се како корисник</b-dropdown-item
          >
          <b-dropdown-item to="/signInSectorAdmin"
            >Најави се како Сектор Админ</b-dropdown-item
          >
          <b-dropdown-item to="/signInAdmin"
            >Најави се како Админ</b-dropdown-item
          >
          <b-dropdown-item to="/signInSuperAdmin"
            >Најави се како Супер Админ</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <div v-show="$store.state.users.isLoggedIn == true">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ userDatas.imePrezime ? userDatas.imePrezime : '' }}</em>
            </template>

            <b-dropdown-item
              v-if="$store.state.users.isLoggedIn == true"
              href="/users/profile"
              >Профил</b-dropdown-item
            >

            <b-dropdown-item
              v-if="$store.state.users.isLoggedIn == true"
              @click="odjavi"
              >Одјави се</b-dropdown-item
            >
            <b-dropdown-item
              v-if="$store.state.users.isLoggedIn == false"
              href="/singIn"
              >Најави Се
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </b-navbar-nav>
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
