<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(item, i) in combinedGroups"
        :key="i"
      >
        <v-card
          width="100%"
          height="400px"
          style="border-radius: 25px"
          class="d-flex flex-column"
        >
          <v-img
            :src="item.image"
            aspect-ratio="1"
            class="grey lighten-2"
          ></v-img>
          <v-card-text>
            <div class="black--text text--darken-1 font-weight-normal">
              Student accommodation in {{ item.university.city }}
            </div>
          </v-card-text>
          <v-card-actions class="btn">
            <v-btn
              @click="routeToListings(item.university.id)"
              color="#f4511e"
              class="white--text text--darken-1 font-weight-normal"
            >
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card width="100%" style="margin: 20px auto">
      <v-card-title>Landlords and property managers </v-card-title>
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "vue-cookies";

export default {
  components: {},
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
.btn {
  margin: 0 auto;
}
</style>
