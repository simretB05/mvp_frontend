<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'This field is required']"
            :error-messages="errorMessages"
            label="User Name"
            placeholder="user Name"
            required
          ></v-text-field>
          <v-text-field
            ref="first_name"
            v-model="first_name"
            :rules="[() => !!first_name || 'This field is required']"
            :error-messages="errorMessages"
            label="First Name"
            placeholder="name"
            required
          ></v-text-field>
          <v-text-field
            ref="last_name"
            v-model="last_name"
            :rules="[() => !!last_name || 'This field is required']"
            :error-messages="errorMessages"
            label="last Name"
            placeholder="name"
            required
          >
          </v-text-field>
          <v-file-input
            label="Your Profile Image"
            filled
            prepend-icon="mdi-camera"
            ref="file"
            v-model="file"
            :rules="[rules.required, rules.size_value, rules.format]"
            accept="image/png, image/jpeg, image/bmp"
            :error-messages="errorMessages"
            placeholder="Image"
          ></v-file-input>
          <v-text-field
            v-model="phone_number"
            ref="phone_number"
            :rules="phoneNumberRules"
            label="Phone Number"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            ref="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            ref="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text> Cancel </v-btn>
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
          <v-btn color="primary" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import Cookies from "vue-cookies";
export default {
  data() {
    return {
      cities: ["Calgary", "Toronto", "Vancouver"],
      errorMessages: "",
      username: null,
      first_name: null,
      last_name: null,
      formHasErrors: false,
      file: {},
      show1: false,
      email: "",
      password: "Password",
      phone_number: null,
      description: "Image",
      rules: {
        required: (file) => {
          if (!file) {
            return "'This field is required'";
          }
          return true;
        },
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
        size_value: (file) => {
          if (file && file.size / (1024 * 1024) > 2000) {
            return "Avatar size should be less than 2 MB!";
          }
          return true;
        },
        format: (file) => {
          if (file && typeof file.name === "string") {
            let array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
            let file_extension = file.name.slice(
              ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
            );
            if (!array_of_allowed_files.includes(file_extension)) {
              return ` ${file_extension} is Invalid file format . Only JPG, JPEG, and PNG files are allowed.`;
            }
          }
          return true;
        },
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
      phoneNumberRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^\d{10}$/.test(v) || "Invalid phone number format",
      ],
    };
  },
  computed: {
    form() {
      return {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        email: this.email,
        password: this.password,
        file: this.file,
      };
    },
  },

  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
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