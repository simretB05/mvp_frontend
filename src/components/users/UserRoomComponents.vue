<template>
  <v-container fluid class="custom-width">
    <v-col
      class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
      cols="12"
      v-if="get_roomIsLoading && get_roomsData.length > 0"
    >
      Getting Your Rooms
      <v-col cols="12">
        <v-progress-linear color="#f4511e" indeterminate rounded height="12">
        </v-progress-linear>
      </v-col>
    </v-col>
    <v-layout row class="lg_nav" cols="12">
      <v-flex xs-12>
        <v-row class="justify-center">
          <v-col
            cols="12"
            v-if="!get_roomIsloading && get_roomsData.length === 0"
          >
            No Rooms In This Dormitory
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-row>
      <v-row>
        <v-col cols="12" sm="12" align-start> </v-col>
        <v-card class="soft-box-shadow">
          <v-card-text>
            <v-row>
              <!-- Search and Toggles Column -->
              <v-col cols="12" md="6">
                <!-- Search Dormitories Input -->
                <!-- v-model="searchKeyword" -->
                <!-- v-model="filterOneBed" -->
                <!-- v-model="filterTwoBeds" -->
                <!-- :error-messages="errorMessages" -->
                <!-- v-model="avilablity_status" -->

                <v-text-field
                  class="text-custom-class"
                  label="Search Dormitories"
                  clearable
                  append-icon="mdi-magnify"
                ></v-text-field>
                <!-- Unfurnished Switch -->
                <v-switch
                  class="text-custom-class"
                  label="Unfurnished"
                  color="primary"
                ></v-switch>
                <!-- Furnished Switch -->
                <v-switch
                  class="text-custom-class"
                  label="Furnished"
                  color="primary"
                ></v-switch>
              </v-col>

              <!-- Price and Availability Column -->
              <v-col cols="12" md="6">
                <!-- Price Range Description -->
                <p class="price-range-description">Price Range</p>
                <!-- Max Price Input -->
                <v-slider
                  class="text-custom-class"
                  :min="0"
                  :max="10500"
                  step="10"
                  thumb-label
                ></v-slider>
                <!-- Room Availability Input -->
                <!-- :items="stats" -->
                <!-- :rules="[
                    () => !!avilablity_status || 'This field is required',
                  ]" -->

                <v-autocomplete
                  class="text-custom-class"
                  ref="avilablity_status"
                  label="Room Availability"
                  placeholder="Select..."
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
      <v-dialog v-model="dialog3" max-width="500px">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog3 = !dialog3">
              <v-icon color="#f4511e">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <add-rooms></add-rooms>
          </v-card-text>
        </v-card> </v-dialog
    ></v-row>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="3"
        class="max-width"
        v-for="(room, i) in get_roomsData"
        :key="i"
      >
        <v-card style="border-radius: 25px">
          <v-carousel hide-delimiter-background height="100%">
            <v-carousel-item
              v-for="(image, index) in getRoomImagesByRoomId(room.id)"
              :key="index"
            >
              <v-img
                :src="image.blobUrl"
                height="100%"
                class="white--text align-end"
                gradient="to bottom, rgba(255, 165, 0, 0.1), rgba(255, 140, 0, 0.3)"
              >
                <v-card-title
                  class="white--text text--darken-1 font-weight-bold"
                >
                  {{ image.title }}
                </v-card-title>
              </v-img>
            </v-carousel-item>
          </v-carousel>
          <v-card-text>
            <div class="black--text text--darken-1 font-weight-normal">
              Room Number: {{ room.room_number }}
            </div>
            <div class="black--text text--darken-1 font-weight-normal">
              Type :
              {{ room.room_type }}
            </div>
            <div class="black--text text--light-1 font-weight-normal">
              Building-Floor: {{ room.floor_name }}
            </div>
            <div class="black--text text--light-1 font-weight-normal">
              Capacity: {{ room.capacity }}
            </div>
            <div class="black--text text--light-1 font-weight-normal">
              Monthly-Rent: {{ room.monthly_rent }}
            </div>
            <div
              class="black--text text--light-1 font-weight-normal"
              v-if="room.avilablity_status === 1"
            >
              Avilablity_status: Avilable
            </div>
            <div v-else class="black--text text--light-1 font-weight-normal">
              Avilablity_status: Not Avilable
            </div>
            <div class="black--text text--light-1 font-weight-normal"></div>
            <div class="deep-orange--text text--light-4 font-weight-bold">
              Facilities:
            </div>
            <v-chip-group>
              <v-chip
                v-for="(facility, i) in parseFacilities(room.facilities)"
                :key="i"
                label
                class="deep-orange--text text--darken-1 font-weight-bold"
                >{{ facility }}</v-chip
              >
            </v-chip-group>
            <user-rating></user-rating>
          </v-card-text>
        </v-card>
      </v-col>
      <v-dialog v-model="editeDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="editeDialog = !editeDialog">
              <v-icon color="#f4511e">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <update-room :room_id="room_id"></update-room>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="rating-container">
      <AddRatingsComponentVue v-if="show"></AddRatingsComponentVue>
    </div>
  </v-container>
</template>
    <script>
import Cookies from "vue-cookies";
import UserRating from "@/components/utils/UserRating.vue";
import AddRooms from "@/components/universities/AddRooms.vue";
import updateRoom from "@/components/universities/UpdatRoom.vue";
import AddRatingsComponentVue from "@/components/users/AddRatingsComponent.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AddRooms,
    UserRating,
    updateRoom,
    AddRatingsComponentVue,
  },
  data() {
    return {
      search_input: null,
      dialog3: false,
      room_id: undefined,
      dorm_id_from_user: Cookies.get("dorm_from_user"),
      roomData: Cookies.get("rooms_data_by_id"),
      editeDialog: false,
      get_roomIsloading: false,
      dormitories: [],
      show: false,
    };
  },
  computed: {
    ...mapGetters([
      "get_roomIsLoading",
      "get_roomsData",
      "get_roomsImageData",
      "get_roomIsLoading",
      "get_dormDeleteIsLoading",
      "get_filterdData",
    ]),
  },
  methods: {
    ...mapActions([
      "getDormRooms",
      "getRoomsImage",
      "deleteRooms",
      "searchRoomByInput",
    ]),
    // A function to parse a JSON-formatted string representing a list of facilities and return it as an array.
    // If there's an error while parsing, it will return an empty array.
    parseFacilities(facilitiesString) {
      try {
        // Attempt to parse the facilitiesString into a JavaScript array using JSON.parse().
        return JSON.parse(facilitiesString);
      } catch (error) {
        // If there's an error during parsing (e.g., invalid JSON input), return an empty array.
        return [];
      }
    },
    getRoomImagesByRoomId(roomId) {
      if (roomId !== undefined && this.get_roomsImageData) {
        return this.get_roomsImageData[roomId];
      }
    },
    async getRoomsImageData() {
      try {
        let imageListResp = await this.getRoomsImage();
        imageListResp;
      } catch (error) {
        error;
      }
    },
    async getUniroom() {
      if (this.dorm_id_from_user) {
        try {
          let responsedata = await this.getDormRooms(this.dorm_id_from_user);
          Cookies.set("roomsData", responsedata);
          // this.dialog3 = !this.dialog3;
        } catch (error) {
          error;
        }
      }
    },
    updateRoom(roomId) {
      this.room_id = roomId;
      this.editeDialog = !this.editeDialog;
    },
    showRatings() {
      this.show = true;
    },
  },
  mounted() {
    this.$root.$on("new_room_added", this.getUniroom);
    this.$root.$on("new_room_added", this.getRoomImagesByRoomId);
    this.$root.$on("dorm_id", this.getUniroom);
    this.$root.$on("close", this.getUniroom);
    this.$root.$on("close", this.getRoomImagesByRoomId);
    this.$root.$on("close", this.getRoomsImageData);
    this.$root.$on("close", this.updateRoom);
    this.$root.$on("new_room_added", this.getRoomsImageData);
    this.getRoomsImageData();
    this.getRoomImagesByRoomId();
    this.getUniroom();
    this.$root.$on("show_ratings", this.showRatings);
  },
};
</script>
    <style  scoped>
.v-carousel,
.v-carousel__controls {
  height: 20vh;
}

.sm {
  width: 100%;
}

.my-4 {
  display: flex;
  align-content: flex-start;
  margin: 32px;
}

.hide-on-xs-only {
  margin: 4px;
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  justify-content: flex-start;
}
.custom-width {
  width: 100%;
  margin: 0 auto;
}
.soft-box-shadow {
  box-shadow: 0px 2px 2px 2px rgba(218, 246, 8, 0.4),
    0 3px 3px rgba(255, 197, 5, 0.966), 0 1px 4px rgb(255, 217, 3);
  width: 90%;
  margin: 30px;
}
.max-width {
  width: 100%;
  margin: 0 auto;
}
v-btn--icon {
  color: black;
}
.rating-container {
  position: relative;
  width: 50%;
  top: -400px;
  right: -300px;
}
</style>
    
    
    
    