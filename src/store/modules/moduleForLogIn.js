// Import required libraries

import axios from "axios";
import Vue from "vue";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/university-login';


// State object
const state = {
    responseData: undefined,
    error: null,
    isLoading: false,
};
// Mutations object
const mutations = {
    setLoading( state, isLoading )
    {

        state.isLoading = isLoading;
    },
    setData( state, responseData )
    {

        state.responseData = responseData;
    },
    setError( state, error )
    {
        state.error = error;
    },

};
// Getters object
const getters = {
    getUniData: ( state ) => state.responseData,
    getIsLoading: ( state ) => state.isLoading,
    getError: ( state ) => state.error,
};
// Actions object
const actions = {
    async logInUni( { commit }, form )
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
            commit( 'setData', response[`data`] );

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
            Vue.$toast.error( "Please Try Again", {
                timeout: 2000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },
};

export default {
    state, getters, actions, mutations
}

