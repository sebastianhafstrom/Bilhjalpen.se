import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import sv from 'vuetify/es5/locale/sv'

export default new Vuetify({
    lang: {
        locales: { sv },
        current: 'sv',
      },
});
