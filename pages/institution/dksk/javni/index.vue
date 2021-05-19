<template>
  <div class="wrap">
    <b-jumbotron class="p-3">
      <b-container class="d-flex justify-content-between" style="height: 300px">
        <div
          style="max-width: 70%"
          class="h-100 d-flex justify-content-center flex-column"
        >
          <h2>
            Јавни набавки на Државна комисија за спречување на корупцијата
          </h2>
          <b-button
            variant="info"
            style="max-width: 200px"
            to="/files/2021.pdf"
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
        <img src="/files/dksk_cover.png" style="width: 200px" alt="" />
      </b-container>
    </b-jumbotron>
    <b-container id="statistic">
      <h3 class="mt-4">
        Број на набавки по месец (вкупно: {{ getSum(poMesec) }})
      </h3>

      <chart :data="poMesec" />
      <!-- <column-chart :data="poMesec" :download="true"></column-chart> -->
      <h3 class="mt-4">
        Видови на договор (бр. на договори: {{ getSum(poMesec) }})
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
import { Sheet1 } from 'static/GodisenPlanDKSK.json'
export default {
  data() {
    return {
      poMesec: [],
      poVid: [],
      mesecPay: [],
    }
  },
  created() {
    this.getData('pochetokMesec', 'poMesec')
    this.getData('vidNaDogovor', 'poVid')
    this.getMeseciPay()
  },
  methods: {
    getData(val, plc) {
      let myArr = {}
      for (var i = 0; i < Sheet1.length; i++) {
        if (Sheet1[i][`${val}`]) {
          if (myArr[Sheet1[i][`${val}`]]) myArr[Sheet1[i][`${val}`]]++
          else myArr[Sheet1[i][`${val}`]] = 1
        }
      }
      let arrSec = Object.entries(myArr)
      arrSec.sort((a, b) => b[1] - a[1])
      this[`${plc}`] = arrSec
    },
    getMeseciPay() {
      let myArr = {}
      for (var i = 0; i < Sheet1.length; i++) {
        if (Sheet1[i].pochetokMesec && Sheet1[i].procenetaVrednost) {
          let vred = parseFloat(Sheet1[i].procenetaVrednost.split(',').join(''))
          if (myArr[Sheet1[i].pochetokMesec])
            myArr[Sheet1[i].pochetokMesec] += vred
          else myArr[Sheet1[i].pochetokMesec] = vred
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
