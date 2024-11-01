<template>
  <section class="vs-contact-wrapper vs-contact-layout1 mt-5 space-md-bottom">
    <div class="container">
      <div class="row gx-60 align-items-center justify-content-center" style="background-color: rgb(243, 246, 247)">
        <div class="col-lg-6">
          <form @submit.prevent="handleSignup" class="ajax-contact form-wrap3 mb-30">
            <div class="form-title">
              <h3 class="h1 mb-5">Make Your Account!</h3>
            </div>
            <div class="form-group mb-15">
              <input
                type="text"
                class="form-control style3"
                name="f_name"
                id="f_name"
                placeholder="Enter Your Full Name"
                v-model="fullName"
                required
              />
            </div>
            <div class="form-group mb-15">
              <input
                type="email"
                class="form-control style3"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                v-model="email"
                required
              />
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>
            <div class="form-group mb-15 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control style3"
                name="password"
                id="password"
                placeholder="Enter Password"
                v-model="password"
                required
              />
              <i class="fal fa-lock"></i>
              <button type="button" class="btn-toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
            </div>
            <div class="form-btn pt-15">
              <button type="button" @click="generateStrongPassword" class="vs-btn" style="width: 100%; border-radius: 30px; margin-bottom: 10px;">
                Generate Strong Password
              </button>
              <button type="submit" class="vs-btn" style="width: 100%; border-radius: 30px;">Sign Up</button>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0 mt-3">Login as a Doctor</p>
              <p class="mb-0 mt-3">Forget Password</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2
import { auth } from '@/firebase'; // Adjust this import according to your Firebase setup
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      showPassword: false,
      fullName: '',
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    validatePassword(password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*]/.test(password);
      const minLength = password.length >= 8;

      return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && minLength;
    },
    async handleSignup() {
      this.emailError = '';
      this.passwordError = '';

      if (!this.validateEmail(this.email)) {
        this.emailError = 'Please enter a valid email address.';
        return;
      }

      if (!this.validatePassword(this.password)) {
        this.passwordError = 'Password must be at least 8 characters long and include upper and lower case letters, numbers, and special characters.';
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        console.log('User signed up successfully:', this.fullName, this.email);

        // Show success message with Swal
        await Swal.fire({
          title: 'Success!',
          text: 'Your account has been created successfully.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        // Optionally, redirect or reset the form
        this.resetForm();
      } catch (error) {
        console.error('Signup error:', error);
        this.passwordError = 'Failed to sign up. Please try again.';

        // Show error message with Swal
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to sign up. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }
    },
    resetForm() {
      this.fullName = '';
      this.email = '';
      this.password = '';
    },
    generateStrongPassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
      let password = '';
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.password = password;
    },
  },
};
</script>

<style scoped>
.position-relative {
  position: relative;
}

.btn-toggle-password {
  position: absolute;
  right: 15px; /* Adjusted for better spacing */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d; /* Change color as needed */
  z-index: 1; /* Ensure it is above the input */
}
</style>
