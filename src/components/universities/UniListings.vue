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
      <v-col cols="12" md="6" style="border: 1px solid rgb(255, 174, 0)">
        <v-row justify="center" align="center" class="dorm-cards-row">
          <v-card
            class="ma-8 dorm-card"
            v-for="(dormitory, index) in get_dormDataFromHome"
            :key="index"
            cols="12"
          >
            <div class="divider" style="width: 40%; border-radius: %">
              <div class="dorm-carousel">
                <v-carousel hide-delimiter-background height="40%">
                  <v-carousel-item
                    v-for="(image, i) in getDormImagesByDormId(dormitory.id)"
                    :key="i"
                  >
                    <v-img :src="image.blobUrl" class="image-card"></v-img>
                  </v-carousel-item>
                </v-carousel>
              </div>
              <div style="height: 300px">
                <v-card-text class="card-info">
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
                  <div class="black--text text--light-1 font-weight-normal">
                    <p v-if="weatherDescription === 'clear sky'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-rainy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'fwe clouds'">
                      weather:{{ weatherDescription }}
                      <v-icon>mdi-white-balance-sunny</v-icon
                      >{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'scattered clouds'">
                      weather:{{ weatherDescription }}
                      <v-icon>mdi-weather-partly-cloudy</v-icon
                      >{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'broken clouds'">
                      weather:{{ weatherDescription }}
                      <v-icon>mdi-weather-cloudy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'shower rain'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-rainy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'rain'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-rainy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'light rain'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-rainy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'thunderstorm'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-rainy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'overcast clouds'">
                      weather:{{ weatherDescription }}
                      <v-icon>mdi-weather-cloudy</v-icon>{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'snow'">
                      weather:{{ weatherDescription }}
                      <v-icon>mdi-weather-lightning</v-icon
                      >{{ weatherData }}&deg;C
                    </p>
                    <p v-else-if="weatherDescription === 'mist'">
                      weather:{{ weatherDescription }}
                      <v-icon> mdi-weather-snowy</v-icon>{{ weatherData }}&deg;C
                    </p>
                  </div>
                  <div
                    class="deep-orange--text text--light-4 font-weight-bold"
                    style="width: 70%"
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
                    >
                      {{ facility }}
                    </v-chip>
                  </v-chip-group>
                  <check-rooms-utils
                    :dormitory_id="dormitory.id"
                  ></check-rooms-utils>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-row>
      </v-col>
      <!-- Map Column -->
      <v-col cols="12" md="6" style="border: 1px solid orange">
        <div id="map-container" style="height: 100vh"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Cookies from "vue-cookies";
import mapboxgl from "mapbox-gl";
import CheckRoomsUtils from "@/components/utils/CheckRoomsBtn.vue";

export default {
  components: {
    CheckRoomsUtils,
  },
  data() {
    return {
      filteredDormitories: [],
      id: Cookies.get("uniIdFromHome"),
      icon: undefined,
      weatherDescription: undefined,
      weatherData: undefined,
      dormitory_id: undefined,
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
    getMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic2ltYjA1IiwiYSI6ImNsbGZ0M3I1NjB1OXczcXBremVrMm5hOHQifQ.7clQHduZ3cW-0tSTtV0hqw";
      // Example: Center the map on Alberta, Canada (approximate center)
      // const initialCenter = [-114.0677, 53.5461]; // [longitude, latitude]
      const initialCenter = [-123.1216, 47.605]; // Adjusted coordinates

      const map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/outdoors-v11", // Example map style URL
        center: initialCenter,
        zoom: 10, // starting zoom
      });
      this.get_dormDataFromHome.forEach(async (dormitory) => {
        try {
          // Use Mapbox Geocoding API to geocode the address
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              dormitory.address
            )},${encodeURIComponent(dormitory.city)},${encodeURIComponent(
              dormitory.country
            )}.json?access_token=pk.eyJ1Ijoic2ltYjA1IiwiYSI6ImNsbGZ0M3I1NjB1OXczcXBremVrMm5hOHQifQ.7clQHduZ3cW-0tSTtV0hqw`
          );

          const data = await response.json();

          // Extract the latitude and longitude from the geocoding response
          const [longitude, latitude] = data.features[0].center;

          // Create a marker with the geocoded coordinates
          new mapboxgl.Marker({ color: "black" })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<p>${dormitory.name}</p>`))
            .addTo(map);
        } catch (error) {
          console.error("Error geocoding address:", error);
        }
      });
    },
    async getWeather() {
      const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
      const API_KEY = "05ce8526518c02d3860ba3097108f4fe";

      try {
        for (const dormitory of this.get_dormDataFromHome) {
          const response = await axios.get(baseUrl, {
            params: {
              q: dormitory.city,
              appid: API_KEY,
              units: "metric",
            },
          });
          this.weatherData = Math.round(response.data.main.temp);
          this.weatherDescription = response.data.weather[0].description;
          let weatherIcon = response.data.weather[0].icon;
          this.icon = `${weatherIcon}.png`;
          console.log(this.weatherDescription);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    },
  },
  mounted() {
    this.getWeather();
    this.getUniFromHome();
    this.getDormsImageData();
    this.getMap();
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
  place-items: start;
}

.dorm-carousel {
  max-height: 200px;
  overflow: hidden;
}

.image-card {
  width: 100%;
}
</style>
