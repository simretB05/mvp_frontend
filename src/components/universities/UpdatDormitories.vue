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
              <v-list-item-title>
                Click and Pick Images to Update</v-list-item-title
              >
              <v-list class="custom-list">
                <v-list-item-group
                  max-width="400"
                  v-for="(image, index) in getDormImagesByDormId(dorm_id)"
                  :key="index"
                >
                  <v-list-item style="flex-direction: row; padding: 0">
                    <v-btn
                      style="
                        height: 87px;
                        min-width: 99px;
                        width: 80px;
                        border-radius: 0;
                        margin: 5px;
                      "
                      @click="editeImage(image.id)"
                    >
                      <v-list-item-avatar
                        style="
                          height: 67px;
                          min-width: 80px;
                          width: 80px;
                          border-radius: 0;
                          display: flex;
                          justify-items: center;
                          align-items: center;
                          margin: 0;
                        "
                      >
                        <v-img :src="image.blobUrl" alt="dormitory image" />
                      </v-list-item-avatar>
                    </v-btn>
                  </v-list-item>
                </v-list-item-group>
                <v-dialog v-model="editeImageDialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="editeImageDialog = !editeImageDialog">
                        <v-icon color="#f4511e">mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <edite-image-box :imageId="image_id"></edite-image-box>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-list>
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
          <v-btn color="#f4511e" text @click="submitUpdate">
            Save Changes</v-btn
          >
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
import EditeImageBox from "@/components/utils/EditeImageBox.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    EditeImageBox,
  },
  props: {
    dorm_id: Number,
  },
  data() {
    return {
      src: undefined,
      editeImageDialog: false,
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
      file: undefined,
      token: Cookies.get("token"),
      image_id: undefined,
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
        file: this.file ? this.file : null,
        image_id: this.image_id ? this.image_id : null,
      };
    },
    ...mapGetters(["getUniInfoData", "get_dormImageData"]),
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
    getDormImagesByDormId(dormId) {
      if (this.get_dormImageData && dormId) {
        return this.get_dormImageData[dormId];
      }
    },
    async submitUpdate() {
      this.formHasErrors = false;
      if (this.form.state === null || this.form.country === null) {
        this.formHasErrors = true;
        this.$refs.state.validate(true);
        this.$refs.country.validate(true);
      }
      if (this.formHasErrors === false) {
        try {
          let responsedata = await this.updatingDormitory(this.form);
          responsedata;
          this.$root.$emit("close");
        } catch (error) {
          error;
        }
      }
    },
    editeImage(imageId) {
      this.editeImageDialog = !this.editeImageDialog;
      this.image_id = imageId;
    },

    updateImage(image) {
      this.file = image.file;
      this.editeImageDialog = !this.editeImageDialog;
    },
  },
  mounted() {
    this.getDormImagesByDormId();
    this.$root.$on("dorm_image_update", this.updateImage);
  },
};
</script>
<style scoped>
.make-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.v-avatar .v-list-item__avatar {
  height: 67px;
  min-width: 118px;
  width: 119px;
}
.v-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.text-custom-class {
  /* padding: 10px;
  margin: 20px; */
  width: 100%;
}
</style>