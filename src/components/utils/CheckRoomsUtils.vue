<template>
  <v-row>
    <v-col class="col" cols="12" sm="12" lg="7" align-center justify-center>
      <div class="text-center">
        <div class="custom-my">
          <v-btn
            small
            color="#061e36"
            dark
            @click="checkDormRooms(dorm_id)"
            class="hide-on-xs-only mx-3"
          >
            <v-icon color="#f4511e">mdi-bed-empty</v-icon> Dorm Room Listing
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import Cookies from "vue-cookies";
export default {
  props: {
    dorm_id: Number,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    checkDormRooms(dorm_id) {
      if (dorm_id) {
        Cookies.set("dorm_id", dorm_id);
        this.$root.$emit("dorm_id", dorm_id);
        this.$router.push(`/rooms`);
      }
    },
  },
};
</script>

<style scoped>
.col {
  justify-content: center;
  flex-wrap: wrap;
}
.custom-my {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}
</style>