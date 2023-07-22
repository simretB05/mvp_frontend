<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center max-0">
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
      <v-card-text>
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>

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
  color: #12f0dd;
  width: 100%;
}
</style>