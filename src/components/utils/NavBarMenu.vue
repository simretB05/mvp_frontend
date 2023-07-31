<template>
  <v-container>
    <nav fixed-top>
      <v-layout row class="lg_nav">
        <v-flex xs-12>
          <v-app-bar app flat color="#789de1">
            <v-app-bar-nav-icon
              color="#ff5722"
              class="d-lg-none darken-6"
              @click="drawer = !drawer"
            >
            </v-app-bar-nav-icon>
            <v-toolbar-title color="#ffffff" class="text-uppercase grey--text">
              <span class="white--text text--darken-1 font-weight-bold"
                >Dorm</span
              >
              <span class="white--text subtitle-2">Finder</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <large-size-notsigned-in-nav
              class="d-none d-lg-block"
              v-if="!id"
            ></large-size-notsigned-in-nav>
            <large-size-signed-in-nav
              class="d-none d-lg-block"
              v-else
            ></large-size-signed-in-nav>
          </v-app-bar>
        </v-flex>
      </v-layout>
      <v-navigation-drawer
        color="#789de1"
        v-model="drawer"
        fixed
        left
        temporary
        height="100%"
      >
        <!-- Close icon to close the dialog -->
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="drawer = false">
            <v-icon color="#ffffff">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <not-signed-in-nav v-if="!id"></not-signed-in-nav>
        <signed-in-nav v-else></signed-in-nav>
      </v-navigation-drawer>
    </nav>
  </v-container>
</template>
<script>
// import axios from "axios";
import { mapGetters } from "vuex";
import Cookies from "vue-cookies";
import SignedInNav from "@/components/utils/SignedInNav.vue";
import LargeSizeNotsignedInNav from "@/components/utils/LargeSizeNotsignedInNav.vue";
import LargeSizeSignedInNav from "@/components/utils/LargeSizeSignedInNav.vue";
import NotSignedInNav from "@/components/utils/NotSignedInNav.vue";
export default {
  components: {
    LargeSizeSignedInNav,
    LargeSizeNotsignedInNav,
    SignedInNav,
    NotSignedInNav,
  },
  data() {
    return {
      drawer: false,
      id: undefined,
    };
  },
  computed: {
    ...mapGetters(["getIsLoading", "getUniData"]),
    isDataLoaded() {
      // Return true if data is available, false otherwise
      return this.getUniData !== undefined;
    },
  },
  methods: {
    listenToEvent() {
      this.id = Cookies.get("university_id");
    },
  },
  mounted() {
    this.$root.$on("universityLoggedIn", (id) => {
      this.id = id;
    });
    this.listenToEvent();
  },
};
</script>


<style scoped>
.lg_nav {
  width: 90%;
}
nav {
  display: flex;
  justify-content: flex-start;
}
.my-5 {
  padding: 16px;
}
.pa-2 {
  width: 20%;
}
.v-responsive__content {
  width: 50%;
  justify-content: center;
  color: #789de1;
}
</style>
