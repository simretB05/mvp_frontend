// Import required libraries
import axios from "axios";
import Vue from "vue";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/all-dormitories';


// State object
const state = {
    error: null,
    isLoadingDormitories: false,
    dormitoriesData: undefined
};
// Mutations object
const mutations = {
    setLoading( state, isLoadingDormitories )
    {

        state.isLoadingDormitories = isLoadingDormitories;
    },
    setUniInfoData( state, dormitoriesData )
    {

        state.responseData = dormitoriesData;
    },
    setError( state, error )
    {
        state.error = error;
    },

};
// Getters object
const getters = {
    get_dormData: ( state ) => state.dormitoriesData,
    get_dormIsLoading: ( state ) => state.isLoadingDormitories,
    get_dormInfoError: ( state ) => state.error,
};
// Actions object
const actions = {
    async getUniDormitories( { commit }, id )
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

            Vue.$toast.success( "Your  Dormitories Are Ready ", {
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

