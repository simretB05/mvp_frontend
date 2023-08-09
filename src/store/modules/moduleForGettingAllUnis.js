// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );
let url = process.env.VUE_APP_BASE_URL + '/api/get-all-university';
let urlImg = process.env.VUE_APP_BASE_URL + '/api/all-university-image';
// State object
const state = {
    error: null,
    isLoadingUniversities: false,
    universitiesData: [],
    isLoadingUnisImages: false,
    unisImageData: {},
};
// Mutations object
const mutations = {
    setLoading( state, isLoadingUnis )
    {
        state.isLoadingUniversities = isLoadingUnis
    },
    setAllUniData( state, unisData )
    {
        state.universitiesData = unisData;
    },

    setdeleteRoom( state, id )
    {
        if ( state.roomsData !== [] )
        {
            state.roomsData = state.roomsData.filter( data => data.id != id )
        }
    },
    setUniImageoData( state, unisImageData )
    {
        state.unisImageData = unisImageData;
        let groupedImages = {};
        let contentType = 'image/png';

        // Loop through each room image and group them by room_id
        for ( const unisImage of state.unisImageData )
        {
            // Object destructuring to extract properties from roomImage
            const { filename } = unisImage
            let uni_id = 1
            let imageToChangeToBlob = filename
            let binaryData = atob( imageToChangeToBlob );
            let byteNumbers = new Array( binaryData.length );
            for ( let j = 0; j < binaryData.length; j++ )
            {
                byteNumbers[j] = binaryData.charCodeAt( j );
            }
            let byteArray = new Uint8Array( byteNumbers );
            let blob = new Blob( [byteArray], { type: contentType } );
            let blobUrl = URL.createObjectURL( blob );
            // Use a conditional operator to check if the uni_id exists in groupedImages if  not create one
            groupedImages[uni_id] ? groupedImages[uni_id].push( blobUrl ) : groupedImages[uni_id] = [blobUrl];

        }
        state.unisImageData = groupedImages


    },
    setRoomSearchData( state, input )
    {
        let filterData = JSON.parse( JSON.stringify( state.roomsData ) )
        // if ( input.length || typeof )
        if ( ( input === 'string' || input !== '' ) && filterData )
        {
            let filteredDorms = filterData.filter( ( data ) =>
                data.room_number.includes( input )
            );
            state.roomsData = filteredDorms;
        } else if ( input === '' )
        {
            state.roomsData = Cookies.get( "rooms_data" )
        }
    },

    setError( state, error )
    {
        state.error = error;
    }
};
// Getters object
const getters = {
    get_allUnisData: ( state ) => state.universitiesData,
    get_uniImageData: ( state ) => state.unisImageData,
};
// Actions object
const actions = {
    async getAllUniversities( { commit }, )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( url, {

            } );
            let responseData = response[`data`]
            commit( 'setLoading', false );
            commit( 'setAllUniData', responseData );
            responseData = JSON.parse( JSON.stringify( responseData ) )
            Cookies.set( `unis_data`, responseData )
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
    //   Action for getting Dormitories Images
    async getUnisImage( { commit }, )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( urlImg, {
            } );

            let responseData = JSON.parse( JSON.stringify( response[`data`][`images`] ) )
            commit( 'setLoading', false );
            commit( 'setUniImageoData', responseData );
            return response.data; // Return the response data to the component
        } catch ( error )
        {
            // Show error toast message
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );
            // Show success toast message
            // throw error; // Throw the error to be caught by the component
        }
    },
    searchRoomByInput( { commit }, input, )
    {
        if ( !input || input !== undefined )
            commit( 'setRoomSearchData', input );
    },

};

export default {
    state, getters, actions, mutations
}

