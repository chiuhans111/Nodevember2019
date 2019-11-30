import "../style/main.scss"
import App from "../app.vue"
import Vue from 'vue/dist/vue.esm.js'




var app = new Vue({
    el: "#app",
    components: { App },

    template: '<App/>',
})