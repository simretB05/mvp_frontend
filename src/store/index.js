import Vue from 'vue';
import Vuex from 'vuex';
import moduleForLogIn from '@/store/modules/moduleForLogIn';
import moduleForSignUp from '@/store/modules/moduleForSignUp';
import moduleForUniProfile from '@/store/modules/moduleForUniProfile';
import moduleForDormitories from '@/store/modules/moduleForDormitories';
import moduleForAddingDormitory from '@/store/modules/moduleForAddingDormitory';


Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    moduleForLogIn,
    moduleForSignUp,
    moduleForUniProfile,
    moduleForDormitories,
    moduleForAddingDormitory,
  }
} );