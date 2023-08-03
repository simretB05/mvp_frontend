<template>
  <v-container sm="12" class="container-custom">
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" lg="5">
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
      v-if="get_dormIsLoading && get_dormData > [0]"
    >
      Getting Your Dormitories
      <v-col cols="12">
        <v-progress-linear color="#f4511e" indeterminate rounded height="12">
        </v-progress-linear>
      </v-col>
    </v-col>
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
    <v-row justify="center">
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        v-for="(dormitory, i) in get_dormData"
        :key="i"
      >
        <v-card>
          <!-- <v-card class="mx-auto" max-width="600"> -->
          <v-carousel cycle hide-delimiter-background>
            <v-carousel-item
              v-for="(image, index) in getDormImagesByDormId(dormitory.id)"
              :key="index"
            >
              <v-img
                :src="image.blobUrl"
                height="400"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
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
              Dormitory Name: {{ dormitory.name }}
            </div>
            <div class="black--text text--darken-1 font-weight-normal">
              Address:
              {{ dormitory.address }}
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
                >{{ facility }}</v-chip
              >
            </v-chip-group>
          </v-card-text>
          <v-row justify="center">
            <!-- Edit Icon -->
            <v-icon
              color="#f67850"
              class="ma-2"
              @click="updateDorm(dormitory.id)"
              >mdi-pencil</v-icon
            >
            <!-- Delete Icon -->
            <button>
              <v-icon
                color="#f67850"
                class="ma-2"
                @click="deleteDormitories(dormitory.id)"
                >mdi-delete</v-icon
              >
            </button>
          </v-row>
          <check-rooms-utils :dorm_id="dormitory.id"></check-rooms-utils>
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
      if (this.dorm_id) {
        try {
          let imageListResp = await this.getDormImage();
          imageListResp;
        } catch (error) {
          error;
        }
      }
    },
    async getUniDormitory() {
      if (this.university_id) {
        try {
          let responsedata = await this.getUniDormitories(this.university_id);
          Cookies.set("responsedormitoryData", responsedata);
          this.editDialog === false;
        } catch (error) {
          error;
        }
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
    this.$root.$on("close", this.getDormsImageData);
    this.$root.$on("close", this.updateDorm);

    this.getUniDormitory();
    this.getDormsImageData();
  },
};
</script>
<style  scoped>
.lg_nav {
}

.container-custom {
  width: 50%;
}

.lg {
  width: 50%;
}

.prev,
.next {
  color: #f57f17;
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

v-btn--icon {
  color: black;
}
</style>



