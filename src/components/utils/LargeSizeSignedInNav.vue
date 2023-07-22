<template>
    <v-layout row wrap justify-end>
      <v-flex flex cols="3">
        <v-row class="flex-row justify-end" wrap justify-end>
          <v-col
            class="flex-none wrap"
            cols="3"
            v-for="(item, i) in loginLinks"
            :key="i"
            link
          >
            <v-list color="transparent" class="nav-list">
              <v-list-item class="padding-none">
                <v-divider class="mx-2" color="#e3e6e3" vertical></v-divider>
                <v-list-item-icon cols="12" class="mrx-1 mx-0 px-0">
                  <v-icon class="mx-2" color="#f4511e">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="two-columb-layout">
                  <v-list-item-title class="white--text light subtitle-3">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      loginLinks: [
                { icon: "mdi-home", title: "Home", route: "/" },
                { icon: "mdi-school", title: "University Home", route: "/university-home" },
                { icon: "mdi-view-list", title: "Dormitories", route: "/dormitories" },
                { icon: "mdi-bed-empty", title: "Rooms", route: "/rooms" },
                { icon: "mdi-bell", title: "Notifications", route: "/notifications" },
                { icon: "mdi-account-cog", title: "Profile/Settings", route: "/profile-settings" },
            ],

    };
  },
};
</script>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(
    .v-list-item--disabled
  ) {
  color: #b3d7c2;
}
.lg_nav {
  width: 100%;
  display: grid;
  place-items: end;
}
.my-5 {
  padding: 16px;
}

.flex-none {
  flex: 0;
  padding: 0;
}

.flex-row {
  /* display: flex;
  justify-content: end; */
  width: 100%;
}

.padding-none {
  padding: 0 !important;
}
.v-list {
  width: 100;
  display: grid;
  padding: 16px;
}
.na .v-list-item-title {
  color: #12f0dd;
  width: 100%;
}
</style>