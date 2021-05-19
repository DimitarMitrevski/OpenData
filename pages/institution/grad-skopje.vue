<template>
  <div>
    <small>{{ data }}</small>
  </div>
</template>

<script>
import data from 'static/GodisenPlanSK2021'
export default {
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.data = data
  },
}
</script>

<style></style>
