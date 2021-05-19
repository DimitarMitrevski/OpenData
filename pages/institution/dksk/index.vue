<template>
  <div class="wrap">
    <b-jumbotron
      class="p-3 rounded-0"
      style="
        background-image: url('https://images.unsplash.com/photo-1454006639960-af9b6a303eae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
        background-size: cover;
        background-position: center;
      "
    >
      <b-container class="d-flex align-items-center flex-column">
        <img
          src="https://data.gov.mk/uploads/group/2019-04-12-131502.819445index.jfif"
          style="width: 300px"
          alt=""
          class="mb-3"
        />
        <div
          style="max-width: 70%"
          class="h-100 d-flex justify-content-center flex-column text-center"
        >
          <h2 class="mb-4">Податочни сетови за Град Скопје</h2>
          <b-button
            variant="info"
            style="max-width: 250px"
            href="https://www.mtsp.gov.mk/"
            target="_blank"
            ><b-icon icon="info-circle"></b-icon> Прегледај вебстрана</b-button
          >
          <b-button
            variant="dark"
            style="max-width: 230px"
            class="mt-2"
            href="#statistic"
            >Прегледај статистика</b-button
          >
        </div>
      </b-container>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col cols="4">
          <nuxt-link to="/institution/dksk/javni">
            <div
              class="p-3 bg-light border rounded"
              style="
                min-height: 225px;
                background-image: url('https://denar.mk/wp-content/uploads/2019/09/mito.jpg');
                background-size: cover;
              "
            >
              <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                <span class="bg-light px-1 py-0">
                  <b-icon icon="cash"></b-icon> Буџет на државна комисија за
                  спречување на корупцијата
                </span>
              </h5>
            </div>
          </nuxt-link>
        </b-col>
        <b-col cols="4">
          <nuxt-link to="/institution/dksk/javni">
            <div
              class="p-3 bg-light border rounded"
              style="
                min-height: 225px;
                background-image: url('/files/vozila-skapi3.jpg');
              "
            >
              <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                <span class="bg-light px-1 py-0">
                  <b-icon icon="people-fill"></b-icon> Регистар на службени
                  возила од државните институции кои ги води ДИК
                </span>
              </h5>
            </div>
          </nuxt-link>
        </b-col>
        <b-col cols="4">
          <nuxt-link to="/institution/dksk/javni">
            <div
              class="p-3 bg-light border rounded"
              style="
                min-height: 225px;
                background-image: url('https://ourlancashire.org.uk/app/uploads/2020/08/shutterstock_634491785.jpg');
                background-size: cover;
              "
            >
              <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                <span class="bg-light px-1 py-0">
                  <b-icon icon="shop"></b-icon> Информации за вработените во
                  секретаријатот на ДКСК
                </span>
              </h5>
            </div>
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style>
h5 {
  text-align: center;
}
a > div {
  display: flex;
  align-items: center;
}
</style>
