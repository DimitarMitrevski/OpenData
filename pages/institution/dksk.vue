<template>
    <div class="wrap">
        <b-jumbotron class="p-3">
            <b-container class="d-flex justify-content-between" style="height: 300px">
                <div style="max-width: 70%" class="h-100 d-flex justify-content-center flex-column">
                    <h2>Јавни набавки на Државна комисија за спречување на корупцијата</h2>
                    <b-button variant="info" style="max-width: 200px" to="/files/2021.pdf" target="_blank">Спушти документ</b-button>
                    <b-button variant="dark" style="max-width: 230px" class="mt-2" href="#statistic">Прегледај статистика</b-button>
                </div>
                <img src="/files/dksk_cover.png" style="width: 200px" alt="">
            </b-container>
        </b-jumbotron>
        <b-container id="statistic">
            <h3 class="mt-4">Број на набавки по месец</h3>
            <column-chart :data="poMesec" :download="true"></column-chart>
            <h3 class="mt-4">Видови на договор</h3>
            <column-chart :data="poVid" :download="true"></column-chart>
        </b-container>
    </div>
</template>

<script>
import { Sheet1 } from 'static/GodisenPlanDKSK.json'
export default {
    data(){
        return{
            poMesec: [],
            poVid: []
        }
    },
    created(){
        this.getData('pochetokMesec', 'poMesec');
        this.getData('vidNaDogovor', 'poVid');
    },
    methods: {
        getData(val, plc){
            let myArr = {};
            for(var i = 0; i < Sheet1.length; i++){
                if(Sheet1[i][`${val}`]){
                    if(myArr[Sheet1[i][`${val}`]]) myArr[Sheet1[i][`${val}`]]++;
                    else myArr[Sheet1[i][`${val}`]] = 1;
                }
            }
            let arrSec = Object.entries(myArr);
            arrSec.sort((a, b) => b[1] - a[1]);
            this[`${plc}`] = arrSec;
        }
    }
}
</script>

<style>

</style>