import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#583082",
        secondary: "#939BB4",
        accent: "#FF4081"
      }
    }
  }
});
