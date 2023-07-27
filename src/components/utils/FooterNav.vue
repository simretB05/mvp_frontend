<template>
  <v-footer dark padless class="footer" style="margin-top: 30px">
    <v-card
      flat
      tile
      color="#789de1"
      class="darken-4 lighten-1 white--text text-center max-0"
    >
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(item, i) in items"
            :key="i"
          >
            <v-btn text :to="item.route">
              <v-icon class="mr-2" color="#f4511e">{{ item.icon }}</v-icon>
              <span class="white--text">{{ item.title }}</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-row justify="center" class="ma-0">
        <v-col cols="12" sm="8" md="6" lg="5">
          <h2 class="text-center font-weight-bold mb-4">
            Welcome to Our Dormitory Website
          </h2>
          <p class="text-center">
            Join our growing community of universities and provide your students
            with the best-in-class accommodations. We are committed to offering
            a hassle-free experience, ensuring that your dormitories receive the
            attention they deserve. Get started today and empower your students
            to find their ideal living spaces on our university-focused
            dormitory website!
          </p>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: "mdi-home", title: "Home", route: "/" },
      { icon: "mdi-school", title: "University Listing", route: "/listings" },
      { icon: "mdi-domain", title: "List Your Place", route: "/signup" },
      { icon: "mdi-mail", title: "Contact Us", route: "/contact" },
      { icon: "mdi-lightbulb", title: "About Us", route: "/about" },
    ],
  }),
};
</script>

<style scoped>
</style>
