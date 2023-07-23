<template>
  <v-container>
    <v-row wrap justify="center">
      <v-col cols="6" xs="12" class="d-flex align-center justify-center">
        <v-btn
          class="custom-btn"
          fab
          color="cyan accent-2"
          @click="dialog = !dialog"
        >
          Register
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <uni-sign-up-form></uni-sign-up-form>
              </v-col>
            </v-row>
          </v-container>
        </v-dialog>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-btn
          class="custom-btn"
          fab
          color="cyan accent-2"
          @click="dialog2 = !dialog2"
        >
          Log-in
        </v-btn>
        <v-dialog v-model="dialog2" max-width="500px">
          <v-container>
            <v-row justify="center">
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
  border-radius: 0;
}
.align-center {
  align-items: center;
  justify-content: center;
}
</style>