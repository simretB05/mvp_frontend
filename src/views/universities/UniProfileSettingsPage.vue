<template>
  <main>
    <UniProfileSettings></UniProfileSettings>
  </main>
</template>

<script>
import UniProfileSettings from "@/components/universities/UniProfileSettings.vue";
export default {
  components: {
    UniProfileSettings,
  },
};
</script>

<style  scoped>
main {
  min-height: 80vh;
}
</style>