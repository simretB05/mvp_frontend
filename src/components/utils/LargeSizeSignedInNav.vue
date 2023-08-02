<template>
  <v-container class="custom-c">
    <v-layout align-center>
      <v-card class="custom-v">
        <v-list class="menu-list" dense>
          <v-list-item
            class="menu-list_item"
            v-for="(item, i) in loginLinks"
            :key="i"
            link
            router
            :to="item.route"
            :class="{ 'last-item-button': i === loginLinks.length - 1 }"
          >
            <!-- <v-divider class="mx-2" color="#e3e6e3" vertical></v-divider> -->
            <v-list-item-icon>
              <v-icon class="icon" color="#f4511e">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="white--text text--darken-1 font-weight-bold mx-3"
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,

      loginLinks: [
        { icon: "mdi-home", title: "Home", route: "/" },
        {
          icon: "mdi-school",
          title: "University Home",
          route: "/university-home",
        },
        { icon: "mdi-view-list", title: "Dormitories", route: "/dormitories" },
        // { icon: "mdi-bed-empty", title: "Rooms", route: "/rooms" },
        { icon: "mdi-bed-empty", title: "all Dorm-Rooms", route: "/all-rooms" },
        { icon: "mdi-bell", title: "Notifications", route: "/notifications" },
        {
          icon: "mdi-account-cog",
          title: "Profile/Settings",
          route: "/profile-settings",
        },
        {
          icon: "mdi-logout",
          title: "Logout",
          route: "/logout",
        },
      ],
    };
  },
};
</script>

<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(
    .v-list-item--disabled
  ) {
  width: 0%;
  font-weight: 900;
  display: flex;
  align-items: center;
}
.v-list-item {
  display: flex;
  justify-items: center;
}
.custom-c {
  display: flex;
  justify-content: flex-end;
  width: 70%;
}
.custom-v {
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-items: flex-end;
}
.v-list-item--dense .v-list-item__icon,
.v-list--dense .v-list-item .v-list-item__icon {
  margin: 0;
  display: flex;
}
.menu-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 0vh;
  background-color: transparent;
  padding: 0;
}
.last-item-button {
  background-color: #061e36;
  color: #fff;
  padding: 0px 8px;
  border-radius: 4px;
  width: 10%;

  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
.v-icon.v-icon {
  margin-top: 12px;
}
/* Bounce effect on click */
.last-item-button:active {
  transform: scale(0.95); /* Scale down the element when clicked */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Increase shadow size when clicked */
}
</style>
