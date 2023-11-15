<template>
  <div>
    <v-dialog cols="12" v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="font-size: 10px"
          color="orange"
          @click="dialog = true"
          text
          class="white--text"
          v-bind="attrs"
          v-on="on"
        >
          Rate Now
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-col cols="12">
            <div>
              <span class="text-h5 card-header">
                <h4 style="color: #f4511e">
                  Please provide your name and email address to receive a rating
                  passcode!.
                </h4>
                <small style="font-size: 1rem; color: white">
                  Use the passcode to submit your rating of the dorm rooms.
                  Thank you!
                </small>
              </span>
            </div>
          </v-col>
        </v-card-title>
        <div ref="form">
          <v-card-text>
            <div style="width: 100%">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    :rules="[() => !!username || 'This field is required']"
                    :error-messages="errorMessages"
                    label="name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="email"
                    ref="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn color="orange darken-1" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-btn color="orange darken-1" text @click="submit">
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-col>
                <v-col cols="12">
                  <div class="maleda">
                    <!-- Google Sign-In Button -->
                    <div class="google-sign-in">
                      <div class="g-signin2" data-onsuccess="onGoogleSignIn">
                        <button
                          @click="signInWithGoogle"
                          class="btn btn-google"
                        >
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                    <div class="google-sign-in">
                      <button @click="signInWithGoogle" class="btn btn-google">
                        Sign Up with Google
                      </button>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <small>*indicates required field</small>
          </v-card-text>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  components: {},
  data() {
    return {
      username: null,
      email: "",
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
        email: this.email,
      };
    },
  },

  methods: {
    // show_rating_auth() {
    //   // this.$root.$emit("show_ratings");
    //   this.dialog = true;
    // },
    submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_URL}/api/user`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          method: `POST`,
          data: this.form,
        })
        .then((response) => {
          Cookies.set(`token`, response[`data`][0][`token`]);
          this.$toast.success("Successfully Signed Up", {
            position: "top-right",
            timeout: 2000,
          });
          // Cookies.set(`client_id`, response[`data`][0][`id`]);
          // this.$router.push(`/`);
        })
        .catch((error) => {
          error;
        });
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
