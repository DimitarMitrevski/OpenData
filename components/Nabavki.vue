<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <label for="selectOpstini">Изберете Општина</label>
          <b-form-select name="selectOpstini" v-model="selectedOpstina" :options="optionsOpstini"></b-form-select>
        </b-col>
        <b-col>
          <label for="selectOpstini">Број на резулати по страна</label>
          <b-form-select name="selectOpstini" v-model="perPage" :options="resultsPerPage"></b-form-select>
        </b-col>
        <b-col>
          <label for="datepicker-dateformat1">Од</label>
          <b-form-datepicker
            id="datepicker-dateformat1"
            :date-format-options="{
              year: 'numeric',
              day: 'numeric',
              month: 'numeric',
            }"
            v-bind="labels[locale] || {}"
            :locale="locale"
            v-model="dataOd"
            reset-button
            @click="getDataOd(dataOd)"
          ></b-form-datepicker>
        </b-col>
        <b-col>
          <label for="datepicker-dateformat2">До</label>
          <b-form-datepicker
            id="datepicker-dateformat2"
            :date-format-options="{
              year: 'numeric',
              day: 'numeric',
              month: 'numeric',
            }"
            v-model="dataDo"
            reset-button
            v-bind="labels[locale] || {}"
            :locale="locale"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-table
          v-if="selectedOpstina"
          :items="items"
          :fields="fields"
          caption-top
          head-variant="dark"
          table-variant="light"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(opstina1)>
            <b class="text-info">{{ selectedOpstina }}</b>
          </template>
          <template #cell(link)="data">
            <a :href="data.value" target="_blank">Линк од договорот</a>
          </template>

          <template #table-caption>
            <h3 class="h3">Направени набавки за {{ selectedOpstina }}</h3>
          </template>
        </b-table>
        <p
          v-else
          style="font-size: 1.5rem"
        >Немате избрано општина, ве молиме изберете од мениот погоре.</p>
      </b-row>
      <b-row>
        <b-col>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
        <b-col cols="3">
          <a target="_blank" href="/files/excel.xlsx">
            <span
              style="margin: 10px; text-decoration:underline; cursor:pointer; color: #fff"
            >Превземи ја табелата</span>
            <b-icon icon="table" variant="light" scale="2"></b-icon>
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ['opstina'],
  computed: {
    rows() {
      return this.items.length
    },
  },
  data() {
    return {
      locale: 'mk',
      perPage: 5,
      currentPage: 1,
      labels: {
        mk: {
          labelPrevDecade: 'Претходна декада',
          labelPrevYear: 'Минатата година',
          labelPrevMonth: 'Минатиот Месец',
          labelCurrentMonth: 'Сегашниот Месец',
          labelNextMonth: 'Следниот Месец',
          labelNextYear: 'Следна година',
          labelNextDecade: 'Следна декада',
          labelToday: 'Денес',
          labelSelected: 'Избран датум',
          labelNoDateSelected: 'Нематe избрано датум',
          labelCalendar: 'Календар',
          labelNav: 'Навигација',
          labelHelp: 'Помош',
        },
        resultsPerPage: [
          { value: 1, text: '1' },
          { value: 2, text: '2' },
          { value: 3, text: '3' },
          { value: 4, text: '4' },
          { value: 5, text: '5' },
          { value: 10, text: '10' },
        ],
      },
      fields: [
        'Датум_на_договор',
        'Предмет_на_договор',
        { key: 'opstina1', label: 'Договорен орган' },
        'Носител_на_договор',
        'Доделена_вредност_со_ДДВ',
        { key: 'link', label: 'Линкови до договори' },
      ],
      items: [
        {
          Датум_на_договор: '01.10.2020',
          Предмет_на_договор: 'топломер',
          opstina1: 'Општина',
          Носител_на_договор:
            'Друштво за трговија и услуги ЕУРО - ФАРМ увоз-извоз ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '19.460,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '17.06.2020',
          Предмет_на_договор: 'маски',
          opstina1: 'Општина',
          Носител_на_договор:
            'Трговско друштво за трговија на големо и мало, услуги, маркетинг и увоз-извоз МАНЧЕ ДЕНТ Велика ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '4.000,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '01.07.2020',
          Предмет_на_договор: 'осиг. и зелен картон бт-001дх',
          opstina1: 'Општина',
          Носител_на_договор:
            'Национална групација за осигурување АД ОСИГУРИТЕЛНА ПОЛИСА Скопје',
          Доделена_вредност_со_ДДВ: '5.536,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '10.11.2020',
          Предмет_на_договор: 'топломер',
          opstina1: 'Општина',
          Носител_на_договор:
            'Друштво за трговија и услуги ЕУРО - ФАРМ увоз-извоз ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '19.460,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '17.02.2020',
          Предмет_на_договор: 'маски',
          opstina1: 'Општина',
          Носител_на_договор:
            'Трговско друштво за трговија на големо и мало, услуги, маркетинг и увоз-извоз МАНЧЕ ДЕНТ Велика ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '4.000,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '09.06.2020',
          Предмет_на_договор: 'осиг. и зелен картон бт-001дх',
          opstina1: 'Општина',
          Носител_на_договор:
            'Национална групација за осигурување АД ОСИГУРИТЕЛНА ПОЛИСА Скопје',
          Доделена_вредност_со_ДДВ: '5.536,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '20.03.2020',
          Предмет_на_договор: 'топломер',
          opstina1: 'Општина',
          Носител_на_договор:
            'Друштво за трговија и услуги ЕУРО - ФАРМ увоз-извоз ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '19.460,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '19.11.2020',
          Предмет_на_договор: 'маски',
          opstina1: 'Општина',
          Носител_на_договор:
            'Трговско друштво за трговија на големо и мало, услуги, маркетинг и увоз-извоз МАНЧЕ ДЕНТ Велика ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '4.000,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '09.02.2020',
          Предмет_на_договор: 'осиг. и зелен картон бт-001дх',
          opstina1: 'Општина',
          Носител_на_договор:
            'Национална групација за осигурување АД ОСИГУРИТЕЛНА ПОЛИСА Скопје',
          Доделена_вредност_со_ДДВ: '5.536,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '01.03.2020',
          Предмет_на_договор: 'топломер',
          opstina1: 'Општина',
          Носител_на_договор:
            'Друштво за трговија и услуги ЕУРО - ФАРМ увоз-извоз ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '19.460,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '17.08.2020',
          Предмет_на_договор: 'маски',
          opstina1: 'Општина',
          Носител_на_договор:
            'Трговско друштво за трговија на големо и мало, услуги, маркетинг и увоз-извоз МАНЧЕ ДЕНТ Велика ДООЕЛ Битола',
          Доделена_вредност_со_ДДВ: '4.000,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
        {
          Датум_на_договор: '09.07.2020',
          Предмет_на_договор: 'осиг. и зелен картон бт-001дх',
          opstina1: 'Општина',
          Носител_на_договор:
            'Национална групација за осигурување АД ОСИГУРИТЕЛНА ПОЛИСА Скопје',
          Доделена_вредност_со_ДДВ: '5.536,00',
          link:
            'https://e-nabavki.gov.mk/PublicAccess/home.aspx#/dossie-quartal-evidences/70885a6b-b8b4-4667-86d9-cdb25dcc2ecd',
        },
      ],
      unfilteredItems: null,
      selectedOpstina: null,
      optionsOpstini: [
        { value: null, text: 'Изберете една оштина' },
        { value: 'Општина Битола', text: 'Општина Битола' },
        { value: 'Општина Валандово', text: 'Општина Валандово' },
        { value: 'Општина Гостивар', text: 'Општина Гостивар' },
        { value: 'Општина Штип', text: 'Општина Штип' },
        { value: 'Општина Карпош', text: 'Општина Карпош' },
      ],
      resultsPerPage: [
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
        { value: 10, text: '10' },
      ],
      dataOd: null,
      dataDo: null,
      min: new Date('01-01-2020'),
      max: new Date(),
      min1: new Date('01-01-2020'),
      max1: new Date(),
    }
  },
  async mounted() {
    var result = this.optionsOpstini.filter(
      (opstina) => opstina.value === this.opstina
    )
    console.log(result)
    if (result.length === 0)
      this.optionsOpstini.push({ value: this.opstina, text: this.opstina })
    this.selectedOpstina = this.opstina
    this.unfilteredItems = this.items
  },
  methods: {
    async editDate(date) {
      let arrDate = date.split('.')
      let swtVal = arrDate[0]
      arrDate[0] = arrDate[1]
      arrDate[1] = swtVal
      return await arrDate.join('/')
    },
  },
  watch: {
    dataOd(newVal, oldVal) {
      this.dataDo = null
      if (newVal != null) {
        this.items = this.unfilteredItems
        this.min1 = new Date(newVal)
        this.items = this.items.filter(function (item) {
          let arrDate = item.Датум_на_договор.split('.')
          let swtVal = arrDate[0]
          arrDate[0] = arrDate[1]
          arrDate[1] = swtVal
          arrDate = arrDate.join('/')
          //if (new Date(arrDate) >= new Date(newVal)) {
          if (new Date(arrDate) >= new Date(newVal)) {
            return item
          }
        })
        if (this.items.length === 0) {
          alert(
            'Нема податоци за избраната дата ве молиме обидете се повторно со нова!'
          )
          this.items = this.unfilteredItems
          this.min1 = new Date('01-01-2020')
          this.max = new Date()
        }
      }
    },
    dataDo(newVal, oldVal) {
      this.dataOd = null
      if (newVal != null) {
        this.items = this.unfilteredItems
        this.max = new Date(newVal)
        this.items = this.items.filter(function (item) {
          let arrDate = item.Датум_на_договор.split('.')
          let swtVal = arrDate[0]
          arrDate[0] = arrDate[1]
          arrDate[1] = swtVal
          arrDate = arrDate.join('/')
          if (new Date(arrDate) <= new Date(newVal)) {
            return item
          }
        })
        if (this.items.length === 0) {
          alert(
            'Нема податоци за избраната дата ве молиме обидете се повторно со нова!'
          )
          this.items = this.unfilteredItems
          this.max = new Date()
          this.min1 = new Date('01-01-2020')
        }
      }
    },
  },
}
</script>

<style scoped>
.h3 {
  text-align: center;
  color: white;
}
</style>
