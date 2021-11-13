import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

const path = require('path');

export default {
    plugins: [
        createVuePlugin(/* options */),

        Components({
            resolvers: [
                VuetifyResolver()
            ]
        }),

    ],

    resolve: {
        alias: [{
            find: '@', replacement: path.resolve(__dirname, 'src')
        }]
    }
}