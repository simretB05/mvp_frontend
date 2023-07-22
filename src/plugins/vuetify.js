import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use( Vuetify );

export default new Vuetify( {
    iconfont: 'md',
    theme: {
        primary: '#000000',
        success: '#3cd1c2',
        info: '#ffaa2c',
        main: '#ffaa2c',
        error: '#f83e70'

    }
} );

// src/plugins/vuetify.js

// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'

// import colors from 'vuetify/lib/util/colors'

// Vue.use( Vuetify )

// export default new Vuetify( {
//     theme: {
//         themes: {
//             light: {
//                 primary: colors.red.darken1, // #E53935
//                 secondary: colors.red.lighten4, // #FFCDD2
//                 accent: colors.indigo.base, // #3F51B5
//             },
//         },
//     },
// } )
