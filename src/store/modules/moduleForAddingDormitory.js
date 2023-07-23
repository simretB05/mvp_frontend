// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/dormitory';


// State object
const state = {
    error: null,
    isLoadingDormitories: false,
    token: Cookies.get( "token" ) || "",
    dormitoriesData: undefined,
    id: undefined
};
// Mutations object
const mutations = {
    setLoading( state, isLoadingDormitories )
    {
        state.isLoadingDormitories = isLoadingDormitories;
    },
    setUniInfoData( state, dormitoriesData )
    {

        state.dormitoriesData = dormitoriesData;
    },
    setdeleteData( state, id )
    {
        // Find the index of the element with the matching "id" in the state.dormitoriesData array
        let index = state.dormitoriesData.findIndex(
            ( data ) => data.id === id
        );
        // Check if the element with the specified "id" exists in the array (index > -1)

        if ( index > -1 )
        {
            // If the element exists, remove it from the array using splice

            this.confirmedOrder.splice( index, 1 );
        }
        return;

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
        console.log( state.token )
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


    //   Action for  Deleting  Dormitories
    async deleteDormitories( { commit }, id )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.delete( url, {
                params: {
                    id: id,
                },
            } );
            commit( 'setLoading', false );

            commit( 'setdeleteData', id );

            Vue.$toast.success( 'Successfuly deleteda dormitory with the id ', {
                timeout: 2000,
            } );
            return response.data; // Return the response data to the component

        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to delete data. Please try again later.' );
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

