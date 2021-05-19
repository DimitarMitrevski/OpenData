<template>
  <div class="wrap">
    <b-jumbotron class="p-3">
      <b-container class="d-flex justify-content-between" style="height: 300px">
        <div
          style="max-width: 70%"
          class="h-100 d-flex justify-content-center flex-column"
        >
          <h2>Јавни набавки на Министерство за труд и социјална политика</h2>
          <b-button
            variant="info"
            style="max-width: 200px"
            to="/files/mn_2021.pdf"
            target="_blank"
            >Спушти документ</b-button
          >
          <b-button
            variant="dark"
            style="max-width: 230px"
            class="mt-2"
            href="#statistic"
            >Прегледај статистика</b-button
          >
        </div>
        <img src="/files/mn_cover.png" style="width: 200px" alt="" />
      </b-container>
    </b-jumbotron>
    <b-container id="statistic">
      <h3 class="mt-4">
        Број на договори по месец (вкупно договори: {{ getSum(poMesec) }})
      </h3>
      <chart :data="poMesec" />

      <h3 class="mt-4">
        Постапки на договори (вкупно постапки: {{ poVid.length }})
      </h3>
      <chart :data="poVid" />

      <h3 class="mt-4">Збир на наплати по месец (ден)</h3>
      <chart :data="mesecPay" />
      <h5 class="mt-2 mb-4 text-secondary">
        Вкупен износ на наплати:
        {{
          getSum(mesecPay)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }}
        денари.
      </h5>
    </b-container>
  </div>
</template>

<script>
import data from 'static/GodisenPlanMTSP.json'
export default {
  data() {
    return {
      poMesec: [],
      poVid: [],
      mesecPay: [],
    }
  },
  created() {
    this.getData('mesec', 'poMesec')
    this.getData('postapka', 'poVid')
    this.getMeseciPay()
  },
  methods: {
    getData(val, plc) {
      let myArr = {}
      for (var i = 0; i < data.length; i++) {
        if (data[i][`${val}`]) {
          if (myArr[data[i][`${val}`]]) myArr[data[i][`${val}`]]++
          else myArr[data[i][`${val}`]] = 1
        }
      }
      let arrSec = Object.entries(myArr)
      arrSec.sort((a, b) => b[1] - a[1])
      this[`${plc}`] = arrSec
    },
    getMeseciPay() {
      let myArr = {}
      for (var i = 0; i < data.length; i++) {
        if (data[i].mesec && data[i].cena) {
          let vred = parseFloat(data[i].cena.split(',').join(''))
          if (myArr[data[i].mesec]) myArr[data[i].mesec] += vred
          else myArr[data[i].mesec] = vred
        }
      }
      let arrSec = Object.entries(myArr)
      arrSec.sort((a, b) => b[1] - a[1])
      this.mesecPay = arrSec
    },
    getSum(arr) {
      let sum = 0
      for (var i = 0; i < arr.length; i++) sum += arr[i][1]
      return sum
    },
  },
}
</script>

<style></style>
