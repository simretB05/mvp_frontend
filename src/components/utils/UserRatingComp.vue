<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    overlay-color="rgba(0, 0, 0, 0.7)"
  >
    <v-card>
      <div style="width: 80%; margin: 0 auto">
        <v-card-title style="color: #f35929" class="text-h6"
          >Provide Your Details and Share Your Rating Feedback</v-card-title
        >
        <v-card-text>
          <div class="text-center">
            <v-rating
              ref="rating"
              v-model="rating"
              background-color="orange"
              color="orange accent-4"
              dense
              half-increments
              hover
              size="28"
            >
            </v-rating>
          </div>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="User Name"
            outlined
            dense
            style="color: #f35929"
          ></v-text-field>
          <v-textarea
            ref="message"
            v-model="message"
            :rules="[() => !!message || 'This field is required']"
            :error-messages="errorMessages"
            label="Feedback Message"
            outlined
            dense
            style="color: #f35929"
          ></v-textarea>
          <div class="div-flex">
            <v-card-actions>
              <v-btn color="#f4511e" text @click="resetForm"> Clear </v-btn>
              <v-spacer></v-spacer>
              <v-slide-x-reverse-transition>
                <v-tooltip v-if="formHasErrors" left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      class="my-0"
                      v-bind="attrs"
                      @click="resetForm"
                      v-on="on"
                    >
                      <v-icon color="#f4511e">mdi-refresh</v-icon>
                    </v-btn>
                  </template>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
            </v-card-actions>
            <v-btn
              class="ver-btn"
              style="color: white"
              color="#f35929"
              @click="submitRating"
              >Save Rating</v-btn
            >
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: null,
      message: "",
      rating: 0,
      dialog: true,
      formHasErrors: false,
      errorMessages: "",
    };
  },
  computed: {
    form() {
      return {
        name: this.name,
        rating: this.rating,
        message: this.message,
      };
    },
    ...mapGetters(["get_userVerifCode"]),
  },
  methods: {
    ...mapActions(["sendUserRatingInfo"]),
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      // Iterate through the keys of the 'this.form' object
      Object.keys(this.form).forEach((f) => {
        // Check if the reference has a 'validate' function
        if (this.$refs[f] && this.$refs[f].validate) {
          // Call the 'validate' function with the argument 'false'
          this.$refs[f].validate(false);

          // After validating the form element, reset it to its initial state
          // using the 'reset' function available on the form element's reference
          this.$refs[f].reset();
        } else if (f === "message" && this.$refs[f]) {
          // Handle v-textarea separately
          this.$refs[f].$refs.input.reset();
        }
      });
    },

    async submitRating() {
      this.formHasErrors = false;
      console.log(this.form);
      Object.keys(this.form).forEach((f) => {
        // if (!this.form[f] && this.form.dormitory_id == this.dormitory_id)
        // Check if the form field value is empty, and if so, set formHasErrors to true
        this.formHasErrors = true;
        // Check if the element has a validate function before calling it
        if (this.$refs[f] && this.$refs[f].validate) {
          // Call the validate function of the element to trigger the validation
          this.$refs[f].validate(true);
        }
      });
      if (this.token && this.formHasErrors === true) {
        try {
          let responsedata = await this.sendUserRatingInfo(this.form);
          responsedata;
          this.$root.$emit("new_room_added");
        } catch (error) {
          error;
        }
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.div-flex {
  display: flex;
  justify-content: space-between;
}
</style>
