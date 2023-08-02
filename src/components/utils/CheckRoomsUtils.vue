<template>
  <v-row>
    <v-col cols="12" sm="12" align-start>
      <div class="text-center">
        <div class="my-4">
          <v-btn
            small
            color="#061e36"
            dark
            @click="checkDormRooms"
            class="hide-on-xs-only"
          >
            <v-icon color="#f4511e">mdi-bed-empty</v-icon> Dorm Room Listing
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import Cookies from "vue-cookies";
export default {
  props: {
    dorm_id: Number,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    checkDormRooms() {
      if (this.dorm_id) {
        Cookies.set("dorm_id", this.dorm_id);
        this.$root.$emit("dorm_id", this.dorm_id);
        this.$router.push(`/rooms`);
      }
    },
  },
};
</script>

<style scoped>
</style>