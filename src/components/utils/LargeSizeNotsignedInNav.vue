<template>
  <v-layout row wrap justify-end>
    <v-flex flex cols="3">
      <v-row class="flex-row justify-end" wrap>
        <v-col class="col">
          <v-btn color="white" text class="mr-2">Login</v-btn>
          <v-btn color="white" outlined>create account</v-btn>
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

      items: [
        { icon: "mdi-mail", title: "Contact-Us", route: "/signup" },
        { icon: "mdi-lightbulb", title: "About-Us", route: "/signup" },
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
  display: flex;
  justify-content: flex-end;
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
.col {
  display: flex;
  justify-content: end;
}
</style>