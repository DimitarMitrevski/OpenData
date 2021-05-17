<template>
  <div class="popUpContainer">
    <div class="popUp" v-if="post">
      <a
        href="#!"
        style="
          position: fixed;
          z-index: 103;
          top: 25%;
          right: 25%;
          font-size: 2.5vw;
        "
        @click="$emit('close-modal')"
        >x</a
      >
      <b-form-textarea
        id="input-group-1"
        :label="'Внеси Текст за вашиот пост'"
        label-for="input-group-1"
      >
      </b-form-textarea>
    </div>
    <div class="darken" v-if="post"></div>
  </div>
</template>

<script>
export default {
  props: ['post'],
}
</script>
<style scoped>
.popUpContainer {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  pointer-events: none;
  margin: 0 auto;
  z-index: 103;
}
.popUp {
  position: fixed;
  width: 50vw;
  height: 60vh;
  top: 50;
  display: flex;
  justify-content: center;
  border-radius: 35px;
  align-items: center;
  background: white;
  pointer-events: auto;
  margin: 0 auto;
  z-index: 103;
}
.darken {
  width: 100vw;
  height: 100vh;
  top: -0%;
  position: fixed;
  background: black;
  opacity: 0.7;
  z-index: 100;
}
#input-group-1 {
  color: black;
  width: 30vw;
  height: 30vh;
}
</style>
