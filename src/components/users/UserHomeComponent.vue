<template>
  <v-container>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="(item, i) in combinedGroups"
        :key="i"
      >
        <div class="custom-card" @click="routeToListings(item.university.id)">
          <div
            class="custom-card-image"
            :style="{ backgroundImage: 'url(' + item.image + ')' }"
          ></div>
          <div class="custom-card-text" style="color:#f45228">
            <p class="text-center">Student accommodation in {{ item.university.city }}</p>
          </div>
          <v-card-actions class="d-flex justify-center">
            <v-btn @click="routeToListings(item.university.id)" color="transparent" class="custom-btn" style="border:1px solid #f45228;">
              View Details
              <v-icon right color="#f45228">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </div>
    <v-card width="100%" style="margin: 20px auto" class="text-center">
      <v-card-title style="color: #f45228;">Landlords and property managers </v-card-title>
      <v-card-text>
        <p>Register now your property at our brand new Extranet</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="routeToRegister"
          color="#f4511e"
          width="200px"
          class="white--text text--darken-1 font-weight-normal"
        >
          List your Place
        </v-btn>
      </v-card-actions>
    </v-card>
    <users-rating-display-component></users-rating-display-component>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UsersRatingDisplayComponent from "@/components/users/UsersRatingDisplayComponent.vue";
import Cookies from "vue-cookies";

export default {
  components: {
    UsersRatingDisplayComponent,
  },
  data() {
    return {
      uniGroups: [],
      combinedGroups: [],
    };
  },
  computed: {
    ...mapGetters(["get_allUnisData", "get_uniImageData"]),
  },
  methods: {
    ...mapActions(["getAllUniversities", "getUnisImage"]),

    async getUnis() {
      try {
        let responsedata = await this.getAllUniversities();
        responsedata;
        this.dialog === false;
      } catch (error) {
        error;
      }
    },
    async getUnisImageData() {
      try {
        let imageListResp = await this.getUnisImage();
        imageListResp;
      } catch (error) {
        error;
      }
    },
    createCombinedGroups() {
      let uniData = this.get_allUnisData;
      let imageData = this.get_uniImageData["1"];
      let combinedGroups = uniData.map((university, index) => ({
        university,
        image: imageData[index % imageData.length],
      }));

      this.combinedGroups = combinedGroups;
    },
    async fetchData() {
      await this.getUnisImageData();
      await this.getUnis();
      this.createCombinedGroups();
    },
    routeToRegister() {
      this.$router.push(`/register`);
    },
    routeToListings(id) {
      if (id) {
        this.$root.$emit("uniIdFromHome", id);
        Cookies.set(`uniIdFromHome`, id);
        this.$router.push(`/university-Listing`);
      }
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.custom-card {
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;
  height: 250px; /* Adjust the height as per your preference */
}

.custom-card:hover {
  transform: translateY(-5px);
}

.custom-card-image {
  height: 150px; /* Adjust the height as per your preference */
  background-size: cover;
  background-position: center;
}

.custom-card-text {
  padding: 5px;
  font-size: .9rem;
}

.custom-card-actions {
  text-align: center;
}

.custom-btn {
  border: 2px solid #f45228; 
  color: #f45228; 
  font-size: .7rem;
}

/* Additional CSS to change <p> tag color */
.custom-card-text p {
  color: #f45228;
  font-size: .9rem;

}
</style>
