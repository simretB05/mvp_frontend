// // Import required libraries
// import axios from "axios";
// import Vue from "vue";
// import Cookies from "vue-cookies";
// import Toast from "vue-toastification";

// // Initialize Vue instance and use Vue Toastification plugin
// Vue.use( Toast );

// const url = process.env.VUE_APP_BASE_URL + '/api/room-image';


// // State object
// const state = {
//     error: null,
//     isLoadingRoomsImages: false,
//     roomsImageData: undefined,
//     token: Cookies.get( "token" ) || "",

// };
// // Mutations object
// const mutations = {
//     setLoading( state, isLoadingRooms )
//     {
//         state.isLoadingRooms = isLoadingRooms;
//     },
//     setRoomImageoData( state, roomsImageData )
//     {
//         state.roomsImageData = roomsImageData;
//     },
//     setError( state, error )
//     {
//         state.error = error;
//     }
// };
// // Getters object
// const getters = {
//     get_roomsImageData: ( state ) => state.roomsImageData,
//     get_isLodingImages: ( state ) => state.isLoadingRoomsImages,
//     get_roomsImageError: ( state ) => state.error,

// };
// // Actions object
// const actions = {
//     //   Action for getting Dormitories Images
//     async getRoomsImage( { commit }, )
//     {
//         commit( 'setLoading', true );
//         try
//         {
//             const response = await axios.get( url, {

//             } );
//             console.log( response['data'] )
//             let plainObject = JSON.parse( JSON.stringify( response['data'] ) );

//             let imageList = plainObject['images'];
//             const contentType = 'image/png';
//             const imageURLs = [];

//             for ( let i = 0; i < imageList.length; i++ )
//             {
//                 const binaryData = atob( imageList[i]['images'] );
//                 const byteNumbers = new Array( binaryData.length );
//                 for ( let j = 0; j < binaryData.length; j++ )
//                 {
//                     byteNumbers[j] = binaryData.charCodeAt( j );
//                 }
//                 const byteArray = new Uint8Array( byteNumbers );
//                 const blob = new Blob( [byteArray], { type: contentType } );
//                 const blobUrl = URL.createObjectURL( blob );
//                 imageURLs.push( blobUrl );
//             }

//             commit( 'setLoading', false );
//             commit( 'setRoomImageoData', imageURLs );

//             Vue.$toast.success( "Rooms images are ready ", {
//                 timeout: 2000,
//             } );
//             return response.data; // Return the response data to the component

//         } catch ( error )
//         {
//             // Show error toast message
//             commit( 'setLoading', false );
//             commit( 'setError', 'Failed to fetch data. Please try again later.' );
//             // Show success toast message
//             Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
//                 timeout: 2000,
//             } );
//             // throw error; // Throw the error to be caught by the component
//         }
//     },
// }

// export default {
//     state, getters, actions, mutations
// }



// // Import required libraries
// import axios from "axios";
// import Vue from "vue";
// import Cookies from "vue-cookies";
// import Toast from "vue-toastification";

// // Initialize Vue instance and use Vue Toastification plugin
// Vue.use( Toast );
// const url = process.env.VUE_APP_BASE_URL + '/api/all-rooms';
// const urlDelete = process.env.VUE_APP_BASE_URL + '/api/dormitory';
// const urlImg = process.env.VUE_APP_BASE_URL + '/api/room-image';
// // State object
// const state = {
//     error: null,
//     isLoadingRooms: false,
//     roomsData: undefined,
//     filteredData: undefined,
//     isLoadingRoomsImages: false,
//     roomsImageData: undefined,
// };
// // Mutations object
// const mutations = {
//     setLoading( state, isLoadingRooms )
//     {
//         state.isLoadingRooms = isLoadingRooms;
//     },
//     setRoomInfoData( state, roomsData )
//     {
//         state.roomsData = roomsData;


//     },

//     setdeleteData( state, id )
//     {
//         if ( state.roomsData !== [] )
//         {
//             state.roomsData = state.roomsData.filter( data => data.id != id )

//         }
//     },
//     setRoomImageoData( state, roomsImageData )
//     {
//         state.roomsImageData = roomsImageData;
//         console.log( state.roomsData )
//         console.log( state.roomsImageData )
//         let mergedArray = [];
//         const contentType = 'image/png';

//         for ( const roomWithImage of state.roomsImageData )
//         {
//             let matchingRoomImage = state.roomsData.find( ( data ) => data.id === roomWithImage.room_id );
//             let image = roomWithImage.images
//             if ( matchingRoomImage )
//                 console.log( matchingRoomImage )
//             const binaryData = atob( image );
//             const byteNumbers = new Array( binaryData.length );
//             for ( let j = 0; j < binaryData.length; j++ )
//             {
//                 byteNumbers[j] = binaryData.charCodeAt( j );
//             }
//             const byteArray = new Uint8Array( byteNumbers );
//             const blob = new Blob( [byteArray], { type: contentType } );
//             const blobUrl = URL.createObjectURL( blob );

//             {
//                 let mergedImageRoom = {
//                     id: matchingRoomImage.id,
//                     aroom_number: matchingRoomImage.room_number,
//                     floor_name: matchingRoomImage.floor_name,
//                     room_type: matchingRoomImage.room_type,
//                     capacity: matchingRoomImage.capacity,
//                     avilablity_status: matchingRoomImage.avilablity_status,
//                     monthly_rent: matchingRoomImage.monthly_rent,
//                     facilities: matchingRoomImage.facilities,
//                     image: blobUrl
//                 };
//                 mergedArray.push( mergedImageRoom );
//                 console.log( mergedArray )
//                 state.roomData = mergedArray
//             }
//         }

//         // return mergedArray;

//     },
//     setSearchData( state, input )
//     {
//         state.filteredDorms_copy = state.dormitoriesData;
//         if ( input !== "" )
//         {
//             let filteredDorms = state.roomData.filter( ( data ) =>
//                 data.name.includes( input )
//             );
//             state.dormitoriesData = filteredDorms;
//         } else if ( input === '' )
//         {
//             state.dormitoriesData = Cookies.get( "roomsData" )
//         }

//     },
//     setError( state, error )
//     {
//         state.error = error;
//     }
// };
// // Getters object
// const getters = {
//     get_roomsData: ( state ) => state.roomsData,
//     get_roomIsLoading: ( state ) => state.isLoadingDormitories,
//     get_roomsInfoError: ( state ) => state.error,
//     get_roomsDeleteIsLoading: ( state ) => state.isLoadingDormitories,
//     get_roomsDeleteInfoError: ( state ) => state.error,
//     get_filterRoomdData: ( state ) => state.filteredData,
//     get_roomsImageData: ( state ) => state.roomsImageData,
//     get_isLodingImages: ( state ) => state.isLoadingRoomsImages,
//     get_roomsImageError: ( state ) => state.error,
// };
// // Actions object
// const actions = {
//     async getDormRooms( { commit }, dorm_id )
//     {
//         commit( 'setLoading', true );
//         try
//         {
//             const response = await axios.get( url, {
//                 params: {
//                     dormitory_id: dorm_id,
//                 },
//             } );
//             commit( 'setLoading', false );
//             commit( 'setRoomInfoData', response[`data`] );
//             Vue.$toast.success( "Your  Rooms Are Ready ", {
//                 timeout: 2000,
//             } );
//             return response.data; // Return the response data to the component
//         } catch ( error )
//         {
//             // Show error toast message
//             commit( 'setLoading', false );
//             commit( 'setError', 'Failed to fetch data. Please try again later.' );
//             // Show success toast message
//             Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
//                 timeout: 2000,
//             } );
//             // throw error; // Throw the error to be caught by the component
//         }
//     },
//     //   Action for  Deleting  Dormitories
//     async deleteDormitories( { commit }, id )
//     {
//         commit( 'setLoading', true );
//         try
//         {
//             const response = await axios.delete( urlDelete, {
//                 data: {
//                     id: id,
//                 },
//             } );
//             commit( 'setdeleteData', id );
//             Vue.$toast.success( `Successfuly deleted dormitory with the id ${ id }`, {
//                 timeout: 2000,
//             } );

//             return response.data; // Return the response data to the component

//         } catch ( error )
//         {
//             // Show error toast message
//             commit( 'setLoading', false );
//             commit( 'setError', 'Failed to delete data. Please try again later.' );
//             // Show success toast message
//             Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
//                 timeout: 2000,
//             } );
//             // throw error; // Throw the error to be caught by the component
//         }
//     },
//     //   Action for getting Dormitories Images
//     async getRoomsImage( { commit }, )
//     {
//         commit( 'setLoading', true );
//         try
//         {
//             const response = await axios.get( urlImg, {

//             } );
//             console.log( response['data'] )

//             // let plainObject = JSON.parse( JSON.stringify( response['data'] ) );

//             // let imageList = plainObject['images'];
//             // const contentType = 'image/png';
//             // const imageURLs = [];

//             // for ( let i = 0; i < imageList.length; i++ )
//             // {
//             //     const binaryData = atob( imageList[i]['images'] );
//             //     const byteNumbers = new Array( binaryData.length );
//             //     for ( let j = 0; j < binaryData.length; j++ )
//             //     {
//             //         byteNumbers[j] = binaryData.charCodeAt( j );
//             //     }
//             //     const byteArray = new Uint8Array( byteNumbers );
//             //     const blob = new Blob( [byteArray], { type: contentType } );
//             //     const blobUrl = URL.createObjectURL( blob );
//             //     imageURLs.push( blobUrl );
//             // }

//             commit( 'setLoading', false );
//             commit( 'setRoomImageoData', response['data'][`images`] );

//             Vue.$toast.success( "Rooms images are ready ", {
//                 timeout: 2000,
//             } );
//             return response.data; // Return the response data to the component

//         } catch ( error )
//         {
//             // Show error toast message
//             commit( 'setLoading', false );
//             commit( 'setError', 'Failed to fetch data. Please try again later.' );
//             // Show success toast message
//             Vue.$toast.error( "Something Went Wrong, Please Try Again Later!", {
//                 timeout: 2000,
//             } );
//             // throw error; // Throw the error to be caught by the component
//         }
//     },
//     searchByInput( { commit }, input, )
//     {
//         commit( 'setSearchData', input );
//     },

// };



