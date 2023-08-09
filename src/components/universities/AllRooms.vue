<template>
  <v-container class="custom-width">
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" lg="5">
        <h2 class="green--text-center font-weight-bold mb-4">
          <v-icon color="#f4511e" class="mr-2">mdi-monitor</v-icon>
          Rooms Display Page
        </h2>
        <p class="text-center">Browse All Dormitory Rooms Here</p>
      </v-col>
    </v-row>
    <v-col
      class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
      cols="12"
      v-if="get_allRoomIsLoading || !get_allRoomsData === 0"
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
            class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
            cols="12"
            v-if="!get_allRoomIsLoading && get_allRoomsData === 0"
          >
            No Rooms Currently, Please Try Again
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-row align="center">
      <v-col class="search" cols="12" sm="12" md="6" lg="3">
        <v-text-field
          v-model="search_input"
          ref="search_input"
          label="Search Room"
          placeholder="Enter dorm name"
          prepend-inner-icon="mdi-magnify"
          @input="searchRoomByInput(search_input)"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="row-container">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(room, i) in get_allRoomsData"
          :key="i"
        >
          <v-card class="ma-2">
            <div>
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
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
    <script>
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      search_input: null,
      dorm_id: Cookies.get("dorm_id"),
      university_id: Cookies.get("university_id"),
      dialog: false,
      editeDialog: false,
      card: [
        {
          src: "",
        },
      ],
      dormitories: [],
    };
  },
  computed: {
    ...mapGetters([
      "get_allRoomIsLoading",
      "get_allRoomsData",
      "get_roomsImageData",
      "get_dormDeleteIsLoading",
      "get_filterdData",
    ]),
  },
  methods: {
    ...mapActions([
      "getAllDormRooms",
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
      if (this.get_roomsImageData && roomId) {
        return this.get_roomsImageData[roomId];
      }
    },
    async getRoomsImageData() {
      if (this.university_id) {
        try {
          let imageListResp = await this.getRoomsImage();
          imageListResp;
        } catch (error) {
          error;
        }
      }
    },
    async getAllUniroom() {
      if (this.university_id) {
        try {
          let responsedata = await this.getAllDormRooms();
          responsedata;

          this.editDialog === false;
        } catch (error) {
          error;
        }
      }
    },
    updateRoom(roomId) {
      this.editeDialog = !this.editeDialog;
      this.dorm_id = roomId;
    },
  },
  mounted() {
    this.$root.$on("new_room_added", this.getAllUniroom);
    this.getRoomsImageData();
    this.getRoomImagesByRoomId();
    this.getAllUniroom();
  },
};
</script>
    <style  scoped>
.v-carousel,
.v-carousel__controls {
  background: hsl(215, 63%, 75%);
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

@media only screen and (min-width: 600px) {
  .custom-width {
    width: 100%;
    margin: 0;
  }
}
.custom-width {
  width: 100%;
  margin: 0 auto;
}
v-btn--icon {
  color: black;
}
</style>
    
    
    
    