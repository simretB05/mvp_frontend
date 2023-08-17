<template>
  <main>
    <uni-listings></uni-listings>
  </main>
</template>

<script>
import UniListings from "@/components/universities/UniListings.vue";
export default {
  components: {
    UniListings,
  },
};
</script>

<style scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>