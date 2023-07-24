<template>
  <v-container class="custom-size">
    <v-row>
      <v-col cols="12" sm="8" md="6" lg="5">
        <h2 class="green--text-center font-weight-bold mb-4">
          <v-icon color="#f4511e" class="mr-2">mdi-cog</v-icon>
          Settings Page
        </h2>
        <p class="text-center">Customize your account settings here</p>
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="100%">
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title :v-text="card.title">{{
                  card.title
                }}</v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
      <!-- <v-card-actions>
        <v-slide-x-reverse-transition>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                class="my-0"
                v-bind="attrs"
                @click="resetForm"
                v-on="on"
                color="#f4511e"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh form</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn color="#f4511e" text @click="submit"> edite</v-btn>
      </v-card-actions> -->
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
      cards: [
        {
          title: "University Home image",
          src: "",
          flex: 12,
        },
        {
          title: "Dormetories image",
          src: "",
          flex: 6,
        },
        {
          title: "Best  Dorm rooms image",
          src: undefined,
          flex: 6,
        },
      ],
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
            university_id: this.getUniversity_id,
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