// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );

const url = process.env.VUE_APP_BASE_URL + '/api/dorm-room';
const urlUpdate = process.env.VUE_APP_BASE_URL + '/api/update-dormitory';


// State object
const state = {
    error: null,
    isLoadingRooms: false,
    roomsData: undefined,
    filteredData: undefined,
    token: Cookies.get( "token" ) || "",

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
    async addRoom( { commit }, form )
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
            commit( 'roomsData', response[`data`] );

            Vue.$toast.success( "New Room has been Added ", {
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

