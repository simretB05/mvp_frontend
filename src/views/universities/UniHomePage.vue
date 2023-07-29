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
    getData() {},
  },

  mounted() {
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