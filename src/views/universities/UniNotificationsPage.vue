<template>
  <v-container>
    <!-- Notifications -->
    <v-card>
      <v-card-title>Notifications</v-card-title>
      <v-data-table
        :headers="notificationHeaders"
        :items="notifications"
        :search="searchNotifications"
      >
        <template v-slot>
          {{ new Date().toLocaleDateString() }}
        </template>
      </v-data-table>
    </v-card>

    <!-- Ratings -->
    <v-card>
      <v-card-title>Ratings</v-card-title>
      <v-data-table
        :headers="ratingHeaders"
        :items="universities"
        :search="searchUniversities"
      >
        <template v-slot>
          <v-chip v-if="item.approved" color="green" dark>Approved</v-chip>
          <v-chip v-else color="orange" dark>Pending Approval</v-chip>
        </template>
      </v-data-table>
    </v-card>

    <!-- Comments -->
    <v-card>
      <v-card-title>Comments</v-card-title>
      <v-data-table
        :headers="commentHeaders"
        :items="comments"
        :search="searchComments"
      >
        <template>
          <div v-if="item.approved">{{ comment }}</div>
          <div v-else>Pending Approval</div>
        </template>
        <template>
          <v-btn @click="approveComment(item)">Approve</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Repair Orders -->
    <v-card>
      <v-card-title>Repair Orders</v-card-title>
      <v-data-table
        :headers="repairOrderHeaders"
        :items="repairOrders"
        :search="searchRepairOrders"
      >
        <template v-slot> {{}} </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        // ... (previous notifications)
      ],
      universities: [
        {
          name: "University A",
          rating: 4,
          approved: true,
        },
        {
          name: "University B",
          rating: 3,
          approved: false,
        },
        // Add more universities as needed
      ],
      comments: [
        {
          comment: "This university is great!",
          approved: true,
        },
        {
          comment: "Not so good.",
          approved: false,
        },
        // Add more comments as needed
      ],
      repairOrders: [
        // ... (previous repair orders)
      ],
      notificationHeaders: [
        // ... (previous notification headers)
      ],
      ratingHeaders: [
        // ... (previous rating headers)
      ],
      commentHeaders: [
        { text: "Comment", value: "comment" },
        { text: "Status", value: "approved" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      repairOrderHeaders: [
        // ... (previous repair order headers)
      ],
      searchNotifications: "",
      searchUniversities: "",
      searchComments: "",
      searchRepairOrders: "",
    };
  },
  methods: {
    approveComment(comment) {
      // Implement the logic to approve the comment (e.g., make an API call).
      // For demonstration purposes, we'll simply toggle the 'approved' property.
      comment.approved = true;
    },
  },
};
</script>
<style  scoped>
main {
  min-height: 80vh;
}
</style> 