<template>
  <main>
    <uni-dormitories-vue></uni-dormitories-vue>
  </main>
</template>

<script>
import UniDormitoriesVue from "@/components/universities/UniDormitories.vue";
export default {
  components: {
    UniDormitoriesVue,
  },
};
</script>

<style  scoped>
main {
  min-height: 80vh;
}
</style>