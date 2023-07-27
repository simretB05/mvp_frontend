// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/dormitory';
const urlUpdate = process.env.VUE_APP_BASE_URL + '/api/update-dormitory';


// State object
const state = {
    error: null,
    isLoadingDormitories: false,
    token: Cookies.get( "token" ) || "",
    dormitoriesData: undefined,
    updatedDormdata: undefined
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
    setUpdate( state, updateResponse )
    {
        state.updatedDormdata = updateResponse
    },
    setError( state, error )
    {
        state.error = error;
    },

};
// Getters object
const getters = {
    add_dormData: ( state ) => state.dormitoriesData,
    add_dormIsLoading: ( state ) => state.isLoadingDormitories,
    add_dormInfoError: ( state ) => state.error,
};
// Actions object
const actions = {
    //   Action for Adding Dormitories
    async addDormitory( { commit }, form )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.post( url, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: state.token
                },
            } );
            commit( 'setLoading', false );
            commit( 'setUniInfoData', response[`data`] );

            Vue.$toast.success( "New dormitory has been Added ", {
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
    /// updating dormitories

    async updatingDormitory( { commit }, form, )
    {


        commit( 'setLoading', true );
        try
        {
            const response = await axios.patch( urlUpdate, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: state.token
                },

            } );
            commit( 'setLoading', false );
            commit( 'setUpdate', response[`data`] );

            Vue.$toast.success( "Dormitory Updated ", {
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

