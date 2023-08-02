<template>
  <v-container>
    <!-- Welcome Message -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Welcome to our Website!</h1>
        <p>
          If you are an existing user, please log in below. If you are new here,
          feel free to register and join us!
        </p>
      </v-col>
    </v-row>
    <!-- Action Buttons -->
    <v-row wrap justify="center">
      <v-col cols="12" sm="12" class="d-flex align-center justify-center">
        <v-btn
          class="custom-btn"
          color="#f4511e"
          dark
          @click="dialog = !dialog"
        >
          Register
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px" color="white">
          <v-container>
            <v-row justify="center">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                  <v-icon color="#ffffff">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-col cols="12">
                <uni-sign-up-form></uni-sign-up-form>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
      </v-col>
      <v-col cols="12" sm="12" class="d-flex align-center justify-center">
        <v-btn
          class="custom-btn"
          color="#f4511e"
          dark
          @click="dialog2 = !dialog2"
        >
          Log-in
        </v-btn>
        <v-dialog v-model="dialog2" max-width="500px" color="#8aaae5">
          <v-container color="#8aaae5">
            <v-row justify="center">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog2 = false">
                  <v-icon color="#ffffff">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-col cols="12">
                <uni-log-in></uni-log-in>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
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
.custom-btn {
  width: 200px;
  border-radius: 8px;
  font-size: 16px;
  padding: 10px 16px;
  margin: 8px;
}
.align-center {
  align-items: center;
  justify-content: center;
}
</style>
