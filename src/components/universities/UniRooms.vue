<template>
  <v-container fluid>
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
      v-if="get_roomIsLoading && get_roomsData > [0]"
    >
      Getting Your Dormitories
      <v-col cols="12">
        <v-progress-linear color="#f4511e" indeterminate rounded height="12">
        </v-progress-linear>
      </v-col>
    </v-col>
    <v-layout row class="lg_nav" cols="12">
      <v-flex xs-12>
        <v-row class="justify-center">
          <v-col cols="12" sm="12" md="12" lg="12" v-if="get_roomsData > [0]">
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title primary class="headline">Card 1</v-card-title>
                  <v-card-text> Content for Card 1 goes here... </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title primary class="headline">Card 2</v-card-title>
                  <v-card-text> Content for Card 2 goes here... </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
            cols="12"
            v-else
          >
            No Dormitories Currently, use the Add Your room Button to Add Your
            Dormitories
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
          @input="searchByInput(search_input)"
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
                @click="dialog = !dialog"
                class="hide-on-xs-only"
              >
                <v-icon color="#f4511e">mdi-domain</v-icon> Add room
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon color="#f4511e">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <add-dormitories></add-dormitories>
          </v-card-text>
        </v-card> </v-dialog
    ></v-row>
    <v-row justify="center" align="center" class="max-width">
      <div></div>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="3"
        class="ma-0"
        v-for="(room, i) in get_roomsData"
        :key="i"
      >
        <v-card>
          <!-- <v-card class="mx-auto" max-width="600"> -->
          <v-carousel cycle color="orange">
            <v-carousel-item v-for="(image, index) in images" :key="index">
              <v-img
                :src="image.src"
                height="450"
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
          <!-- </v-card> -->
          <v-card-text>
            <div class="black--text text--darken-1 font-weight-normal">
              Room Name: {{ room.room_number }}
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
          <v-row justify="center">
            <!-- Edit Icon -->
            <v-icon color="#f67850" class="ma-2" @click="updateDorm(room.id)"
              >mdi-pencil</v-icon
            ><v-text class="co-m">Edite</v-text>
            <!-- Delete Icon -->
            <button>
              <v-icon
                color="#f67850"
                class="ma-2"
                @click="deleteDormitories(room.id)"
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
            <v-btn icon @click="editeDialog = false">
              <v-icon color="#f4511e">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <update-dormitories :dorm_id="dorm_id"></update-dormitories>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
  <script>
import Cookies from "vue-cookies";
import AddDormitories from "@/components/universities/AddDormitories.vue";
import UpdateDormitories from "@/components/universities/UpdatDormitories.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AddDormitories,
    UpdateDormitories,
  },
  data() {
    return {
      search_input: null,
      dorm_id: Cookies.get("dorm_id"),
      images: [
        {
          src: "https://images.pexels.com/photos/376531/pexels-photo-376531.jpeg?auto=compress&cs=tinysrgb&w=1600",
          title: "Title 1",
        },
        {
          src: "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1600",
          title: "Title 2",
        },
        {
          src: "https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg?auto=compress&cs=tinysrgb&w=1600",
          title: "Title 1",
        },
        {
          src: "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1600",
          title: "Title 2",
        },
      ],
      dialog: false,
      editeDialog: false,
      university_id: Cookies.get(`university_id`),
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
      "get_roomIsLoading",
      "get_roomsData",
      "get_dormDeleteIsLoading",
      "get_filterdData",
    ]),
  },
  methods: {
    ...mapActions(["getDormRooms"]),
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
    getImage() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/university-image`,
          params: {
            university_id: this.university_id,
          },
          responseType: "blob",
        })
        .then((response) => {
          let infoList = response[`data`];
          let src = URL.createObjectURL(response[`data`]);
          for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].src = src;
          }
          this.$store.commit("setUniversityInfo", infoList);
          this.$root.$emit(`uniData`, this.universityInfo);
        })
        .catch((error) => {
          error;
        });
    },
    async getUniroom() {
      if (this.dorm_id) {
        try {
          let responsedata = await this.getDormRooms(this.dorm_id);
          Cookies.set("roomsData", responsedata);
          this.editDialog === false;
        } catch (error) {
          error;
        }
      }
    },
    updateDorm(roomId) {
      this.editeDialog = !this.editeDialog;
      this.dorm_id = roomId;
    },
  },
  mounted() {
    this.$root.$on("new_dorm_added", this.getUniroom);
    this.getUniroom();
    this.getImage();
  },
};
</script>
  <style  scoped>
.lg_nav {
}
.max-width {
  width: 60%;
  margin: 0 auto;
}
.container {
}
.prev,
.next {
  color: #f57f17;
}
.v-carousel,
.v-carousel__controls {
  background: hsl(215, 63%, 75%);
  height: 20vh;
}

.sm {
  width: 100%;
}
.ma-0 {
  max-height: 50%;
}
.my-4 {
  display: flex;
  align-content: start;
  margin: 32px;
}

.hide-on-xs-only {
  margin: 4px;
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  justify-content: start;
}

v-btn--icon {
  color: black;
}
</style>
  
  
  
  