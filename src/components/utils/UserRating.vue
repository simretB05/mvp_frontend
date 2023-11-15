<template>
  <div class="text-center mt-5">
    <span class="black--text text--lighten-2 text-caption mr-2">
      Overall-rating ({{ rating }})
    </span>
    <v-rating
      v-model="rating"
      background-color="orange"
      color="yellow accent-4"
      dense
      half-increments
      hover
      size="18"
    >
    </v-rating>
    <AddRatingsBtn></AddRatingsBtn>
  </div>
</template>
  <script>
import AddRatingsBtn from "@/components/utils/AddRatingsBtn.vue";

export default {
  components: {
    AddRatingsBtn,
  },
  data() {
    return {
      rating: 4.5,
    };
  },
};
</script>
  
  <style scoped>
</style>