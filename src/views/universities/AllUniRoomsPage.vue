<template>
  <main>
    <all-rooms></all-rooms>
  </main>
</template>

<script>
import AllRooms from "@/components/universities/AllRooms.vue";
export default {
  components: { AllRooms },
};
</script>

<style scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>