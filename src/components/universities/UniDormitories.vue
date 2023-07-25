<template>
  <v-container sm="12" class="container-custom">
    <v-row align="center">
      <v-col cols="12" sm="12" md="6" lg="5">
        <h2 class="green--text-center font-weight-bold mb-4">
          Welcome to Your Dormitories
        </h2>
        <p class="text-center">Browse and manage your dormitories here</p>
      </v-col>
    </v-row>
    <v-col
      class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
      cols="12"
      v-if="get_dormIsLoading"
    >
      Getting Your Dormitories
    </v-col>
    <v-col cols="12">
      <v-progress-linear
        color="#f4511e"
        indeterminate
        rounded
        height="12"
        v-if="get_dormIsLoading"
      ></v-progress-linear>
    </v-col>
    <v-layout row class="lg_nav" cols="12" sm="12" md="4" lg="3">
      <v-flex xs-12>
        <v-row class="justify-center">
          <v-col cols="12" sm="12" md="12" lg="7" v-if="get_dormData">
            <v-carousel cycle show-arrows-on-hover hide-delimiter-background>
              <v-carousel-item v-for="(dormitory, i) in get_dormData" :key="i">
                <v-card cols="8" sm="6" md="4" lg="4">
                  <v-img
                    :src="card.src"
                    height="200"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
                  >
                    <v-card-title
                      class="black--text text--darken-1 font-weight-bold"
                      >{{ dormitory.name }}</v-card-title
                    >
                  </v-img>
                  <v-card-text>
                    <div>
                      <div
                        class="black--text text--darken-1 font-weight-normal"
                      >
                        Dormitory Name: {{ dormitory.name }}
                      </div>
                      <div
                        class="black--text text--darken-1 font-weight-normal"
                      >
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
                    </div>
                    <div
                      class="deep-orange--text text--light-4 font-weight-bold"
                    >
                      Facilities:
                    </div>
                    <v-chip-group>
                      <v-chip
                        v-for="(facility, i) in parseFacilities(
                          dormitory.facilities
                        )"
                        :key="i"
                        label
                        class="deep-orange--text text--darken-1 font-weight-bold"
                        >{{ facility }}</v-chip
                      >
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col
            class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
            cols="12"
            v-else
          >
            No Dormitories Currently, use the Add Your Dormitory Button to Add
            Your Dormitories
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
          placeholder="Enter dormitory name"
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
            <v-carousel-item v-for="(image, index) in images" :key="index">
              <v-img
                :src="image.src"
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
            <v-icon color="#f67850" class="ma-2" @click="editDormitory(index)"
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
          <v-col
            class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
            cols="12"
            v-if="get_dormDeleteIsLoading && get_dorm_Id === dormitory.id"
          >
            deleting a Dormitories
          </v-col>
          <v-col cols="12">
            <v-progress-linear
              color="#061e36"
              indeterminate
              rounded
              height="12"
              v-if="get_dormDeleteIsLoading && get_dorm_Id === dormitory.id"
            ></v-progress-linear>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Cookies from "vue-cookies";
import AddDormitories from "@/components/universities/AddDormitories.vue";
import axios from "axios";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    AddDormitories,
  },
  data() {
    return {
      search_input: null,
      // searchQuery: undefined,

      images: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          title: "Title 1",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          title: "Title 2",
        },
      ],
      dialog: false,
      university_id: Cookies.get(`university_id`),
      card: [
        {
          src: "",
        },
      ],
      dormitories: [],
      get_dorm_Id: undefined,
    };
  },
  computed: {
    ...mapGetters([
      "get_dormIsLoading",
      "get_dormData",
      "get_dormDeleteIsLoading",
      "get_filterdData",
    ]),
    ...mapState(["setdeleteData"]),
  },
  methods: {
    ...mapActions(["getUniDormitories", "deleteDormitories", "searchByInput"]),
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

    async getUniDormitory() {
      if (this.university_id) {
        try {
          let responsedata = await this.getUniDormitories(this.university_id);
          Cookies.set("responsedormitoryData", responsedata);
          this.dialog === false;
        } catch (error) {
          error;
        }
      }
    },
  },

  mounted() {
    this.$root.$on("new_dorm_added", this.getUniDormitory);
    this.getUniDormitory();
    this.getImage();
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



