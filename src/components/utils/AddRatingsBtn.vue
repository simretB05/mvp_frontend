<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          style="font-size: 10px"
          color="orange"
          @click="dialog = true"
          text
          class="white--text"
          >Rate Now
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5" style="color: #f4511e">
            Please provide your name and email address to receive a rating
            passcode!.
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  ref="username"
                  v-model="username"
                  :rules="[() => !!username || 'This field is required']"
                  :error-messages="errorMessages"
                  label="name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  class="text-custom-class"
                  v-model="user_email"
                  ref="user_email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      username: null,
      user_email: "",
      dialog: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],

      formHasErrors: false,
      errorMessages: "",
    };
  },
  computed: {
    form() {
      return {
        username: this.username,
        user_email: this.user_email,
      };
    },
    // ...mapGetters(["getUserRatingInfo"]),
  },

  // methods: {
  //   // show_rating_auth() {
  //   //   // this.$root.$emit("show_ratings");
  //   //   this.dialog = true;
  //   // },

  //   submit() {
  //     this.formHasErrors = false;
  //     Object.keys(this.form).forEach((f) => {
  //       if (!this.form[f]) this.formHasErrors = true;
  //       this.$refs[f].validate(true);
  //     });
  //   },
  // },
  methods: {
    ...mapActions(["getUserRatingInfo"]),

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
        this.dialog = false;
      });
      try {
        let responsedata = await this.getUserRatingInfo(this.form);
        responsedata;
      } catch (error) {
        error;
      }
    },
  },
};
</script>
<style scoped>
.authentication-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.white--text {
  margin: 10px;
}
.form-card {
  margin: 0 auto;
  display: grid;
  place-items: center;
}
.card {
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
  background-color: rgb(244, 242, 239);

  overflow: hidden;
  margin: 0 auto;
}
input {
  border: 1px solid #745a14a7;
  margin: 0 12px;
}
.card-header {
  color: hsl(27, 93%, 40%);
  padding: 10px;
  text-align: center;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #f59e08;
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
}
.btn-cancle {
  background-color: #6e4a0b;
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 8px;
}
.maleda {
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
}
.google-sign-in {
  margin-top: 20px;
  text-align: center;
}
.or-sign-up-with-google {
  margin-top: 10px;
  text-align: center;
}
.btn-google {
  background-color: #eaa211;
  color: rgb(49, 5, 5);
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
