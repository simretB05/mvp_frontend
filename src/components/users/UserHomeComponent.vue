<template>
  <v-container>
    <v-carousel
      cycle
      style="width: 70%; margin: 0 auto"
      hide-delimiter-background
      horizontal
    >
      <v-carousel-item v-for="(group, j) in combinedGroups" :key="j">
        <v-row class="no-wrap" width="100%">
          <v-col v-for="(item, i) in group" :key="i">
            <button style="border: none; background: none; width: 100%">
              <v-card
                width="100%"
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
                    Student accommodation in {{ item[`university`][`city`] }}
                  </div>
                </v-card-text>
              </v-card>
            </button>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-card width="70%" style="margin: 0 auto">
      <v-card-title>Landlords and property managers </v-card-title>
      <v-card-text>
        <p>Register now your property at our brand new Extranet</p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="#f4511e"
          width="200px"
          class="white--text text--darken-1 font-weight-normal"
          >List your Place</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>
// import carouselNva from "@/components/utils/carouselNva.vue";
import { mapActions, mapGetters } from "vuex";

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
    createCombinedGroups() {
      let uniData = this.get_allUnisData;
      let imageData = this.get_uniImageData["1"];
      let groupSize = 3; // Number of universities and images per group
      let combinedGroups = [];

      for (let i = 0; i < uniData.length; i += groupSize) {
        let group = [];
        for (let j = i; j < i + groupSize; j++) {
          if (j < uniData.length) {
            group.push({
              university: uniData[j],
              image: imageData[j % imageData.length],
            });
          }
        }
        combinedGroups.push(group);
      }

      this.combinedGroups = combinedGroups;
      console.log(this.combinedGroups);
    },
    // getRoomImagesByRoomId(roomId) {
    //   if (roomId !== undefined && this.get_roomsImageData) {
    //     return this.get_roomsImageData[roomId];
    //   }
    // },
    async getUnis() {
      try {
        let responsedata = await this.getAllUniversities();
        // Cookies.set("responsedormitoryData", responsedata);
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
  },

  mounted() {
    this.getUnis();
    this.getUnisImageData();
    this.createCombinedGroups();
  },
};
</script>
<style scoped>
.no-wrap {
  flex-wrap: nowrap !important;
  overflow-x: hidden;
}
</style>
 
