import Vue from 'vue';
import Vuex from 'vuex';
import moduleForLogIn from '@/store/modules/moduleForLogIn';
import moduleForSignUp from '@/store/modules/moduleForSignUp';
import moduleForUniProfile from '@/store/modules/moduleForUniProfile';
import moduleForDormitories from '@/store/modules/moduleForDormitories';
import moduleForAddingDormitory from '@/store/modules/moduleForAddingDormitory';
import moduleForRooms from '@/store/modules/moduleForRooms';
import moduleForAddingRooms from '@/store/modules/moduleForAddingRooms';
import moduleForGettingAllRooms from '@/store/modules/moduleForGettingAllRooms';
import moduleForLogOut from '@/store/modules/moduleForLogOut';
import moduleForGettingAllUnis from '@/store/modules/moduleForGettingAllUnis';
import moduleForGettingUniFromHome from '@/store/modules/moduleForGettingUniFromHome';
import moduleForUserRatingSignIn from '@/store/modules/moduleForUserRatingSignIn';





Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    moduleForLogIn,
    moduleForSignUp,
    moduleForUniProfile,
    moduleForDormitories,
    moduleForAddingDormitory,
    moduleForRooms,
    moduleForAddingRooms,
    moduleForGettingAllRooms,
    moduleForLogOut,
    moduleForGettingAllUnis,
    moduleForGettingUniFromHome,
    moduleForUserRatingSignIn

  }
} );