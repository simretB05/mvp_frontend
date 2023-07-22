// // Import required libraries

// import axios from "axios";
// import Vue from "vue";
// import Toast from "vue-toastification";

// // Initialize Vue instance and use Vue Toastification plugin
// Vue.use( Toast );

// const url = process.env.VUE_APP_BASE_URL + '/api/university';


// // State object
// const state = {
//     responseData: undefined,
//     error: null,
//     isLoading: false,
//     // universityInfo: undefined
// };
// // Mutations object
// const mutations = {
//     setLoading( state, isLoading )
//     {
//         console.log( 'setData mutation is being called with data:', isLoading );

//         state.isLoading = isLoading;
//     },
//     setUniInfoData( state, responseData )
//     {
//         console.log( 'setData mutation is being called with data:', responseData );

//         state.responseData = responseData;
//     },
//     setError( state, error )
//     {
//         state.error = error;
//     },

// };
// // Getters object
// const getters = {
//     getUniInfoData: ( state ) => state.responseData,
//     getIsLoading: ( state ) => state.isLoading,
//     getError: ( state ) => state.error,
// };
// // Actions object
// const actions = {
//     async signUpUni( { commit }, form )
//     {
//         commit( 'setLoading', true );
//         try
//         {
//             const response = await axios.post( url, form, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             } );
//             commit( 'setLoading', false );
//             commit( 'setData', response[`data`] );
//             console.log( response.data, "this data" )

//             Vue.$toast.success( "Successfully Logged In", {
//                 timeout: 2000,
//             } );
//             return response.data; // Return the response data to the component

//         } catch ( error )
//         {
//             // Show error toast message
//             commit( 'setLoading', false );
//             commit( 'setError', 'Failed to fetch data. Please try again later.' );
//             // Show success toast message
//             Vue.$toast.error( "Alrady Logged In", {
//                 timeout: 2000,
//             } );
//             // throw error; // Throw the error to be caught by the component
//         }
//     },
// };

// export default {
//     state, getters, actions, mutations
// }

