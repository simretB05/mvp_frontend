// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );
let url = process.env.VUE_APP_BASE_URL + '/api/all-dormitories';
let urlImg = process.env.VUE_APP_BASE_URL + '/api/dorm-image';

// State object
const state = {
    error: null,
    isLoadingDormitories: false,
    dormitoriesData: [],
    dormImageData: undefined,
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
        if ( state.dormitoriesData.length === 0 )
        {
            state.dormitoriesData = state.dormitoriesData.filter( data => data.id != id )

        }
    },
    setDormImageoData( state, dormImageData )
    {
        state.dormImageData = dormImageData
        let groupedImages = {};
        let contentType = 'image/png';
        // Loop through each room image and group them by room_id
        for ( const roomImage of state.dormImageData )
        {
            // Object destructuring to extract properties from roomImage
            // Destructure the 'roomImage' object to extract the 'room_id' and 'images' properties.
            const { dormitory_id, images, id } = roomImage
            // Make a copy of the 'images' data.

            let imageToChangeToBlob = images
            // Convert the base64-encoded 'imageToChangeToBlob' data to binary data using 'atob' function.
            let binaryData = atob( imageToChangeToBlob );
            // Create an array 'byteNumbers' to hold the character codes of the binary data.
            let byteNumbers = new Array( binaryData.length );
            // Convert the binary data to an array of integers by retrieving their character codes.
            for ( let j = 0; j < binaryData.length; j++ )
            {
                byteNumbers[j] = binaryData.charCodeAt( j );
            }
            // Create a 'byteArray' using the 'byteNumbers' array, representing the binary data as Uint8Array.
            let byteArray = new Uint8Array( byteNumbers );
            // Create a 'Blob' object from the 'byteArray', specifying the 'contentType' of the blob.
            let blob = new Blob( [byteArray], { type: contentType } );
            // Create a URL representing the 'blob' data. This URL can be used as the 'src' for an image tag.
            let blobUrl = URL.createObjectURL( blob );
            // Use a conditional operator to check if the room_id exists in groupedImages
            groupedImages[dormitory_id] ? groupedImages[dormitory_id].push( { id, blobUrl } ) : groupedImages[dormitory_id] = [{ id, blobUrl }];
            // Cookies.set( "newImageDataFromCookies", groupedImages )
            // state.roomsImageData[0] ? state.roomsImageData = Cookies.get( "newImageDataFromCookies" ) : state.roomsImageData = groupedImages
        }
        state.dormImageData = JSON.parse( JSON.stringify( groupedImages ) )
    },
    setSearchData( state, input )
    {
        let filterData = JSON.parse( JSON.stringify( state.dormitoriesData ) )
        if ( ( input === 'string' || input.trim() !== '' ) && filterData )
        {
            let filteredDorms = filterData.filter( ( data ) =>
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
    get_dormDataFromHome: ( state ) => state.dormitoriesData,
    get_dormIsLoadingFromHome: ( state ) => state.isLoadingDormitories,
    get_dormInfoErrorFromHom: ( state ) => state.error,
    get_dormDeleteIsLoadingFromHome: ( state ) => state.isLoadingDormitories,
    get_filterdDataFromHome: ( state ) => state.filteredData,
    get_dormImageDataFromHome: ( state ) => state.dormImageData
};
// Actions object
const actions = {
    async uniIdFromHome( { commit }, id )
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
            commit( 'setLoading', false );
            commit( 'setError', 'Failed to fetch data. Please try again later.' );

        }
    },

    //   Action for getting Dormitories Images
    async getDormImage( { commit }, )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( urlImg, {
            } );
            commit( 'setLoading', false );
            commit( 'setDormImageoData', response['data'][`images`] );
            return response.data;
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
    searchByInput( { commit }, input, )
    {
        if ( !input || input !== undefined )
            commit( 'setSearchData', input );
    },


};

export default {
    state, getters, actions, mutations
}

