<template>
  <v-layout class="my-5">
    <v-col>
      <v-list>
        <p justify class="mx-2">
          <span class="white--text lighten---text font-weight-bold">Dorm</span>
          <span class="white--text subtitle-4">Finder</span>
        </p>
        <v-list-item
          them--light-teal
          class="px-0"
          v-for="(item, i) in loginLinks"
          :key="i"
          link
          router
          :to="item.route"
          color="#ffffff"
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="#ffffff">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="orange--text text--darken-4 font-weight-bold"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="pa-2">
        <v-btn
          depressed
          class="white--text"
          color="#f4511e"
          block
          @click="logout"
        >
          Logout
        </v-btn>
      </div>
    </v-col>
  </v-layout>
</template>

<script>
import Cookies from "vue-cookies";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      token: Cookies.get("token"),
      loginLinks: [
        {
          icon: "mdi-school",
          title: "University Home",
          route: "/university-home",
        },
        { icon: "mdi-view-list", title: "Dormitories", route: "/dormitories" },
        { icon: "mdi-bed-empty", title: "all-Rooms", route: "/all-rooms" },
        { icon: "mdi-bell", title: "Notifications", route: "/notifications" },
        {
          icon: "mdi-account-cog",
          title: "Profile/Settings",
          route: "/profile-settings",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["logOutUni"]),

    async logout() {
      if (this.token) {
        try {
          let logoutResp = await this.logOutUni(this.token);
          logoutResp;
          Cookies.remove("roomsData");
          Cookies.remove("dorm_id");
          Cookies.remove("token");
          Cookies.remove("university_id");
          Cookies.remove("responsedormitoryData");
          Cookies.remove("responseUniData");
          Cookies.remove("responseData");
          Cookies.remove("rooms_data");
          Cookies.remove("rooms_data_by_id");
          this.$root.$emit("loggedOut");
          this.$router.push(`/`);
        } catch (error) {
          error;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style  scoped>
.my-5 {
  margin-top: 30px;
}
</style>