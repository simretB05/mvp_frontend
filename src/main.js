import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import store from './store';
import vuetify from './plugins/vuetify';
import VueGoogleOAuth2 from 'vue-google-oauth2'; // Import the package


Vue.config.productionTip = false;

const options = {
  position: "top-right",
  timeout: 3000,
  transition: "fade",
  pauseOnHover: true,
  closeOnClick: false,
  containerClassName: "my-toast-container",
  bodyClassName: "my-toast-body",
  clientId: '523154974044-qmj664b8ik88g9a4mp5hk4ilggf4nfvr.apps.googleusercontent.comw', // Replace with your actual client ID
  scope: 'email', // Define the scopes you need
  prompt: 'consent', // Use 'consent' to force users to see the consent screen every time
};
Vue.use( VueGoogleOAuth2, Toast, options );
new Vue( {
  router,
  store,
  vuetify,
  render: h => h( App )
} ).$mount( '#app' );