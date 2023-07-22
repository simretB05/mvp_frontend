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
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                :error-messages="errorMessages"
                label="Dormitory Name"
                required
              ></v-text-field>
              <!-- dormitory address input -->
              <v-text-field
                class="text-custom-class"
                ref="address"
                v-model="address"
                :rules="[
                  () => !!address || 'This field is required',
                  () =>
                    (!!address && address.length <= 25) ||
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
                v-model="city"
                :rules="[() => !city || 'This field is required']"
                :items="city"
                placeholder="Select..."
                label="City"
                required
              ></v-autocomplete>
              <!-- state/province/region input -->
              <v-text-field
                class="text-custom-class"
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                placeholder="AB"
                required
              ></v-text-field>
              <!-- zip / postal code input -->
              <v-autocomplete
                class="text-custom-class"
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                :items="zip"
                label="ZIP / Postal Code"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <!-- country input -->
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
              <!-- Facilities Dropdown  -->
              <v-autocomplete
                class="text-custom-class"
                ref="dormFacilities"
                v-model="dormFacilities"
                :rules="[() => !!dormFacilities || 'This field is required ']"
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
      selectedFacilities: [],
      formHasErrors: false,
      errorMessages: "",
      facilities: facilities,
      name: null,
      address: null,
      city: cities,
      state: "AB",
      zip: zip_codes,
      rules: {},
    };
  },
  computed: {
    form() {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        website: this.website,
        state: this.state,
        zip: this.zip,
        country: this.country,
        facilities: this.selectedFacilities,
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