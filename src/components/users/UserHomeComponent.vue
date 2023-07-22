<template>
  <v-container>
    <carousel-nva></carousel-nva>
    <v-layout> </v-layout>
  </v-container>
</template>
<script>
import carouselNva from "@/components/utils/carouselNva.vue";
export default {
  components: {
    carouselNva,
  },
};
</script>

<style scoped>
.custom-container {
  /* width: 100%;
    min-height: 80vh;
    background-color: #030f1b */
}
</style>