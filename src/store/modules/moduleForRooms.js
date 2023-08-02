// Import required libraries
import axios from "axios";
import Vue from "vue";
import Cookies from "vue-cookies";
import Toast from "vue-toastification";

// Initialize Vue instance and use Vue Toastification plugin
Vue.use( Toast );
let url = process.env.VUE_APP_BASE_URL + '/api/all-rooms';
let urlDelete = process.env.VUE_APP_BASE_URL + '/api/dorm-room';
let urlImg = process.env.VUE_APP_BASE_URL + '/api/room-image';
// State object
const state = {
    error: null,
    isLoadingRooms: false,
    roomsData: undefined,
    filteredData: undefined,
    isLoadingRoomsImages: false,
    roomsImageData: undefined,
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

    setdeleteRoom( state, id )
    {
        if ( state.roomsData !== [] )
        {
            state.roomsData = state.roomsData.filter( data => data.id != id )
        }
    },
    setRoomImageoData( state, roomsImageData )
    {
        state.roomsImageData = roomsImageData;
        let groupedImages = {};
        let contentType = 'image/png';

        // Loop through each room image and group them by room_id
        for ( const roomImage of state.roomsImageData )
        {
            // Object destructuring to extract properties from roomImage
            const { room_id, images } = roomImage
            let imageToChangeToBlob = images
            let binaryData = atob( imageToChangeToBlob );
            let byteNumbers = new Array( binaryData.length );
            for ( let j = 0; j < binaryData.length; j++ )
            {
                byteNumbers[j] = binaryData.charCodeAt( j );
            }
            let byteArray = new Uint8Array( byteNumbers );
            let blob = new Blob( [byteArray], { type: contentType } );
            let blobUrl = URL.createObjectURL( blob );

            // Use a conditional operator to check if the room_id exists in groupedImages
            groupedImages[room_id] ? groupedImages[room_id].push( blobUrl ) : groupedImages[room_id] = [blobUrl];

            state.roomsImageData = groupedImages
            // Cookies.set( "newImageDataFromCookies", groupedImages )
            // state.roomsImageData[0] ? state.roomsImageData = Cookies.get( "newImageDataFromCookies" ) : state.roomsImageData = groupedImages
        }
    },
    setSearchData( state, input )
    {
        state.filteredDorms_copy = state.dormitoriesData;
        if ( input.length || typeof input === 'string' || input.trim() !== '' )
        {
            let filteredRooms = state.roomData.filter( ( data ) =>
                data.name.includes( input )
            );
            state.dormitoriesData = filteredRooms;
        } else if ( input === '' )
        {
            state.roomData = Cookies.get( "roomsData" )
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
    get_roomIsLoading: ( state ) => state.isLoadingRooms,
    get_roomsInfoError: ( state ) => state.error,
    get_roomsDeleteIsLoading: ( state ) => state.isLoadingDormitories,
    get_roomsDeleteInfoError: ( state ) => state.error,
    get_filterRoomdData: ( state ) => state.filteredData,
    get_roomsImageData: ( state ) => state.roomsImageData,
    get_isLodingImages: ( state ) => state.isLoadingRoomsImages,
    get_roomsImageError: ( state ) => state.error,
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
    async deleteRooms( { commit }, id )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.delete( urlDelete, {
                data: {
                    id: id,
                },
            } );
            commit( 'setdeleteRoom', id );
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
    //   Action for getting Dormitories Images
    async getRoomsImage( { commit }, )
    {
        commit( 'setLoading', true );
        try
        {
            const response = await axios.get( urlImg, {
            } );
            commit( 'setLoading', false );
            commit( 'setRoomImageoData', response['data'][`images`] );

            Vue.$toast.success( "Rooms images are ready ", {
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
    searchByInput( { commit }, input, )
    {
        if ( !input || input !== undefined )
            commit( 'setSearchData', input );
    },

};

export default {
    state, getters, actions, mutations
}

