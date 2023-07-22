import Vue from 'vue';
import Vuex from 'vuex';
import moduleForLogIn from './modules/moduleForLogIn';
import moduleForSignUp from './modules/moduleForSignUp';
import moduleForUniProfile from './modules/moduleForUniProfile';
import moduleForDormitories from './modules/moduleForDormitories';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    moduleForLogIn,
    moduleForSignUp,
    moduleForUniProfile,
    moduleForDormitories
  }
} );