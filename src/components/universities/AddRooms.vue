<template>
  <v-row justify="center" class="pa-lg-5">
    <v-col cols="12" class="pa-lg-12">
      <v-card ref="form">
        <v-card-text class="pa-12">
          <v-layout>
            <v-flex class="make-grid pxa-7">
              <input type="hidden" ref="dormitory_id" value="" />
              <!-- Room Number input -->
              <v-text-field
                class="text-custom-class"
                ref="room_number"
                v-model="room_number"
                :rules="[() => !!room_number || 'This field is required']"
                :error-messages="errorMessages"
                label="Room Number"
                required
              ></v-text-field>
              <!-- Floor Name  input -->
              <v-text-field
                class="text-custom-class"
                ref="floor_name"
                v-model="floor_name"
                :rules="[() => !!floor_name || 'This field is required']"
                :error-messages="errorMessages"
                label="Floor Name"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
              <!-- Room type input -->
              <v-autocomplete
                class="text-custom-class"
                ref="room_type"
                v-model="room_type"
                :rules="[() => !!room_type || 'This field is required']"
                :items="types"
                :error-messages="errorMessages"
                placeholder="Select..."
                label="Types Of Rooms"
                required
              ></v-autocomplete>
              <!-- Capacity  Input -->
              <v-autocomplete
                class="text-custom-class"
                ref="capacity"
                v-model="capacity"
                :rules="[() => !!capacity || 'This field is required']"
                :error-messages="errorMessages"
                :items="capacities"
                label="Room Capacity"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <!-- Avilablity Status Input -->
              <v-autocomplete
                class="text-custom-class"
                ref="avilablity_status"
                v-model="avilablity_status"
                :rules="[() => !!avilablity_status || 'This field is required']"
                :error-messages="errorMessages"
                :items="stats"
                label="Room Availability"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <!-- Price Input -->
              <v-text-field
                class="text-custom-class"
                ref="monthly_rent"
                v-model="monthly_rent"
                :rules="[() => !!monthly_rent || 'This field is required']"
                :error-messages="errorMessages"
                label="Monthly Price"
                placeholder=" Rent Price"
                required
              ></v-text-field>
              <!-- Facilities Dropdown  -->
              <v-autocomplete
                class="text-custom-class"
                ref="facilities"
                facilities
                v-model="facilities"
                :rules="[() => !!facilities || 'This field is required']"
                :items="facilitiesArray"
                :error-messages="errorMessages"
                label="Facilities"
                multiple
                chips
                required
                attach
              ></v-autocomplete>
              <!--  Image file input -->
              <v-file-input
                class="text-custom-class"
                label="Rooms Profile Images"
                filled
                multiple
                prepend-icon="mdi-camera"
                ref="file"
                v-model="file"
                :rules="[rules.required, rules.size_value, rules.format]"
                accept="image/png, image/jpeg, image/bmp"
                :error-messages="errorMessages"
                placeholder=" Select Multiple Images"
              ></v-file-input>
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
          <v-btn color="#f4511e" text @click="submit"> Add Room</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { types, facilitiesData } from "@/components/utils/MiscellaneousUtils";
import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      types: types,
      floor_name: null,
      room_number: null,
      room_type: null,
      capacities: [1, 2, 3, 4, 6],
      capacity: null,
      stats: ["Available", "Not Available"],
      status: null,
      avilablity_status: null,
      monthly_rent: null,
      facilitiesArray: facilitiesData,
      formHasErrors: false,
      errorMessages: "",
      facilities: [],
      file: [],
      token: Cookies.get("token"),
      dormitory_id: Cookies.get("dorm_id"),
      rules: {
        // Validation rule for checking if a file is required
        required: (file) => {
          if (!file.length > 0) {
            // If the file array is empty, return an error message indicating that the field is required.
            return "'This field is required'";
          }
          // If the file array is not empty, return true to indicate that the validation passed.
          return true;
        },
        size_value: (file) => {
          // Validation rule for checking the size of the file(s)
          file.forEach((data) => {
            // Check each file in the file array and compare its size to 2 MB (2000 KB).
            if (data && data.size / (1024 * 1024) > 2000) {
              // If any file exceeds 2 MB, return an error message indicating that the avatar size should be less than 2 MB.
              return "Image size should be less than 2 MB!";
            }
          });
          // If all files pass the size check, return true to indicate that the validation passed.
          return true;
        },
        format: (file) => {
          // Validation rule for checking the file format
          let array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
          file.forEach((data) => {
            // Extract the file extension from the file name and convert it to lowercase.
            if (data && typeof data.name === "string") {
              let file_extension = data.name
                .slice(((data.name.lastIndexOf(".") - 1) >>> 0) + 2)
                .toLowerCase();
              // Check if the file extension is in the list of allowed file formats.
              if (!array_of_allowed_files.includes(file_extension)) {
                // If the file format is not allowed, return an error message indicating the allowed formats.
                return ` ${file_extension} is Invalid file format . Only JPG, JPEG, and PNG files are allowed.`; ///?????
              }
            }
          });
          // If all files have valid formats, return true to indicate that the validation passed.
          return true;
        },
      },
    };
  },
  computed: {
    form() {
      // ternary operation
      let available = this.avilablity_status === "Available" ? 1 : 0;
      return {
        room_number: this.room_number,
        floor_name: this.floor_name,
        room_type: this.room_type,
        capacity: this.capacity,
        avilablity_status: available,
        monthly_rent: this.monthly_rent,
        facilities: JSON.stringify(this.facilities),
        file: this.file,
        dormitory_id: this.dormitory_id,
      };
    },
    ...mapGetters([
      "getUniInfoData",
      "get_roomIsLoading",
      "get_roomsData",
      "get_roomsImageData",
      "get_dormDeleteIsLoading",
      "get_filterdData",
    ]),
  },

  watch: {
    form() {
      this.errorMessages = "";
    },
  },
  methods: {
    ...mapActions(["addRoom"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      // Iterate through the keys of the 'this.form' object (likely a Vue.js data object).
      Object.keys(this.form).forEach((f) => {
        // If the reference has a 'validate' function, call it with the argument 'true'.
        // This triggers the validation for the form element associated with the current key.
        this.$refs[f].validate(true);
        // After validating the form element, reset it to its initial state.
        // This is done using the 'reset' function available on the form element's reference.
        // It may be used to clear any validation messages or revert the form element's value to its initial state.
        if (this.$refs[f] && this.$refs[f].validate) {
          this.$refs[f].validate(true);
          this.$refs[f].reset();
        }
      });
    },
    async submit() {
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f] && this.form.dormitory_id == this.dormitory_id)
          // Check if the form field value is empty, and if so, set formHasErrors to true
          this.formHasErrors = true;
        // Check if the element has a validate function before calling it
        if (this.$refs[f] && this.$refs[f].validate) {
          // Call the validate function of the element to trigger the validation
          this.$refs[f].validate(true);
        }
      });
      if (this.token && this.formHasErrors === false) {
        try {
          let responsedata = await this.addRoom(this.form);
          responsedata;
          this.$root.$emit("new_room_added");
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