<!-- ReviewList.vue -->

<template>
  <div>
    <v-card-title
      style="color: #f35929; display: flex; justify-content: center"
      class="text-h5 text-center"
      >Verified Reviewers</v-card-title
    >
    <v-card class="mx-auto mt-4" max-width="100%">
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-if="reviews.length > 0">
          <v-list-item v-for="(review, i) in reviews" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{ review.username }}</v-list-item-title>
              <v-list-item-subtitle>{{
                review.user_email
              }}</v-list-item-subtitle>
              <p>{{ review.message }}</p>
              <v-list-item-subtitle>
                <v-rating
                  :tt="parseFloat(review.rating)"
                  background-color="yellow"
                  color="amber"
                  half-increments
                  readonly
                ></v-rating>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item v-else>
          <v-list-item-content>No reviews available.</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      reviews: [],
      tt: undefined,
    };
  },
  computed: {
    ...mapGetters(["get_all_reviews"]),
  },
  methods: {
    ...mapActions(["getAllRatings"]),

    async get_AllRating(details) {
      try {
        let responsedata = await this.getAllRatings();
        responsedata;
        let tg = details.attribute.get("tt");
        console.log(tg);

        if (responsedata) {
          console.log(this.get_all_reviews);

          this.reviews = responsedata;
          console.log(this.reviews);
          this.dialog === false;
        }
      } catch (error) {
        error;
        console.log(error);
      }
    },
  },
  mounted() {
    this.get_AllRating();
  },
};
</script>

<style scoped>
/* Center the title text */
.v-card-title.text-h5 {
  text-align: center;
}
.mx-auto .mt-4 {
  border: none;
  color: red;
}
/* Add custom styles as needed */
</style>
