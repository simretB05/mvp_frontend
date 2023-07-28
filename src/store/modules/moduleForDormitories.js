// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );
const url = process.env.VUE_APP_BASE_URL + '/api/all-dormitories';
const urlDelete = process.env.VUE_APP_BASE_URL + '/api/dormitory';
// State object
const state = {
    error: null,
    isLoadingDormitories: false,
    dormitoriesData: undefined,
    isLoadingForDorm: false,
    filteredData: undefined,
    filteredDorms_copy: []
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
        if ( state.dormitoriesData !== [] )
        {
            state.dormitoriesData = state.dormitoriesData.filter( data => data.id != id )

        }
    },
    setSearchData( state, input )
    {
        state.filteredDorms_copy = state.dormitoriesData;
        if ( input !== "" )
        {
            let filteredDorms = state.dormitoriesData.filter( ( data ) =>
                data.name.includes( input )
            );
            state.dormitoriesData = filteredDorms;
        } else if ( input === '' )
        {
            state.dormitoriesData = Cookies.get( "responsedormitoryData" )
        }

    },

    setError( state, error )
    {
        state.error = error;
    }
};
// Getters object
const getters = {
    get_dormData: ( state ) => state.dormitoriesData,
    get_dormIsLoading: ( state ) => state.isLoadingDormitories,
    get_dormInfoError: ( state ) => state.error,
    get_dormDeleteIsLoading: ( state ) => state.isLoadingDormitories,
    get_dormDeleteInfoError: ( state ) => state.error,
    get_filterdData: ( state ) => state.filteredData
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
    //   Action for  Deleting  Dormitories
    async deleteDormitories( { commit }, id )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.delete( urlDelete, {
                data: {
                    id: id,
                },
            } );
            commit( 'setdeleteData', id );
            Vue.$toast.success( `Successfuly deleted dormitory with the id ${ id }`, {
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
    searchByInput( { commit }, input, )
    {
        commit( 'setSearchData', input );
    },

};

export default {
    state, getters, actions, mutations
}

