<template>
  <main>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title class="headline">Card 1</v-card-title>
            <v-card-text> Content for Card 1 goes here... </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-card-title class="headline">Card 2</v-card-title>
            <v-card-text> Content for Card 2 goes here... </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Divider -->
      <v-divider class="my-4"></v-divider>

      <!-- You can add more content below the divider if needed -->
    </v-container>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
main {
  min-height: 80vh;
  margin: 36px;
}
</style>