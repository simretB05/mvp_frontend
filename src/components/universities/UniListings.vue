<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="soft-box-shadow">
          <v-card-title class="headline">Card 1</v-card-title>
          <v-card-text>Content for Card 1 goes here...</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="soft-box-shadow">
          <v-card-title class="headline">Card 2</v-card-title>
          <v-card-text>Content for Card 2 goes here...</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!-- Dormitory Listing Column -->
      <v-col cols="12" md="6" style="border: 1px solid orange">
        <v-card class="soft-box-shadow">
          <v-card-title class="headline">Dormitories</v-card-title>
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
        <v-row justify="center" align="center" class="dorm-cards-row">
          <v-card
            class="ma-8 dorm-card"
            v-for="(dormitory, index) in get_dormDataFromHome"
            :key="index"
            cols="12"
          >
            <div style="width: 100%" class="dorm-carousel">
              <v-carousel hide-delimiter-background height="50%">
                <v-carousel-item
                  v-for="(image, index) in getDormImagesByDormId(dormitory.id)"
                  :key="index"
                >
                  <v-img :src="image.blobUrl" class="image-card"></v-img>
                </v-carousel-item>
              </v-carousel>
            </div>
            <div style="height: 226px">
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
                    v-for="(facility, i) in parseFacilities(
                      dormitory.facilities
                    )"
                    :key="i"
                    label
                    class="deep-orange--text text--darken-1 font-weight-bold"
                  >
                    {{ facility }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </div>
            <v-row justify="center" class="my-2"> </v-row>
          </v-card>
        </v-row>
      </v-col>
      <!-- Map Column -->
      <v-col cols="12" md="6" style="border: 1px solid orange">
        <div id="mapContainer" style="height: 400px"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "vue-cookies";

export default {
  data() {
    return {
      filteredDormitories: [],
      id: Cookies.get("uniIdFromHome"),
    };
  },
  computed: {
    ...mapGetters(["get_dormDataFromHome", "get_dormImageDataFromHome"]),
  },
  methods: {
    ...mapActions(["uniIdFromHome", "getDormImage"]),

    async getUniFromHome() {
      if (this.id) {
        try {
          let responsedata = await this.uniIdFromHome(this.id);
          responsedata;
        } catch (error) {
          error;
        }
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
    getDormImagesByDormId(dormId) {
      if (this.get_dormImageDataFromHome && dormId) {
        return this.get_dormImageDataFromHome[dormId];
      }
    },
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
  },
  mounted() {
    this.getUniFromHome();
    this.getDormsImageData();
  },
};
</script>

<style scoped>
.soft-box-shadow {
  box-shadow: 0px 2px 2px 2px rgba(218, 246, 8, 0.4),
    0 3px 3px rgba(255, 197, 5, 0.966), 0 1px 4px rgb(255, 217, 3);
}

.headline {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.text-custom-class {
  width: 100%;
}
.dorm-cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

@media (max-width: 960px) {
}
.dorm-card {
  max-width: 400px;
  display: grid;
  place-items: center;
}

.dorm-carousel {
  max-height: 200px;
  overflow: hidden;
}

.image-card {
  width: 100%;
}
</style>
