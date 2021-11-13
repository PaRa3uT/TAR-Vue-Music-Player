import Vue from 'vue';

import vuetify from './plugins/vuetify'
import App from './app.vue'

const app = new Vue({
    vuetify,

    el: '#app',

    mounted() {
    },

    render: (h) => h(App)
});
