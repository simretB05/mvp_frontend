// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin 
Vue.use( Toast );

let url = process.env.VUE_APP_BASE_URL + '/api/user_rating';
let rating_url = process.env.VUE_APP_BASE_URL + '/api/send_rating_value';
let getRatings_url = process.env.VUE_APP_BASE_URL + '/api/get_all_rating';


// State object
const state = {
    error: null,
    is_loading: false,
    user_verifCode: [],
    all_rating: [],
    token: Cookies.get( "token" ) || "",

};
// Mutations object
const mutations = {
    setLoading( state, isLoadingRooms )
    {
        state.is_loading = isLoadingRooms;
    },
    setUser_userVerifCode( state, user_verifCode )
    {
        state.user_verifCode = user_verifCode
    },
    set_all_reviews( state, all_ratings )
    {
        state.all_rating = all_ratings
    },

    setError( state, error )
    {
        state.error = error;
    }
};
// Getters object
const getters = {
    get_userVerifCode: ( state ) => state.user_verifCode,
    get_all_reviews: ( state ) => state.all_rating,
};
// Actions object
const actions = {
    //   Action for sending a verification code
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
            Vue.$toast.success( "Ckeck your E-mail, varification Code has been sent", {
                timeout: 4000,
            } );
            commit( 'setLoading', false );

            commit( 'setUser_userVerifCode', response[`data`] );


            return response.data; // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
                timeout: 4000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },
    async sendUserRatingInfo( { commit }, form )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.post( rating_url, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            } );
            Vue.$toast.success( "Ckeck your E-mail, varification Code has been sent", {
                timeout: 4000,
            } );
            let responseData = response[`data`]
            responseData = JSON.parse( JSON.stringify( responseData ) )

            commit( 'setLoading', false );
            commit( 'setUser_userVerifCode', JSON.parse( JSON.stringify( responseData ) ) );

            return response.data;

            // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
                timeout: 4000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },
    async getAllRatings( { commit } )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( getRatings_url, {

            } );
            commit( 'setLoading', false );
            commit( 'set_all_reviews', response.data );
            return response.data; // Return the response data to the componentz
        } catch ( error )
        {
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );

        }
    },
};

export default {
    state, getters, actions, mutations
}

