  <template>
  <v-carousel cycle hide-delimiters hide-arrows horizontal>
    <v-carousel-item v-for="n in 9" :key="n">
      <v-row>
        <v-col
          v-for="i in get_roomsImageData"
          :key="i"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :src="`i.blobUrl=${n * 5 + i * 2}`"
            :lazy-src="`i.blobUrl=${n * 5 + i * 2}`"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>



<script>
// import carouselNva from "@/components/utils/carouselNva.vue";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    // carouselNva,
  },

  computed: {
    ...mapGetters([
      "get_allRoomIsLoading",
      "get_allRoomsData",
      "get_roomsImageData",
      "get_dormDeleteIsLoading",
      "get_dormIsLoading",
      "get_dormData",
      "get_dormDeleteIsLoading",
      "get_dormImageData",
    ]),
    ...mapState([" roomsData"]),
  },
  methods: {
    getRoomImagesByRoomId(roomId) {
      if (roomId !== undefined && this.get_roomsImageData) {
        return this.get_roomsImageData[roomId];
      }
    },
  },
};
</script>
 
