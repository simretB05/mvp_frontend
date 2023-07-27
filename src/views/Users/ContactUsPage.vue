<template>
  <div>
    <user-contact-us-page></user-contact-us-page>
  </div>
</template>

<script>
import UserContactUsPage from "@/components/users/UserContactUsPage.vue";
export default {
  components: {
    UserContactUsPage,
  },
};
</script>

<style scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>