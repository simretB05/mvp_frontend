<template>
  <v-row justify="center" class="pa-lg-5">
    <v-col cols="12" class="pa-lg-12">
      <v-card ref="form">
        <v-layout>
          <v-flex>
            <v-text-field
              class="text-custom-class"
              v-model="email"
              ref="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="text-custom-class"
              v-model="password"
              ref="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.password, rules.length(8)]"
              filled
              color="deep-purple"
              counter="8"
              label="Password"
              style="min-height: 96px"
              name="input-10-1"
              hint="At least 8 characters"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="resetForm"> Clear </v-btn>
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
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit"> LogIn </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import Cookies from "vue-cookies";
export default {
  data() {
    return {
      agreement: false,
      formHasErrors: false,
      errorMessages: "",
      show1: false,
      email: "contact@chovila.ca",
      password: "Password!1",
      universityInfo: undefined,
      universityId: undefined,
      rules: {
        password: (v) =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len || `Invalid character length, required `,
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
      };
    },
    // using ...Destructuring assignment to get values from the Getters

    ...mapGetters(["getUniData", "getIsLoading", "getError"]),
    getLoding() {
      return this.$store.state.isLoading;
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  methods: {
    ...mapActions(["logInUni"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    async submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      try {
        let responsedata = await this.logInUni(this.form);
        Cookies.set("responseData", responsedata);
        Cookies.set("university_id", responsedata[0][`id`]);
        Cookies.set("token", responsedata[0][`token`]);

        this.$root.$emit("universityLoggedIn", responsedata);

        this.$router.push(`/university-home`);
      } catch (error) {
        error;
      }
    },
  },

  mounted() {},
};
</script>
<style scoped>
.make-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.text-custom-class {
  padding: 10px;
  margin: 20px;
}
</style>