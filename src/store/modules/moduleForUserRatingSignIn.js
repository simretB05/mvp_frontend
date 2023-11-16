// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

let url = process.env.VUE_APP_BASE_URL + '/api/user_rating';


// State object
const state = {
    error: null,
    is_loading: false,
    user_rating: [],
    token: Cookies.get( "token" ) || "",

};
// Mutations object
const mutations = {
    setLoading( state, isLoadingRooms )
    {
        state.isLoadingRooms = isLoadingRooms;
    },
    setUser_ratingData( state, user_rating )
    {
        state.user_rating = user_rating;
    },

    setError( state, error )
    {
        state.error = error;
    }
};
// Getters object
const getters = {
    // get_roomsData: ( state ) => state.roomsData,
    // get_roomIsLoading: ( state ) => state.isLoadingDormitories,
    // get_roomsInfoError: ( state ) => state.error,
    // get_roomsDeleteIsLoading: ( state ) => state.isLoadingDormitories,
    // get_roomsDeleteInfoError: ( state ) => state.error,
    // get_filterRoomdData: ( state ) => state.filteredData
};
// Actions object
const actions = {
    //   Action for Adding Dormitories
    async getUserRatingInfo( { commit }, form )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.post( url, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            } );
            commit( 'setLoading', false );
            commit( 'setRoomInfoData', response[`data`] );

            Vue.$toast.success( "Ckeck your E-mail, varification Code has been sent ", {
                timeout: 2000,
            } );
            return response.data; // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
                timeout: 2000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },

};

export default {
    state, getters, actions, mutations
}

