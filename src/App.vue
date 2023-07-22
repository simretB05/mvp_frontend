<template>
  <v-app>
    <nav-bar-menu></nav-bar-menu>
    <v-main class="mx-5">
      <router-view></router-view>
    </v-main>
    <footer-nav></footer-nav>
  </v-app>
</template>

<script>
import NavBarMenu from "@/components/utils/NavBarMenu.vue";
import FooterNav from "@/components/utils/FooterNav.vue";

export default {
  name: "App",
  components: {
    NavBarMenu,
    FooterNav,
  },
};
</script>


