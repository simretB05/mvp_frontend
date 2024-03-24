// Import required libraries

import axios from "axios";
import Vue from "vue";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/get_university_info';


// State object
const state = {
    error: null,
    isLoadingUniInfo: false,
    universityInfo: undefined
};
// Mutations object
const mutations = {
    setLoading( state, isLoadingUniInfo )
    {

        state.isLoadingUniInfo = isLoadingUniInfo;
    },
    setUniInfoData( state, universityInfo )
    {

        state.universityInfo = universityInfo;
    },
    setError( state, error )
    {
        state.error = error;
    },

};
// Getters object
const getters = {
    getUniProfileInfoData: ( state ) => state.universityInfo,
    getUniInfoIsLoading: ( state ) => state.isLoadingUniInfo,
    getInfoError: ( state ) => state.error,
};
// Actions object
const actions = {
    async getUniProfileInfo( { commit }, id )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( url, {
                params: {
                    university_id: id,

                },
            } );
            commit( 'setLoading', false );
            commit( 'setUniInfoData', response[`data`] );


            return response.data; // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            Vue.$toast.error( "Please Try Again later", {
                timeout: 2000,
            } );
            // throw error; // Throw the error to be caught by the component
        }
    },
};

export default {
    state, getters, actions, mutations
}

