<template>
  <div>
    <div>
      <v-btn
        style="font-size: 10px"
        color="orange"
        @click="show_rating_auth"
        text
      >
        Rate Now
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    show_rating_auth() {
      this.$root.$emit("show_ratings");
    },
  },
};
</script>

<style scoped>
</style>
