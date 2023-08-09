<template>
  <v-container class="custom-size">
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="2">
        <h2 class="green--text-center font-weight-bold mb-4">
          <v-icon color="#f4511e" class="mr-2">mdi-cog</v-icon>
          Settings Page
        </h2>
        <p class="text-center">Customize your account settings here</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="2">
        <!-- Card Image -->
        <v-img :src="src" height="200px" width="100%" contain></v-img>
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="100%">
      <v-col
        class="text-subtitle-1 deep-orange--text text--darken-3 font-weight-bold text-center"
        cols="12"
        v-if="getUniInfoIsLoading"
      >
        Getting Your Information
      </v-col>
      <v-col cols="12">
        <v-progress-linear
          color="#f4511e"
          indeterminate
          rounded
          height="12"
          v-if="getUniInfoIsLoading"
        ></v-progress-linear>
      </v-col>
      <v-list two-line v-for="(list, i) in universityData" :key="i">
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-school </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ list.name }}</v-list-item-title>
            <v-list-item-subtitle>name</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-information </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-card-text>
              <div>Bio</div>
              <div class="text--primary">
                <p>{{ list.bio }}</p>
              </div>
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-phone </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ list.phone_number }}</v-list-item-title>
            <v-list-item-subtitle>Phone Number</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-email </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ list.email }}</v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-earth</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ list.website }}</v-list-item-title>
            <v-list-item-subtitle>Website</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-map-marker </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <p>Address: {{ list.address }}</p>
              <p>Zip:{{ list.zip }}</p>
              <p>State:{{ list.state }}</p>
              <p>Country{{ list.country }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
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
      </v-card-actions>
    </v-card>
  </v-container>
</template>
  <script>
import axios from "axios";
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      university_id: Cookies.get(`university_id`),
      universityInfo: undefined,
      universityData: [],
      blobd: undefined,
      src: undefined,
    };
  },
  computed: {
    ...mapGetters(["getUniProfileInfoData", "getUniInfoIsLoading"]),
  },
  methods: {
    ...mapActions(["getUniProfileInfo"]),

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
          this.src = src;

          this.$store.commit("setUniInfoData", infoList);
          this.$root.$emit(`uniData`, this.universityInfo);
        })
        .catch((error) => {
          error;
        });
    },
    async getUniPro() {
      if (this.university_id) {
        try {
          let responsedata = await this.getUniProfileInfo(this.university_id);
          Cookies.set("responseUniData", responsedata);
          this.universityData.push(responsedata[0]);
        } catch (error) {
          error;
        }
      }
    },
  },
  mounted() {
    this.getUniPro();
    this.getImage();
  },
};
</script>
  <style  scoped>
.custom-size {
  width: 90%;
}
</style>