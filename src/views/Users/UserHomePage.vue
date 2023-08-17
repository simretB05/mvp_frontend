<template>
  <main>
    <user-home-page></user-home-page>
  </main>
</template>

<script>
import UserHomePage from "@/components/users/UserHomeComponent.vue";

export default {
  components: {
    UserHomePage,
  },
};
</script>

<style scoped>
main {
  min-height: 80vh;
}
</style>