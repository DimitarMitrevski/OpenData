<template>
  <div class="info-sidebar">
      <b-sidebar id="sidebar-right" right shadow z-index="1"  @shown="sidebarVisible" @hidden="sidebarHidden" no-header>
        <!-- <template #header>
          <b-icon-x></b-icon-x>
        </template> -->
        <div class="d-flex flex-column justify-content-center align-items-center h-100 wrap-side p-3">
          <div class="infwrapper">
            <h4 class="text-center"><nuxt-link to="/municipality">Општина {{content ? content.name : 'Sidebar'}}</nuxt-link></h4>
            <img v-if="content.grbUrl" class="grb" :src="content.grbUrl" alt="">
            <img v-else class="grb" src="https://republika.mk/wp-content/uploads/2019/12/grb-opshtina-tuzi-sonce-kutlesh-476x640.jpg" alt="">
            <p class="ocenka py-2" :class="content.color"><b-icon icon="star-fill"></b-icon> Индекс: {{content.indeks}}</p>
            <b-row class="oceni px-3">
              <b-col cols="3" style="background: rgb(255 118 118);"
                     v-b-tooltip.hover title="Транспарентност на општината" >
                {{content.transparentnost}}<br><b-icon icon="newspaper"></b-icon>
              </b-col>
              <b-col cols="3" style="background: rgb(119 119 119);"
                     v-b-tooltip.hover title="Отчетност на општината" >
                {{content.otcetnost}}<br><b-icon icon="people-fill"></b-icon>
              </b-col>
              <b-col cols="3" style="background: rgb(187 177 153);"
                     v-b-tooltip.hover title="Праведност на општината" >
                {{content.pravednost}}<br>
                <svg viewBox="0 0 640 512" width="1em" height="1em" focusable="false" role="img" aria-label="inbox fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="b-icon bi"><g><path d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></g></svg>
              </b-col>
              <b-col cols="3" style="background: rgb(116 218 206);"
                     v-b-tooltip.hover title="Вклученост на општината" >
                {{content.vklucenost}}<br><b-icon icon="hand-thumbs-up"></b-icon>
              </b-col>
            </b-row>
            <div class="table-wrap">
              <b-table striped hover :items="[
                { Број_на_жители: 11890, Регион: 'Југоисточен' }
              ]"></b-table>
            </div>
            <div class="chart-wrap" v-if="content.prihodi && content.rashodi">
              <column-chart width="200px" height="150px" :colors="['#74dace']" :data="[[`Приходи:`, content.prihodi], [`Расходи:`, content.rashodi]]"></column-chart>
            </div>
            <b-button variant="light" class="d-block m-auto" target="_blank" href="/files/budzet_stip.pdf">Симни го буџетот <b-icon icon="download"></b-icon></b-button>
            <b-button class="d-block mt-4 mx-auto btn-info" size="lg" to="/municipality">Повеќе...</b-button>
          </div>
        </div>
        <template #footer="{ hide }">
          <div class="d-flex bg-info text-light align-items-center justify-content-center py-2">
            <b-button class="d-block mt-4 mx-auto btn-info oh-son" size="lg" to="/municipality">Повеќе...</b-button>
            <b-button variant="warning" size="sm" @click="hide"><b-icon-x></b-icon-x></b-button>
          </div>
        </template>
      </b-sidebar>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    sidebarVisible(){
      this.$emit('sidebar-shown', true)
    },
    sidebarHidden(){
      this.$emit('sidebar-hidden', true)
    }
  }
}
</script>

<style>
.info-sidebar .b-sidebar.b-sidebar-right { 
  z-index: 1; 
  padding-top: 52px; 
}
.b-sidebar-body {
  overflow: hidden;
}
.oh-son { display: none !important; }
@media only screen and (max-height: 768px) {
  .infwrapper { height: 100%; }
  .info-sidebar .grb { width: 75px !important; }
  .info-sidebar table { font-size: .8rem; }
  .info-sidebar .b-sidebar-body { overflow-y: hidden; }
  .wrap-side { padding-top: 0 !important; }
  .infwrapper h4 { font-size: 1.1rem; }
  .oh-son { display: block !important; margin: 0 !important; }
}
.info-sidebar table { margin-top: .5rem }
.info-sidebar .grb {
  width: 140px;
  display: block;
  margin: auto;
  height: auto;
}
.info-sidebar .oceni > *, .info-sidebar .ocenka {
  text-align: center;
  border-radius: 12px;
  color: #f8f9fa;
  margin-bottom: .2rem;
  margin-top: .5rem;
  line-height: 1.2;
}
.info-sidebar .oceni > * {
  padding: .3rem 0;
  border: 2px solid #f8f9fa;
  cursor: pointer;
}
.info-sidebar .oceni > * .b-icon {
  font-size: 1.5rem;
  color: #00000061;
}
.info-sidebar .chart-wrap > * {
  margin: 2rem auto 0
}
.info-sidebar h4.text-center a { color: black; text-decoration: none; }
</style>