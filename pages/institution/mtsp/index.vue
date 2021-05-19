<template>
    <div class="wrap">
        <b-jumbotron class="p-3 rounded-0" style="background-image: url('https://img.freepik.com/free-photo/business-money-finance-secure-saving-concept-close-up-man-hand-holding-put-coin-stack-coins-wooden-table_105035-869.jpg?size=626&ext=jpg'); background-size: cover; background-position: center">
            <b-container class="d-flex align-items-center flex-column">
                <img src="/files/mn_logo.png" style="width: 300px" alt="" class="mb-3">
                <div style="max-width: 70%" class="h-100 d-flex justify-content-center flex-column text-center">
                    <h2 class="mb-4">Податочни сетови за Министерство за труд и социјална политика</h2>
                    <b-button variant="info" style="max-width: 250px" href="https://www.mtsp.gov.mk/" target="_blank"><b-icon icon="info-circle"></b-icon> Прегледај вебстрана</b-button>
                    <b-button variant="dark" style="max-width: 230px" class="mt-2" href="#statistic">Прегледај статистика</b-button>
                </div>
            </b-container>
        </b-jumbotron>
        <b-container>
            <b-row>
                <b-col cols="4" >
                    <nuxt-link to="/institution/mtsp/javni">
                        <div class="p-3 bg-light border rounded" style="min-height: 225px; background-image: url('https://img1.goodfon.com/wallpaper/nbig/4/fb/buy-sell-exchange-finance.jpg'); background-size: cover;">
                            <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                                <span class="bg-light px-1 py-0">
                                    <b-icon icon="cash"></b-icon> Јавни набавки на Министерството за труд и социјална политика
                                </span>
                            </h5>
                        </div>
                    </nuxt-link>
                </b-col>
                <b-col cols="4" >
                    <nuxt-link to="/institution/mtsp/javni">
                        <div class="p-3 bg-light border rounded" style="min-height: 225px; background-image: url('https://www.slobodenpecat.mk/wp-content/uploads/2020/07/family-violence-lw.jpg'); background-size: cover;">
                            <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                                <span class="bg-light px-1 py-0">
                                    <b-icon icon="people-fill"></b-icon> Загрижувачки семејства во Република Македонија
                                </span>
                            </h5>
                        </div>
                    </nuxt-link>
                </b-col>
                <b-col cols="4" >
                    <nuxt-link to="/institution/mtsp/javni">
                        <div class="p-3 bg-light border rounded" style="min-height: 225px; background-image: url('https://ourlancashire.org.uk/app/uploads/2020/08/shutterstock_634491785.jpg'); background-size: cover;">
                            <h5 class="text-dark font-weight-bold" style="line-height: 1.75">
                                <span class="bg-light px-1 py-0">
                                    <b-icon icon="shop"></b-icon> Листа на организации финансиски поддржани од МТСП
                                </span>
                            </h5>
                        </div>
                    </nuxt-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>