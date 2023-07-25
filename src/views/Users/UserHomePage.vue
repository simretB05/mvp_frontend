<template>
  <div>
    <user-home-page></user-home-page>
  </div>
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
  margin: 36px;
}
</style>