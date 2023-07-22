<template>
  <v-row justify="center" class="pa-lg-5">
    <v-col cols="12" class="pa-lg-12">
      <v-card ref="form">
        <v-card-text class="pa-12">
          <v-layout>
            <v-flex class="make-grid pxa-7">
              <!-- dormitory name input -->
              <v-text-field
                class="text-custom-class"
                ref="dormName"
                v-model="dormName"
                :rules="[() => !!dormName || 'This field is required']"
                :error-messages="errorMessages"
                label="Dormitory Name"
                required
              ></v-text-field>
              <!-- dormitory address input -->
              <v-text-field
                class="text-custom-class"
                ref="dormAddress"
                v-model="dormAddress"
                :rules="[
                  () => !!dormAddress || 'This field is required',
                  () =>
                    (!!dormAddress && dormAddress.length <= 25) ||
                    'Address must be less than 25 characters',
                ]"
                label="Dormitory Address"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
              <!-- city input -->
              <v-autocomplete
                class="text-custom-class"
                ref="dormCity"
                v-model="dormCity"
                :rules="[() => !!dormCity || 'This field is required']"
                :items="city"
                placeholder="Select..."
                label="City"
                required
              ></v-autocomplete>
              <!-- State/Province/Region Input -->
              <v-text-field
                class="text-custom-class"
                ref="state"
                v-model="state"
                :rules="[() => !!dormState || 'This field is required']"
                label="State/Province/Region"
                placeholder="AB"
                required
              ></v-text-field>
              <!-- ZIP / Postal Code Input -->
              <v-text-field
                class="text-custom-class"
                ref="dormZip"
                v-model="dormZip"
                :rules="[() => !!dormZip || 'This field is required']"
                label="ZIP / Postal Code"
                required
              ></v-text-field>
              <!-- Country Input -->
              <v-text-field
                class="text-custom-class"
                ref="dormCountry"
                v-model="dormCountry"
                :rules="[() => !!dormCountry || 'This field is required']"
                label="Country"
                required
              ></v-text-field>
              <!-- Facilities Dropdown (Multiple Selection) -->
              <v-autocomplete
                class="text-custom-class"
                ref="dormFacilities"
                v-model="selectedFacilities"
                :items="facilities"
                label="Facilities"
                multiple
                chips
                required
                attach
              ></v-autocomplete>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <!-- Clear Button -->
          <v-btn text color="#f4511e" @click="clearForm">Clear</v-btn>
          <v-spacer></v-spacer>
          <!-- Add Button -->
          <v-btn color="#f4511e" text @click="submit">Add Dormitory</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
// import axios from "axios";
import {
  cities,
  zip_codes,
  facilities,
} from "@/components/utils/MiscellaneousUtils";
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      countries: ["Canada"],
      agreement: false,
      errorMessages: "",
      facilities: facilities,
      name: null,
      bio: null,
      formHasErrors: false,
      file: {},
      show1: false,
      email: "",
      address: null,
      city: cities,
      state: "AB",
      zip: zip_codes,
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
  grid-template-columns: 1fr;
}
.text-custom-class {
  /* padding: 10px;
  margin: 20px; */
  width: 100%;
}
</style>