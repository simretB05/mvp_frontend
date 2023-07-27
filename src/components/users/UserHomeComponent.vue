<template>
  <v-container>
    <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title primary class="headline">Card 1</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="image in card1Images" :key="image.id">
                <v-list-item-avatar>
                  <v-img :src="image.url" aspect-ratio="1"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  {{ image.name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title primary class="headline">Card 2</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="image in card2Images" :key="image.id">
                <v-list-item-avatar>
                  <v-img :src="image.url" aspect-ratio="1"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  {{ image.name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    <v-container>
      <v-card-title class="headline">Horizontal Sliding Cards</v-card-title>
      <v-card-text>
        <p>Check out the awesome cards below:</p>
      </v-card-text>
    <v-carousel cycle hide-delimiter-background>
      <v-carousel-item v-for="item in items" :key="item.id">
        <v-card class="mx-auto" max-width="300">
          <v-img :src="item.imageUrl" height="200"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
  <v-container>
      <v-card-title class="headline">Horizontal Sliding Cards</v-card-title>
      <v-card-text>
        <p>Check out the awesome cards below:</p>
      </v-card-text>
    <v-carousel cycle hide-delimiter-background>
      <v-carousel-item v-for="item in items" :key="item.id">
        <v-card class="mx-auto" max-width="300">
          <v-img :src="item.imageUrl" height="200"></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
    <v-layout> </v-layout>
  </v-container>
</template>
<script>
// import carouselNva from "@/components/utils/carouselNva.vue";
export default {
  components: {
    // carouselNva,
  },
  card1Images: [
        { id: 1, name: 'Image 1', url: 'path/to/image1.jpg' },
        { id: 2, name: 'Image 2', url: 'path/to/image2.jpg' },
        // Add more image objects as needed for Card 1
      ],
      card2Images: [
        { id: 1, name: 'Image A', url: 'path/to/imageA.jpg' },
        { id: 2, name: 'Image B', url: 'path/to/imageB.jpg' },
        // Add more image objects as needed for Card 2
      ],
      items: [
        {
          id: 1,
          imageUrl: 'path/to/image1.jpg',
          title: 'Card 1',
          description: 'Content for Card 1 goes here...',
        },
        {
          id: 2,
          imageUrl: 'path/to/image2.jpg',
          title: 'Card 2',
          description: 'Content for Card 2 goes here...',
        },
        // Add more card objects as needed
      ],
};
</script>

<style scoped>
.custom-container {
  /* width: 100%;
    min-height: 80vh;
    background-color: #030f1b */
}
</style>