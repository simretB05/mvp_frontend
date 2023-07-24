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
                ref="city"
                v-model="city"
                :rules="[() => !!city || 'This field is required']"
                :items="cityData"
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
                :items="zipData"
                label="ZIP / Postal Code"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <!-- country input -->
              <v-text-field
                class="text-custom-class"
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                label="State/Province/Region"
                placeholder="Canada"
                required
              ></v-text-field>
              <!-- Facilities Dropdown  -->
              <v-autocomplete
                class="text-custom-class"
                ref="facilities"
                facilities
                v-model="facilities"
                :rules="[rules.required]"
                :items="facilitiesArray"
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
          <v-btn color="#f4511e" text @click="submit"> Submit </v-btn>
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
  facilitiesData,
} from "@/components/utils/MiscellaneousUtils";
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      country: "Canada",
      facilitiesArray: facilitiesData,
      formHasErrors: false,
      errorMessages: "",
      facilities: [],
      city: null,
      name: null,
      address: null,
      cityData: cities,
      state: "AB",
      zipData: zip_codes,
      zip: null,
      token: Cookies.get("token"),
      rules: {
        required: (facilities) => {
          if (!facilities.length <= 4) {
            return "This field is required ,4 Facilities are the minimum";
          }
          return true;
        },
      },
    };
  },
  computed: {
    form() {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
        facilities: JSON.stringify(this.facilities),
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
    ...mapActions(["addDormitory"]),

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
      if (this.token && this.formHasErrors === false) {
        try {
          let responsedata = await this.addDormitory(this.form, this.token);
          Cookies.set("responseData", responsedata);
          this.$root.$emit("new_dorm_added");
        } catch (error) {
          error;
        }
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