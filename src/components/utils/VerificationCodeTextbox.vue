<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    overlay-color="rgba(0, 0, 0, 0.7)"
  >
    <v-card>
      <v-card-title class="text-h5">Enter Verification Code</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="verificationCode"
          :rules="[() => !!verificationCode || 'This field is required']"
          :error-messages="errorMessages"
          label="Verification Code"
          outlined
          dense
          style="color: #f35929"
          @keypress.enter="submitVerification"
        ></v-text-field>
        <v-btn
          class="ver-btn"
          style="color: white"
          color="#f35929"
          @click="submitVerification"
          >Verify</v-btn
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      verificationCode: undefined,
      formHasErrors: false,
      errorMessages: "",
    };
  },
  computed: {
    form() {
      return {
        verificationCode: this.verificationCode,
      };
    },
    ...mapGetters(["get_userVerifCode"]),
  },
  methods: {
    ...mapActions(["getVerification"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submitVerification() {},
    show_verify_box() {
      if (this.get_userVerifCode && this.get_userVerifCode.length > 0) {
        this.dialog = true;
      }
    },
  },
  mounted() {
    this.show_verify_box();
  },
};
</script>
<style scoped>
.ver-btn {
  width: 100px;
  border: none;
  border-radius: 25px;
  text-align: center;
  place-items: center;
  color: white;
  font-weight: 700;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  padding: 7px;
  margin-top: 20px;
  transition: background-color 0.5s ease;
  box-shadow: 0 1px 0 rgb(241, 143, 86);
}
.ver-btn:hover {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4);
}
.ver-btn:active {
  transform: translateY(3px);
  box-shadow: none;
}
</style>
