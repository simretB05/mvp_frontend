// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );
const url = process.env.VUE_APP_BASE_URL + '/api/all-rooms';
const urlDelete = process.env.VUE_APP_BASE_URL + '/api/dormitory';
// State object
const state = {
    error: null,
    isLoadingRooms: false,
    roomsData: undefined,
    filteredData: undefined,
};
// Mutations object
const mutations = {
    setLoading( state, isLoadingRooms )
    {
        state.isLoadingRooms = isLoadingRooms;
    },
    setRoomInfoData( state, roomsData )
    {
        state.roomsData = roomsData;
    },
    setdeleteData( state, id )
    {
        if ( state.roomsData !== [] )
        {
            state.roomsData = state.roomsData.filter( data => data.id != id )

        }
    },
    setSearchData( state, input )
    {
        state.filteredDorms_copy = state.dormitoriesData;
        if ( input !== "" )
        {
            let filteredDorms = state.roomData.filter( ( data ) =>
                data.name.includes( input )
            );
            state.dormitoriesData = filteredDorms;
        } else if ( input === '' )
        {
            state.dormitoriesData = Cookies.get( "roomsData" )
        }

    },

    setError( state, error )
    {
        state.error = error;
    }
};
// Getters object
const getters = {
    get_roomsData: ( state ) => state.roomsData,
    get_roomIsLoading: ( state ) => state.isLoadingDormitories,
    get_roomsInfoError: ( state ) => state.error,
    get_roomsDeleteIsLoading: ( state ) => state.isLoadingDormitories,
    get_roomsDeleteInfoError: ( state ) => state.error,
    get_filterRoomdData: ( state ) => state.filteredData
};
// Actions object
const actions = {
    async getDormRooms( { commit }, dorm_id )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( url, {
                params: {
                    dormitory_id: dorm_id,
                },
            } );
            commit( 'setLoading', false );
            commit( 'setRoomInfoData', response[`data`] );
            Vue.$toast.success( "Your  Rooms Are Ready ", {
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

