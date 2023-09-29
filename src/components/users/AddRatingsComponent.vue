<template>
  <div class="authentication-card">
    <div class="card">
      <div class="card-header">
        <h2>User Authentication</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <!-- Display the submitted data -->
    <div v-if="submitted" class="card">
      <div class="card-body">
        <h3>Submitted Data:</h3>
        <p>Name: {{ formData.name }}</p>
        <p>Email: {{ formData.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
      },
      submitted: false,
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>

<style scoped>
.authentication-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.card {
  width: 400px;
  border: 1px solid #da5151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
  background-color: rgb(244, 242, 239);
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
}

.card-header {
  background-color: #f4750d;
  color: white;
  padding: 10px;
  text-align: center;
}

.card-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  background-color: #f59e08;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
