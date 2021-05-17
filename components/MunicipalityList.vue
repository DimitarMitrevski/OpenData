<template>
    <div class="mun-list">
        <b-list-group>
            <b-list-group-item 
            class="d-flex justify-content-between align-items-center"
            v-for="(i, k) in data" :key="k" @click="emitSelected(i.name)" 
            
            button>
                {{i.name}} 
                <b-badge variant="info" :class="i.color" pill
                v-b-tooltip.hover title="Индекс на општината."
                >{{i.indeks}}</b-badge>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        emitSelected(i){
            var info = this.data.find(o => o.name === i.toString());
            this.$emit('chosen-mun', info);
        }
    }
}
</script>

<style>
.mun-list {
    max-height: calc(100vh - 58px);
    overflow-y: auto;
}
.mun-list::-webkit-scrollbar {
      width: 5px;
      background-color: #cdcdb7
}
.mun-list::-webkit-scrollbar-thumb{
    background-color: #abab9a
}
.mun-list .list-group { 
    border-radius: 0; 
}
.mun-list .list-group-item {
    color: #7c7c6e;
    background: #ececd4;
    border: none;
    position: relative;
    transition: all .3s ease-in-out;
    outline: none !important;
}
.mun-list .list-group-item:nth-child(odd){
    background: #e3e3cb;
}
.mun-list .list-group-item:hover{
    background: #f7f7e7;
}
.mun-list .list-group-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    height: 100%;
    border-bottom: 1px solid #c8c8b3;
}
</style>