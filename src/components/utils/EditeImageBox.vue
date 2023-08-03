<template>
  <v-row justify="center" class="pa-lg-5">
    <v-col cols="12" class="pa-lg-12">
      <v-card ref="form">
        <v-card-text class="pa-12">
          <v-layout>
            <v-flex class="make-grid pxa-7">
              <!--  Image file input -->
              <v-file-input
                class="text-custom-class"
                label="Dormitory Profile Image"
                filled
                prepend-icon="mdi-camera"
                ref="file"
                v-model="file"
                :rules="[
                  rulesImages.required,
                  rulesImages.size_value,
                  rulesImages.format,
                ]"
                accept="image/png, image/jpeg, image/bmp"
                :error-messages="errorMessages"
                placeholder=" Select Image"
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
              {{ imageId }}
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="#f4511e" text @click="save"> Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    imageId: Number,
  },
  data() {
    return {
      file: {},
      errorMessages: "",
      formHasErrors: false,
      rulesImages: {
        required: (file) => {
          if (!file) {
            return "'This field is required'";
          }
          return true;
        },
        size_value: (file) => {
          if (file && file.size / (1024 * 1024) > 2000) {
            return "Image size should be less than 2 MB!";
          }

          return true;
        },
        format: (file) => {
          let array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];

          if (file && typeof file.name === "string") {
            let file_extension = file.name
              .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
              .toLowerCase();
            if (!array_of_allowed_files.includes(file_extension)) {
              return ` ${file_extension} is Invalid file format . Only JPG, JPEG, and PNG files are allowed.`; ///?????
            }
          }

          return true;
        },
      },
    };
  },
  computed: {
    form() {
      return {
        file: this.file,
        id: this.imageId,
      };
    },
  },
  watch: {
    form() {
      this.errorMessages = "";
    },
  },
  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      if (this.$refs.file && this.formHasErrors === false) {
        this.$refs.file.reset();
      }
    },
    save() {
      this.formHasErrors = false;
      if (this.$refs.file && this.formHasErrors === true) {
        this.$refs.file.validate(true);
      } else {
        this.$root.$emit("image_update", this.form);
        console.log(this.imageId);
        this.$toast.success("Successfully saved image", {
          timeout: 2000,
        });
      }
    },
  },
};
</script>
