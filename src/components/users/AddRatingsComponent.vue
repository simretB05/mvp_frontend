<template>
  <div class="authentication-card">
    <div class="card">
      <div class="card-header">
        <h4>
          Please provide your name and email address to receive a rating
          passcode. You can use the passcode to submit your feedback and rate
          our service. Thank you!
        </h4>
      </div>
      <div class="card-body">
        <div @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.username" required />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="formData.user_email"
              required
            />
          </div>

          <div class="maleda">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn-cancle" @click="cancel_ratings">
              Cancel
            </button>
          </div>
        </div>

        <div class="maleda">
          <!-- Google Sign-In Button -->
          <div class="google-sign-in">
            <div class="g-signin2" data-onsuccess="onGoogleSignIn">
              <button @click="signInWithGoogle" class="btn btn-google">
                Sign in with Google
              </button>
            </div>
          </div>
          <div class="google-sign-in">
            <button @click="signInWithGoogle" class="btn btn-google">
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        user_email: "",
      },
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      // Add code to submit the form data
    },
    cancel_ratings() {
      this.$root.$emit("cancle_rating");
    },
    signInWithGoogle() {
      // Use the VueGoogleOAuth2 plugin to initiate Google OAuth 2.0 authentication
      this.$gAuth
        .signIn()
        .then((user) => {
          // Handle successful authentication and user data here
          console.log(user);
        })
        .catch((error) => {
          // Handle authentication errors here
          console.error("Google Sign-In Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.authentication-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.card {
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
  background-color: rgb(244, 242, 239);
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto;
}
input {
  border: 1px solid #745a14a7;
  margin: 0 12px;
}
.card-header {
  background-color: hsl(27, 93%, 40%);
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
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-cancle {
  background-color: #6e4a0b;
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 8px;
}
.maleda {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}

.google-sign-in {
  margin-top: 20px;
  text-align: center;
}

.or-sign-up-with-google {
  margin-top: 10px;
  text-align: center;
}

.btn-google {
  background-color: #eaa211;
  color: rgb(49, 5, 5);
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
