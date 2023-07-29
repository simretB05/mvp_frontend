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
    getData() {},
  },

  mounted() {},
};
</script>

<style scoped>
</style>
