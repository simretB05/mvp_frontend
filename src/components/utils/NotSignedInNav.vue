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
          v-for="(item, i) in items"
          :key="i"
          link
          router
          :to="item.route"
          color="#ffffff"
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="#ffffff">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content color="#ffffff">
            <v-list-item-title
              class="orange--text text--darken-4 font-weight-bold"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: "mdi-home", title: "Home", route: "/" },
        {
          icon: "mdi-school",
          title: "University Listing",
          route: "/univetsity-Listing",
        },
        { icon: "mdi-domain", title: "List Your Place ", route: "/register" },
        { icon: "mdi-mail", title: "Contact-Us", route: "/contact-us" },
        { icon: "mdi-lightbulb", title: "About-Us", route: "/about-us" },
      ],
    };
  },
};
</script>

<style  scoped>
.my-5 {
  margin-top: 30px;
}
</style>