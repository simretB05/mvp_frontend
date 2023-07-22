<template>
  <main>
    <register-listngs></register-listngs>
  </main>
</template>

<script>
import RegisterListngs from "@/components/universities/RegisterListngs.vue";
export default {
  components: {
    RegisterListngs,
  },
};
</script>

<style  scoped>
main {
  min-height: 80vh;
}
</style>