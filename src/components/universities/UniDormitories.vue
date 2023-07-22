<template>
  <v-container sm="12" class="container-custom">
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
    <v-layout row class="lg_nav" cols="8" sm="6" md="4" lg="3">
      <v-flex xs-12>
        <v-row class="justify-center">
          <v-col cols="12" sm="12" md="12" lg="7">
            <v-carousel cycle show-arrows-on-hover hide-delimiter-background>
              <v-carousel-item v-for="(dormitory, i) in dormitories" :key="i">
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
        </v-row>
      </v-flex>
    </v-layout>
    <v-row align="start">
      <v-col cols="12" sm="12" align-start>
        <div class="text-center">
          <div class="my-4">
            <v-btn
              x-large
              color="#5c6bc0"
              dark
              @click="dialog = !dialog"
              class="hide-on-xs-only"
            >
              <v-icon color="#f4511e">mdi-domain</v-icon> Add Dormitory
            </v-btn>
            <v-btn
              color="primary"
              fab
              small
              dark
              @click="handleEdit"
              class="hide-on-xs-only"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="error"
              fab
              small
              dark
              @click="handleDelete"
              class="hide-on-xs-only"
            >
              <v-icon>mdi-delete</v-icon>
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
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Cookies from "vue-cookies";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import AddDormitories from "@/components/universities/AddDormitories.vue";

export default {
  components: {
    AddDormitories,
  },
  data() {
    return {
      dialog: false,
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
    ...mapGetters(["get_dormIsLoading", "get_dormData", "get_dormInfoErro"]),
  },
  methods: {
    ...mapActions(["getUniDormitories"]),
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
          this.dormitories = responsedata;
        } catch (error) {
          error;
        }
      }
    },
  },
  mounted() {
    this.getUniDormitory();
    this.getImage();
  },
};
</script>
<style scoped>
lg_nav {
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
</style>

