<template>
  <v-container>
    <!-- Header section -->
    <v-row align="center" justify="space-between">
      <v-col>
        <h1>Welcome to our Home Page</h1>
      </v-col>
      <v-col> </v-col>
    </v-row>

    <!-- Statistics section -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Number of Users</v-card-title>
          <v-card-text class="display-1 text-center">{{
            numberOfUsers
          }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total Revenue</v-card-title>
          <v-card-text class="display-1 text-center">{{
            totalRevenue
          }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Page Views</v-card-title>
          <v-card-text class="display-1 text-center">{{
            pageViews
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Information section -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Latest News</v-card-title>
          <v-list>
            <v-list-item v-for="newsItem in latestNews" :key="newsItem.id">
              <v-list-item-content>
                <v-list-item-title>{{ newsItem.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ newsItem.date }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Contact Information</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ contactEmail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Phone</v-list-item-title>
                <v-list-item-subtitle>{{ contactPhone }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- Add more contact information if needed -->
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      numberOfUsers: 1000,
      totalRevenue: "$50,000",
      pageViews: 20000,
      latestNews: [
        { id: 1, title: "News 1", date: "2023-08-02" },
        { id: 2, title: "News 2", date: "2023-08-01" },
        // Add more news items here
      ],
      contactEmail: "info@example.com",
      contactPhone: "+1234567890",
      // Add more contact information here if needed
    };
  },
};
</script>
