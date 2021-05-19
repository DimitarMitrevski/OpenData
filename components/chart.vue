<template>
  <div>
    <b-form-select
      size="sm"
      v-model="selected"
      :options="options"
    ></b-form-select>
    <div class="mt-3">
      <transition name="component-fade" mode="out-in">
        <line-chart
          v-if="selected == 'a'"
          :data="data"
          :download="true"
        ></line-chart>

        <area-chart
          v-if="selected == 'b'"
          :data="data"
          :download="true"
        ></area-chart>

        ><pie-chart
          v-if="selected == 'c'"
          :data="data"
          :download="true"
        ></pie-chart>

        <bar-chart
          v-if="selected == 'd'"
          :data="data"
          :download="true"
        ></bar-chart>

        <column-chart
          v-if="selected == 'e'"
          :data="data"
          :download="true"
        ></column-chart
      ></transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
    },
  },
  data() {
    return {
      seen: false,
      selected: 'b',
      options: [
        { value: null, text: 'Одберете вид на графикон' },
        { value: 'a', text: 'Линиски графикон' },
        { value: 'b', text: 'Површински графикон' },
        { value: 'c', text: 'Пита графикон' },
        { value: 'd', text: 'Табеларен графикон' },
        { value: 'e', text: 'Колона графикон' },
      ],
    }
  },
  created() {
    if (process.client) {
      const randomArr = ['a', 'b', 'c', 'd', 'e']
      this.selected = randomArr[Math.floor(Math.random() * randomArr.length)]
    }
  },
}
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.4s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
