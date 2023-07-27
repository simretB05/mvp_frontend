<template>
  <main>
    <uni-rooms></uni-rooms>
  </main>
</template>
  
  <script>
import UniRooms from "@/components/universities/UniRooms.vue";
export default {
  components: {
    UniRooms,
  },
};
</script>
  
  <style  scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>