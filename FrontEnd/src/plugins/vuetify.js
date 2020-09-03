import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import sv from 'vuetify/es5/locale/sv'


Vue.use(Vuetify);


export default new Vuetify({
  lang: {
    locales: { sv },
    current: 'sv',
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1, // #E53935
        secondary: colors.blue.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
