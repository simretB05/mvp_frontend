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
                label="Dormitory Name"
              ></v-text-field>
              <!-- dormitory address input -->
              <v-text-field
                class="text-custom-class"
                ref="address"
                v-model="address"
                label="Dormitory Address"
                placeholder="Snowy Rock Pl"
                counter="25"
              ></v-text-field>
              <!-- city input -->
              <v-autocomplete
                class="text-custom-class"
                ref="city"
                v-model="city"
                :items="cityData"
                placeholder="Select..."
                label="City"
              ></v-autocomplete>
              <!-- state/province/region input -->
              <v-autocomplete
                class="text-custom-class"
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                :items="states"
                placeholder="AB"
              ></v-autocomplete>
              <!-- zip / postal code input -->
              <v-autocomplete
                class="text-custom-class"
                ref="zip"
                v-model="zip"
                :items="zipData"
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
                placeholder="Canada"
                required
              ></v-autocomplete>
              <!-- Facilities Dropdown  -->
              <v-autocomplete
                class="text-custom-class"
                ref="facilities"
                facilities
                v-model="facilities"
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
          <v-btn color="#f4511e" text @click="submitUpdate"> Submit </v-btn>
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
  props: {
    dorm_id: Number,
  },
  data() {
    return {
      countries: ["Canada"],
      country: null,
      facilitiesArray: facilitiesData,
      formHasErrors: false,
      errorMessages: "",
      facilities: [],
      city: null,
      name: null,
      address: null,
      cityData: cities,
      state: null,
      states: ["AB"],
      zipData: zip_codes,
      zip: null,
      token: Cookies.get("token"),
    };
  },
  computed: {
    form() {
      return {
        id: this.dorm_id,
        name: this.name ? this.name : null,
        address: this.address ? this.address : null,
        city: this.city ? this.city : null,
        state: this.state,
        zip: this.zip ? this.zip : null,
        country: this.country,
        facilities:
          this.facilities && this.facilities.length > 0
            ? JSON.stringify(this.facilities)
            : null,
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
    ...mapActions(["addDormitory", "updatingDormitory"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f]) {
          this.$refs[f].reset();
        }
      });
    },
    async submitUpdate() {
      this.formHasErrors = false;
      if (this.form.state === null || this.form.country === null) {
        this.formHasErrors = true;
        this.$refs.state.validate(true);
        this.$refs.country.validate(true);
      }
      if (this.dorm_id && this.formHasErrors === false) {
        try {
          let responsedata = await this.updatingDormitory(this.form);
          responsedata;
          this.$root.$emit("close");
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