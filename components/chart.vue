<template>
  <div>
    <b-form-select
      size="sm"
      v-model="selected"
      :options="options"
    ></b-form-select>
    <div class="mt-3">
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
      <pie-chart
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
      ></column-chart>
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
}
</script>

<style></style>
