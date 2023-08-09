<template>
  <v-container fluid class="custom-width">
    <v-row align="center">
      <v-col
        cols="12"
        sm="12"
        lg="8"
        justify-content="start"
        align-items="start"
      >
        <h2 class="green--text-center font-weight-bold mb-4">
          <v-icon color="#f4511e" class="mr-2">mdi-cog</v-icon>
          Rooms Settings Page
        </h2>

        <p class="text-center">Browse and manage Rooms and facilities Here</p>
      </v-col>
    </v-row>
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
            No Rooms In This Dormitory, use the Add Room Button to Add Your
            Rooms
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-row align="center">
      <v-col class="search" cols="12" sm="12" md="6" lg="2">
        <v-text-field
          v-model="search_input"
          ref="search_input"
          label="Search Dormitories"
          placeholder="Enter dorm name"
          prepend-inner-icon="mdi-magnify"
          @input="searchRoomByInput(search_input)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-row>
        <v-col cols="12" sm="12" align-start>
          <div class="text-center">
            <div class="my-4">
              <v-btn
                x-large
                color="#061e36"
                dark
                @click="dialog3 = !dialog3"
                class="hide-on-xs-only"
              >
                <v-icon color="#f4511e">mdi-domain</v-icon> Add room
              </v-btn>
            </div>
          </div>
        </v-col>
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
          </v-card-text>
          <v-row justify="center">
            <!-- Edit Icon -->
            <button
              class="orange--text text--darken-1 font-weight-bold"
              @click="updateRoom(room.id)"
            >
              <v-icon color="#f67850" back class="ma-0">mdi-pencil</v-icon>
              Edite
            </button>
            <!-- Delete Icon -->
            <button>
              <v-icon color="#f67850" class="ma-2" @click="deleteRooms(room.id)"
                >mdi-delete</v-icon
              >
            </button>
          </v-row>
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
  </v-container>
</template>
  <script>
import Cookies from "vue-cookies";
import AddRooms from "@/components/universities/AddRooms.vue";
import updateRoom from "@/components/universities/UpdatRoom";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AddRooms,
    updateRoom,
  },
  data() {
    return {
      search_input: null,
      dialog3: false,
      room_id: undefined,
      dorm_id: Cookies.get("dorm_id"),
      roomData: Cookies.get("rooms_data_by_id"),
      editeDialog: false,
      get_roomIsloading: false,
      dormitories: [],
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
    async getUniroom(dorm_id) {
      if (dorm_id) {
        try {
          let responsedata = await this.getDormRooms(dorm_id);
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
    this.getUniroom(this.dorm_id);
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

.max-width {
  width: 100%;
  margin: 0 auto;
}
v-btn--icon {
  color: black;
}
</style>
  
  
  
  