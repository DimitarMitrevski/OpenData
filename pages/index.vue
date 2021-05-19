<template>
  <div>
    <b-container>
      <h1 class="text-center">Организации</h1>
      <b-input-group class="mb-3" append="Пребарај">
        <b-input-group-prepend is-text>
          <span><b-icon icon="search" /></span>
        </b-input-group-prepend>
        <b-form-input placeholder="Пребарувај општини и сетови"></b-form-input>
      </b-input-group>
      <b-row>
        <b-col v-for="javni in javni" :key="javni.id" cols="4">
          <b-card
            :title="javni.imeNabav"
            :img-src="javni.slika"
            img-alt="Image"
            img-top
            no-body
            tag="article"
            class="mb-2 mt-2 h-100 d-flex align-items-center"
            ><b-container class="h-100">
              <b-row align-v="center" class="h-100">
                <b-col cols="12">
                  <b-card-text>
                    {{ javni.opis }}
                  </b-card-text></b-col
                >
                <b-col cols="12">
                  <b-button
                    class="mt-1"
                    :to="'/institution/' + javni.slug"
                    variant="primary"
                    >Дознај повеќе</b-button
                  ></b-col
                >
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      javni: [
        {
          imeNabav: 'Град Скопје',
          slika:
            'https://data.gov.mk/uploads/group/2021-04-29-063416.696331SkopjeGrbcolor-no-txt.jpg',
          opis: 'Град Скопје - Единица на локална самоуправа на Град Скопје',
          slug: 'grad-skopje',
        },
        {
          imeNabav: 'Министерство за труд и социјална политика',
          slika:
            'https://data.gov.mk/uploads/group/2019-04-01-085637.811656mtsp.png',
          opis: 'Министерство за труд и социјална политика',
          slug: 'mtsp',
        },
        {
          imeNabav: 'Државна комисија за спречување на корупцијата',
          slika:
            'https://data.gov.mk/uploads/group/2019-04-12-131502.819445index.jfif',
          opis: 'Државна комисија за спречување на корупцијата',
          slug: 'dksk',
        },
      ],
    }
  },
}
</script>

<style></style>
