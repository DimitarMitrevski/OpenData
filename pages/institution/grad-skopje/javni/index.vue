<template>
  <div>
    <b-jumbotron class="p-3">
      <b-container class="d-flex justify-content-between" style="height: 300px">
        <div
          style="max-width: 70%"
          class="h-100 d-flex justify-content-center flex-column"
        >
          <h2>План за јавни набавки на Град Скопје за 2021 година</h2>
          <b-button
            variant="dark"
            style="max-width: 230px"
            class="mt-2"
            href="#statistic"
            >Прегледај статистика</b-button
          >
        </div>
        <img
          src="https://data.gov.mk/uploads/group/2021-04-29-063416.696331SkopjeGrbcolor-no-txt.jpg"
          style="width: 200px"
          alt=""
        />
      </b-container>
    </b-jumbotron>
    <b-container id="statistic">
      <!-- <small>{{ stoki }}</small> -->
      <b-row>
        <b-col>
          <h3 class="text-center">
            Договори и рамковни спогодби за јавни набавки за стоки
          </h3>
          <h5 class="text-center mt-3">Потрошени пари по месеци</h5>

          <chart
            :data="{
              јануари: stokiMesec.jan,
              февруари: stokiMesec.feb,
              март: stokiMesec.mar,
              април: stokiMesec.apr,
              мај: stokiMesec.maj,
              јуни: stokiMesec.jun,
              јули: stokiMesec.jul,
              август: stokiMesec.avg,
              септември: stokiMesec.sep,
              октомври: stokiMesec.okt,
              ноември: stokiMesec.noe,
              декември: stokiMesec.dec,
            }"
          />
        </b-col>
        <b-col>
          <h3 class="text-center">
            Договори и рамковни спогодби за јавни набавки за услуги
          </h3>
          <h5 class="text-center mt-3">Потрошени пари по месеци</h5>
          <chart
            :data="{
              јануари: uslugiMesec.jan,
              февруари: uslugiMesec.feb,
              март: uslugiMesec.mar,
              април: uslugiMesec.apr,
              мај: uslugiMesec.maj,
              јуни: uslugiMesec.jun,
              јули: uslugiMesec.jul,
              август: uslugiMesec.avg,
              септември: uslugiMesec.sep,
              октомври: uslugiMesec.okt,
              ноември: uslugiMesec.noe,
              декември: uslugiMesec.dec,
            }"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h3 class="text-center">
            Договори и рамковни спогодби за јавни набавки за работи
          </h3>
          <h5 class="text-center mt-3">Потрошени пари по месеци</h5>
          <chart
            :data="{
              јануари: rabotiMesec.jan,
              февруари: rabotiMesec.feb,
              март: rabotiMesec.mar,
              април: rabotiMesec.apr,
              мај: rabotiMesec.maj,
              јуни: rabotiMesec.jun,
              јули: rabotiMesec.jul,
              август: rabotiMesec.avg,
              септември: rabotiMesec.sep,
              октомври: rabotiMesec.okt,
              ноември: rabotiMesec.noe,
              декември: rabotiMesec.dec,
            }"
          />
        </b-col>
        <b-col>
          <h3 class="text-center">Град скопје потрошени пари во 2021</h3>
          <h5 class="text-center mt-3">Вкупно потрошени пари по месеци</h5>
          <chart
            :data="[
              ['јануари', poMesec.jan],
              ['февруари', poMesec.feb],
              ['март', poMesec.mar],
              ['април', poMesec.apr],
              ['мај', poMesec.maj],
              ['јуни', poMesec.jun],
              ['јули', poMesec.jul],
              ['август', poMesec.avg],
              ['септември', poMesec.sep],
              ['октомври', poMesec.okt],
              ['ноември', poMesec.noe],
              ['декември', poMesec.dec],
            ]"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import data from 'static/GodisenPlanSK2021'
export default {
  data() {
    return {
      stoki: [],
      stokiMesec: {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        maj: 0,
        jun: 0,
        jul: 0,
        avg: 0,
        sep: 0,
        okt: 0,
        noe: 0,
        dec: 0,
      },
      uslugi: [],
      uslugiMesec: {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        maj: 0,
        jun: 0,
        jul: 0,
        avg: 0,
        sep: 0,
        okt: 0,
        noe: 0,
        dec: 0,
      },
      raboti: [],
      rabotiMesec: {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        maj: 0,
        jun: 0,
        jul: 0,
        avg: 0,
        sep: 0,
        okt: 0,
        noe: 0,
        dec: 0,
      },
      poMesec: {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        maj: 0,
        jun: 0,
        jul: 0,
        avg: 0,
        sep: 0,
        okt: 0,
        noe: 0,
        dec: 0,
      },
    }
  },

  created() {
    data.forEach((element) => {
      if (element.mesec == 'јануари') {
        this.poMesec.jan =
          this.poMesec.jan + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'февруари') {
        this.poMesec.feb =
          this.poMesec.feb + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'март') {
        this.poMesec.mar =
          this.poMesec.mar + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'април') {
        this.poMesec.apr =
          this.poMesec.apr + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'мај') {
        this.poMesec.maj =
          this.poMesec.maj + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јуни') {
        this.poMesec.jun =
          this.poMesec.jun + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јули') {
        this.poMesec.jul =
          this.poMesec.jul + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'август') {
        this.poMesec.avg =
          this.poMesec.avg + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'октомври') {
        this.poMesec.okt =
          this.poMesec.okt + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'ноември') {
        this.poMesec.noe =
          this.poMesec.noe + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'декември') {
        this.poMesec.dec =
          this.poMesec.dec + parseFloat(element.denari.replace(/,/g, ''))
      }
    })

    this.stoki = data.filter(
      (item) =>
        item.ТИП == 'Договори и рамковни спогодби за јавни набавки за стоки'
    )
    this.stoki.forEach((element) => {
      if (element.mesec == 'јануари') {
        this.stokiMesec.jan =
          this.stokiMesec.jan + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'февруари') {
        this.stokiMesec.feb =
          this.stokiMesec.feb + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'март') {
        this.stokiMesec.mar =
          this.stokiMesec.mar + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'април') {
        this.stokiMesec.apr =
          this.stokiMesec.apr + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'мај') {
        this.stokiMesec.maj =
          this.stokiMesec.maj + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јуни') {
        this.stokiMesec.jun =
          this.stokiMesec.jun + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јули') {
        this.stokiMesec.jul =
          this.stokiMesec.jul + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'август') {
        this.stokiMesec.avg =
          this.stokiMesec.avg + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'октомври') {
        this.stokiMesec.okt =
          this.stokiMesec.okt + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'ноември') {
        this.stokiMesec.noe =
          this.stokiMesec.noe + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'декември') {
        this.stokiMesec.dec =
          this.stokiMesec.dec + parseFloat(element.denari.replace(/,/g, ''))
      }
    })

    this.uslugi = data.filter(
      (item) =>
        item.ТИП == 'Договори и рамковни спогодби за јавни набавки за услуги'
    )
    this.uslugi.forEach((element) => {
      if (element.mesec == 'јануари') {
        this.uslugiMesec.jan =
          this.uslugiMesec.jan + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'февруари') {
        this.uslugiMesec.feb =
          this.uslugiMesec.feb + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'март') {
        this.uslugiMesec.mar =
          this.uslugiMesec.mar + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'април') {
        this.uslugiMesec.apr =
          this.uslugiMesec.apr + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'мај') {
        this.uslugiMesec.maj =
          this.uslugiMesec.maj + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јуни') {
        this.uslugiMesec.jun =
          this.uslugiMesec.jun + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јули') {
        this.uslugiMesec.jul =
          this.uslugiMesec.jul + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'август') {
        this.uslugiMesec.avg =
          this.uslugiMesec.avg + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'октомври') {
        this.uslugiMesec.okt =
          this.uslugiMesec.okt + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'ноември') {
        this.uslugiMesec.noe =
          this.uslugiMesec.noe + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'декември') {
        this.uslugiMesec.dec =
          this.uslugiMesec.dec + parseFloat(element.denari.replace(/,/g, ''))
      }
    })

    this.raboti = data.filter(
      (item) =>
        item.ТИП == 'Договори и рамковни спогодби за јавни набавки за работи'
    )
    this.raboti.forEach((element) => {
      if (element.mesec == 'јануари') {
        this.rabotiMesec.jan =
          this.rabotiMesec.jan + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'февруари') {
        this.rabotiMesec.feb =
          this.rabotiMesec.feb + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'март') {
        this.rabotiMesec.mar =
          this.rabotiMesec.mar + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'април') {
        this.rabotiMesec.apr =
          this.rabotiMesec.apr + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'мај') {
        this.rabotiMesec.maj =
          this.rabotiMesec.maj + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јуни') {
        this.rabotiMesec.jun =
          this.rabotiMesec.jun + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'јули') {
        this.rabotiMesec.jul =
          this.rabotiMesec.jul + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'август') {
        this.rabotiMesec.avg =
          this.rabotiMesec.avg + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'октомври') {
        this.rabotiMesec.okt =
          this.rabotiMesec.okt + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'ноември') {
        this.rabotiMesec.noe =
          this.rabotiMesec.noe + parseFloat(element.denari.replace(/,/g, ''))
      }
      if (element.mesec == 'декември') {
        this.rabotiMesec.dec =
          this.rabotiMesec.dec + parseFloat(element.denari.replace(/,/g, ''))
      }
    })
  },
}
</script>

<style></style>
