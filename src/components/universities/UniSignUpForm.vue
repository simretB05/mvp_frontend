<template>
  <v-row justify="center" class="pa-lg-5">
    <v-col cols="12" class="pa-lg-12">
      <v-card ref="form">
        <v-card-text class="pa-12">
          <v-layout>
            <v-flex class="make-grid pxa-7">
              <!-- name input -->
              <v-text-field
                class="text-custom-class"
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                :error-messages="errorMessages"
                label=" University Name"
                placeholder="name"
                required
              ></v-text-field>
              <!-- bio input -->
              <v-textarea
                class="text-custom-class"
                v-model="bio"
                ref="bio"
                :rules="[() => !!bio || 'This field is required']"
                :error-messages="errorMessages"
                required
                auto-grow
                filled
                color="deep-purple"
                label="Bio"
                rows="6"
              ></v-textarea>
              <!-- website input -->
              <v-text-field
                class="text-custom-class"
                v-model="website"
                ref="website"
                :rules="websiteRules"
                label="University Website"
                :error-messages="errorMessages"
                required
              ></v-text-field>
              <!-- address input -->
              <v-text-field
                class="text-custom-class"
                ref="address"
                v-model="address"
                :rules="[
                  () => !!address || 'This field is required',
                  () =>
                    (!!address && address.length <= 25) ||
                    'Address must be less than 25 characters',
                  addressCheck,
                ]"
                label="Address Line"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
              <!-- city input -->
              <v-autocomplete
                class="text-custom-class"
                ref="city"
                v-model="city"
                :rules="[
                  () => !!city || 'This field is required',
                  addressCheck,
                ]"
                :items="cities"
                label="City"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <!-- State/Province/Region Input -->
              <v-text-field
                class="text-custom-class"
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                required
                placeholder="AB"
              ></v-text-field>
              <!-- ZIP / Postal Code Input -->
              <v-autocomplete
                class="text-custom-class"
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                :items="zips"
                label="ZIP / Postal Code"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <v-autocomplete
                class="text-custom-class"
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <v-file-input
                class="text-custom-class"
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
                class="text-custom-class"
                v-model="phone_number"
                ref="phone_number"
                :rules="phoneNumberRules"
                label="Phone Number"
                required
              ></v-text-field>
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
              <v-checkbox
                v-model="agreement"
                :rules="[rules.required]"
                color="deep-purple"
              >
                <template v-slot:label>
                  I agree to the&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true"
                    >Terms of Service</a
                  >
                  &nbsp;and&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true"
                    >Privacy Policy</a
                  >*
                </template>
              </v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
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
          <v-btn color="primary" text @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
  <script>
// import axios from "axios";
import { cities, zip_codes } from "@/components/utils/MiscellaneousUtils";
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      cities: cities,
      countries: ["Canada"],
      zips: zip_codes,
      agreement: false,
      errorMessages: "",
      name: null,
      bio: null,
      formHasErrors: false,
      file: {},
      show1: false,
      email: "",
      address: null,
      city: null,
      state: "AB",
      zip: null,
      country: null,
      password: "Password",
      phone_number: null,
      description: "Image",
      website: "",
      rules: {
        required: (file) => {
          if (!file) {
            return "'This field is required'";
          }
          return true;
        },
        min: (v) => v.length >= 8 || "Min 8 characters",
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
      websiteRules: [
        (v) => !!v || " Uiniversity Website is required",
        (v) => /.+.ca.+/.test(v) || "Uiniversity Website must be valid",
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
        name: this.name,
        bio: this.bio,
        file: this.file,
        address: this.address,
        city: this.city,
        website: this.website,
        phone_number: this.phone_number,
        state: this.state,
        zip: this.zip,
        country: this.country,
        email: this.email,
        password: this.password,
      };
    },
    ...mapGetters(["getUniInfoData"]),
  },

  watch: {
    form() {
      this.errorMessages = "";
    },
  },

  methods: {
    ...mapActions(["signUpUni"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    addressCheck() {
      this.errorMessages =
        this.address && !this.name ? `Hey! I'm required` : "";

      return true;
    },
    async submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
      try {
        let responsedata = await this.signUpUni(this.form);
        Cookies.set("responseData", responsedata);
        let university_id = responsedata[0][`id`];
        Cookies.set("university_id", university_id);
        this.$root.$emit("universityLoggedIn", responsedata);
        this.$router.push(`/university-home`);
      } catch (error) {
        error;
      }
    },
  },
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