<template>
  <div>
    <h2>home is here</h2>
  </div>
</template>

<script>
// import Cookies from "vue-cookies";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      id: undefined,
    };
  },

  computed: {
    ...mapGetters(["getIsLoading", "getUniData"]),
  },

  methods: {
    getData() {
      // console.log(this.getIsLoading);
      // if (this.getUniData) {
      //   console.log("this is data");
      //   console.log(this.getUniData[0]);
      //   let id = this.getUniData[0]["id"];
      //   Cookies.set("university_id", id);
      //   console.log(id);
      // } else {
      //   console.log("getUniData is either undefined or empty.");
      // }
    },
  },

  mounted() {
    // console.log("mounted from home");
    // this.getData();
  },
};
</script>

<style scoped>
</style>
