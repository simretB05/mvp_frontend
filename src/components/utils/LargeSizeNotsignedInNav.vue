<template>
  <v-layout row wrap justify-end>
    <v-flex flex cols="3">
      <v-row class="flex-row justify-end" wrap>
        <v-col class="col">
          <v-btn color="white" text @click="dialog2 = !dialog2"
            >Login <v-icon color="#f4511e">mdi-login</v-icon></v-btn
          >
          <v-btn color="white" outlined text @click="dialog = !dialog">
            <v-icon color="#f4511e">mdi-account</v-icon>create account</v-btn
          >
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <uni-sign-up-form></uni-sign-up-form>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog2 = false">
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <uni-log-in></uni-log-in>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import UniSignUpForm from "@/components/universities/UniSignUpForm.vue";
import UniLogIn from "@/components/universities/UniLogIn.vue";

export default {
  components: {
    UniSignUpForm,
    UniLogIn,
  },
  data() {
    return {
      dialog: false,
      dialog2: false,
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