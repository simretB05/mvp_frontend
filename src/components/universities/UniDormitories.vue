<template>
  <v-container class="container-custom">
    <v-row align="center">
      <v-col class="cols-card" cols="12" sm="12" md="6" lg="5">
        <h2 class="green--text-center font-weight-bold mb-4">
          <v-icon color="#f4511e" class="mr-2">mdi-cog</v-icon>
          Dormitories Settings Page
        </h2>
        <p class="text-center">Browse and manage Dormitories here</p>
      </v-col>
    </v-row>
    <v-col
      class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
      cols="12"
      v-if="get_dormIsLoading && !get_dormData"
    >
      Getting Your Dormitorie
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
            v-if="!get_dormIsLoading && get_dormData.length === 0"
          >
            No Dormitory Currently, use the Add Your Dormitory Button to Add
            Your Dormitories.
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
        <v-col cols="12" sm="12" align-center>
          <div class="text-center">
            <div class="my-4">
              <v-btn
                x-large
                color="#061e36"
                dark
                @click="dialog = !dialog"
                class="hide-on-xs-only"
              >
                <v-icon color="#f4511e">mdi-domain</v-icon> Add Dormitory
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
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(dormitory, i) in get_dormData"
        :key="i"
      >
        <v-card class="ma-2">
          <div>
            <v-carousel hide-delimiter-background height="100%">
              <v-carousel-item
                v-for="(image, index) in getDormImagesByDormId(dormitory.id)"
                :key="index"
              >
                <v-img
                  :src="image.blobUrl"
                  height="100%"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>
          <div style="height: 200px">
            <v-card-text>
              <div class="black--text text--darken-1 font-weight-normal">
                Dormitory Name: {{ dormitory.name }}
              </div>
              <div class="black--text text--darken-1 font-weight-normal">
                Address: {{ dormitory.address }}
              </div>
              <div class="black--text text--light-1 font-weight-normal">
                City: {{ dormitory.city }}
              </div>
              <div class="black--text text--light-1 font-weight-normal">
                State/province/Region: {{ dormitory.state }}
              </div>
              <div class="black--text text--light-1 font-weight-normal">
                ZIP/Postal Code: {{ dormitory.zip }}
              </div>
              <div class="black--text text--light-1 font-weight-normal">
                Country: {{ dormitory.country }}
              </div>
              <div class="deep-orange--text text--light-4 font-weight-bold">
                Facilities:
              </div>
              <v-chip-group>
                <v-chip
                  v-for="(facility, i) in parseFacilities(dormitory.facilities)"
                  :key="i"
                  label
                  class="deep-orange--text text--darken-1 font-weight-bold"
                >
                  {{ facility }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </div>
          <v-row justify="center" class="my-2">
            <!-- Edit Icon -->
            <v-btn
              icon
              @click="updateDorm(dormitory.id)"
              color="#f67850"
              class="mx-4"
            >
              <v-icon color="#f67850">mdi-pencil</v-icon> Edite
            </v-btn>
            <!-- Delete Icon -->
            <v-btn icon @click="deleteDormitories(dormitory.id)">
              <v-icon color="#f67850">mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <!-- Edit Icon -->
          <check-rooms-utils :dorm_id="dormitory.id"></check-rooms-utils>
        </v-card>
      </v-col>
    </v-row>
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
  </v-container>
</template>
<script>
import Cookies from "vue-cookies";
import AddDormitories from "@/components/universities/AddDormitories.vue";
import UpdateDormitories from "@/components/universities/UpdatDormitories.vue";
import CheckRoomsUtils from "@/components/utils/CheckRoomsUtils.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AddDormitories,
    UpdateDormitories,
    CheckRoomsUtils,
  },
  data() {
    return {
      search_input: null,
      dialog: false,
      editeDialog: false,
      dorm_id: Cookies.get("dorm_id"),
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
      "get_dormIsLoading",
      "get_dormData",
      "get_dormDeleteIsLoading",
      "get_filterdData",
      "get_dormImageData",
    ]),
  },
  methods: {
    ...mapActions([
      "getUniDormitories",
      "deleteDormitories",
      "searchByInput",
      "getDormImage",
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
    getDormImagesByDormId(dormId) {
      if (this.get_dormImageData && dormId) {
        return this.get_dormImageData[dormId];
      }
    },
    async getDormsImageData() {
      try {
        let imageListResp = await this.getDormImage();
        imageListResp;
      } catch (error) {
        error;
      }
    },
    async getUniDormitory() {
      try {
        let responsedata = await this.getUniDormitories(this.university_id);
        Cookies.set("responsedormitoryData", responsedata);
        this.dialog === false;
      } catch (error) {
        error;
      }
    },
    updateDorm(dormitoryId) {
      this.editeDialog = !this.editeDialog;
      this.dorm_id = dormitoryId;
    },
  },
  mounted() {
    this.$root.$on("new_dorm_added", this.getUniDormitory);
    this.$root.$on("close", this.getUniDormitory);
    this.$root.$on("new_dorm_added", this.getDormsImageData);
    this.$root.$on("close", this.updateDorm);
    this.$root.$on("close", this.getDormsImageData);
    this.$root.$on("dorm_image_update", this.getDormsImageData);
    this.$root.$on("dorm_image_update", this.getUniDormitory);
    this.$root.$on("dorm_image_update", this.getDormImagesByDormId);
    this.$root.$on("close", this.getDormImagesByDormId);

    this.getUniDormitory();
    this.getDormsImageData();
    this.getDormImagesByDormId();
  },
};
</script>
<style  scoped>
.lg_nav {
}

.container-custom {
  width: 100%;
  margin: 0 auto;
}

.lg {
  width: 50%;
}

.prev,
.next {
  color: #f57f17;
}

/* .sm {
  width: 100%; */
/* } */

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
.row-conatiner {
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 0 auto;
}
@media only screen and (min-width: 600px) {
  .container-custom {
    width: 100%;
  }
}
.search {
  display: flex;
  justify-content: flex-start;
}

v-btn--icon {
  color: black;
}
</style>



