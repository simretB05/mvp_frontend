<template>
  <v-footer dark padless class="footer">
    <v-card
      flat
      tile
      color="#061e36"
      class="darken-4 lighten-1 white--text text-center max-0"
    >
      <v-container class="container">
        <v-layout row wrap justify-center>
          <v-flex cols="6">
            <v-row class="flex-row">
              <v-col
                class="flex-none"
                cols="12"
                v-for="(item, i) in items"
                :key="i"
                link
              >
                <v-list color="transparent" class="nav-list">
                  <v-list-item class="padding-none">
                    <v-list-item-icon cols="12" class="mrx-0 mx-0 px-0">
                      <v-icon class="mx-2" color="#f4511e">{{
                        item.icon
                      }}</v-icon>
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
      </v-container>
      <v-row justify="center">
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
      <v-divider></v-divider>

      <!-- <v-card-text class="white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text> -->
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    // links: ["Home", "Register", "About Us", "Blog", "Contact Us"],
    // icons: ["mdi-home", "mdi-account-plus", "mdi-school"],
    items: [
      { icon: "mdi-home", title: "Home", route: "/" },
      // { icon: "mdi-account-plus", title: "Register", route: "/Register" },
      { icon: "mdi-school", title: "University Listing", route: "/listings" },
      { icon: "mdi-domain", title: "List Your Place ", route: "/signup" },
      { icon: "mdi-mail", title: "Contact-Us", route: "/signup" },
      { icon: "mdi-lightbulb", title: "About-Us", route: "/signup" },
    ],
  }),
};
</script>

<style  scoped>
.container {
  margin: 0;
  width: 100%;
}

.my-5 {
  padding: 16px;
}

.flex-none {
  flex: 0;
  padding: 0;
}

.flex-row {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
}

.padding-none {
  padding: 0 !important;
}
.v-list {
  width: 100;
  display: grid;
  /* padding: 16px; */
}
.na .v-list-item-title {
  color: #072f1c;
  width: 100%;
}
</style>