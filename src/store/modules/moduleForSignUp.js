// Import required libraries

import axios from "axios";
import Vue from "vue";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/university';


// State object
const state = {
    error: null,
    signUpIsLoading: false,
    universityInfo: undefined
};
// Mutations object
const mutations = {
    setLoading( state, signUpIsLoading )
    {

        state.signUpIsLoading = signUpIsLoading;
    },
    setUniInfoData( state, responseData )
    {

        state.universityInfo = responseData;
    },
    setError( state, error )
    {
        state.error = error;
    },

};
// Getters object
const getters = {
    getUniInfoData: ( state ) => state.universityInfo,
    getsignUpIsLoading: ( state ) => state.signUpIsLoading,
    getSignUpError: ( state ) => state.error,
};
// Actions object
const actions = {
    async signUpUni( { commit }, form )
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
            commit( 'setUniInfoData', response[`data`] );

            Vue.$toast.success( "Successfully Logged In", {
                timeout: 2000,
            } );
            return response.data; // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            Vue.$toast.error( "Alrady Logged In", {
                timeout: 2000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },
};

export default {
    state, getters, actions, mutations
}

