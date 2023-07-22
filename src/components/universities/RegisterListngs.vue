<template>
  <v-container>
    <v-row wrap>
      <v-col cols="6" xs="12" class="d-flex align-center justify-center">
        <v-card width="50%" color="blue" dark>
          <v-btn
            class="custom-btn"
            fab
            color="cyan accent-2"
            bottom
            left
            absolute
            @click="dialog = !dialog"
            >Register</v-btn
          >
          <v-dialog v-model="dialog" max-width="500px"
            ><uni-sign-up-form></uni-sign-up-form>
          </v-dialog>
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-card width="50%" color="blue" dark>
          <v-btn
            class="custom-btn"
            fab
            color="cyan accent-2"
            bottom
            left
            absolute
            @click="dialog2 = !dialog2"
            >Log-in</v-btn
          >
          <v-dialog v-model="dialog2" max-width="500px"
            ><uni-log-in></uni-log-in>
          </v-dialog>
        </v-card>
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
/* .row {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  width: 50%;
} */
/* .custon-row {
  display: grid;
  place-items: center;
} */
.align-center {
  align-items: center;
  justify-content: center;
}
</style>