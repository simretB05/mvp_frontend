<template>
  <main>
    <uni-home></uni-home>
  </main>
</template>

<script>
import UniHome from "@/components/universities/UniHome.vue";
// import Cookies from "vue-cookies";
import { mapGetters } from "vuex";
export default {
  components: {
    UniHome,
  },

  computed: {
    ...mapGetters(["getIsLoading", "getUniData"]),
  },

  methods: {
    getData() {
      // let responseData = this.getUniData;
      console.log(this.getUniData); // Corrected the typo: isLoading instead of isLoding

      console.log(this.getIsLoading); // Corrected the typo: isLoading instead of isLoding

      // console.log("this is data");
      // console.log(this.getUniData);
      // let id = this.getUniData[0]["id"];
      // Cookies.set("university_id", id);
      // console.log(id);
    },
  },

  mounted() {
    console.log("mounted from home");
    this.$on("submited", this.getData);
    this.getData();
  },
};
</script>

<style scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>