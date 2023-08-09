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
                :error-messages="errorMessages"
                label="Room Number"
                required
              ></v-text-field>
              <!-- Floor Name  input -->
              <v-text-field
                class="text-custom-class"
                ref="floor_name"
                v-model="floor_name"
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
                :items="facilitiesArray"
                :error-messages="errorMessages"
                label="Facilities"
                multiple
                chips
                required
                attach
              ></v-autocomplete>
              <!--  Image file input -->
              <v-list-item-title>
                Click and Pick Images to Update</v-list-item-title
              >
              <v-list class="custom-list">
                <v-list-item-group
                  max-width="400"
                  v-for="(image, index) in get_roomsImageByRoomId(room_id)"
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
                        <v-img :src="image.blobUrl" />
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
                      <editeroom-image-box
                        :imageId="imageId"
                      ></editeroom-image-box>
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
import { types, facilitiesData } from "@/components/utils/MiscellaneousUtils";
// import Cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
import EditeroomImageBox from "@/components/utils/EditeRoomImageBox.vue";
export default {
  components: {
    EditeroomImageBox,
  },
  props: {
    room_id: Number,
  },
  data() {
    return {
      editeImageDialog: false,
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
      imageId: undefined,
    };
  },
  computed: {
    form() {
      let available = this.avilablity_status === "Available" ? 1 : 0;
      return {
        id: this.room_id,
        room_number: this.room_number ? this.room_number : null,
        floor_name: this.floor_name ? this.floor_name : null,
        room_type: this.room_type ? this.room_type : null,
        capacity: this.capacity ? this.capacity : null,
        avilablity_status: available !== null ? available : null,
        monthly_rent: this.monthly_rent ? this.monthly_rent : null,
        facilities:
          this.facilities && this.facilities.length > 0
            ? JSON.stringify(this.facilities)
            : null,
        image_id: this.imageId ? this.imageId : null,
        file: this.file ? this.file : null,
      };
    },
    ...mapGetters(["getUniInfoData", "get_roomsImageData"]),
  },

  watch: {
    form() {
      this.errorMessages = "";
    },
  },
  methods: {
    ...mapActions(["addDormitory", "updatingRoom"]),

    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f]) {
          this.$refs[f].reset();
        }
      });
    },
    get_roomsImageByRoomId(roormId) {
      if (this.get_roomsImageData && roormId) {
        return this.get_roomsImageData[roormId];
      }
    },
    async submitUpdate() {
      this.formHasErrors = false;
      if (this.room_id) {
        try {
          let responsedata = await this.updatingRoom(this.form);
          responsedata;
          if (responsedata) {
            this.$root.$emit("close");
          }
        } catch (error) {
          error;
        }
      }
    },
    editeImage(imageId) {
      this.editeImageDialog = !this.editeImageDialog;
      this.imageId = imageId;
    },

    updateImage(image) {
      this.form.file = image.file;
      this.editeImageDialog = !this.editeImageDialog;
    },
  },
  mounted() {
    this.get_roomsImageByRoomId();
    this.$root.$on("image_update", this.updateImage);
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