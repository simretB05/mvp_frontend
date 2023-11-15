<template>
  <div>
    <v-btn
      class="mx-2 white--text text--darken-1 font-weight-bold"
      :dormitory_id="dormitory_id"
      @click="routeToRoomListing"
      style="background-color: #f4511e"
      >Check Rooms</v-btn
    >
  </div>
</template>
  <script>
import Cookies from "vue-cookies";
export default {
  props: {
    dormitory_id: Number,
  },

  methods: {
    routeToRoomListing() {
      Cookies.set("dorm_from_user", this.dormitory_id);
      this.$router.push(`/uni-rooms-listing`);
    },
  },
  mounted() {
    console.log("this", this.dormitory_id);
  },
};
</script>
  
  
  <style scoped>
</style>