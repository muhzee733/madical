<template>
  <section class="vs-contact-wrapper vs-contact-layout1 mt-5 space-md-bottom">
    <div class="container">
      <div
        class="row gx-60 align-items-center justify-content-center"
        style="background-color: rgb(243, 246, 247)"
      >
        <div class="col-lg-6">
          <form @submit.prevent="handleLogin" class="ajax-contact form-wrap3 mb-30">
            <div class="form-title">
              <h3 class="h1 mb-5">Nice to see you again</h3>
            </div>
            <div class="form-group mb-15">
              <input
                type="email"
                class="form-control style3"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                required
              />
              <i class="bi bi-envelope"></i>
            </div>
            <div class="form-group mb-15 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control style3"
                name="password"
                id="password"
                placeholder="Enter Password"
                required
              />
              <i class="bi bi-lock"></i>
              <button type="button" class="btn-toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>

            <div class="form-btn pt-15">
              <button type="submit" class="vs-btn" style="width: 100%; border-radius: 30px">
                Login
              </button>
            </div>
            <div class="d-flex align-items-center justify-content-between mt-3">
              <router-link to="/signup" class="mb-0">Sign Up Here</router-link>
              <router-link to="/forgot-password" class="mb-0">Forget Password</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    handleLogin() {
      // Implement your login logic here
      console.log('Logging in with:', {
        email: this.$refs.email.value,
        password: this.$refs.password.value
      })
    }
  }
}
</script>

<style scoped>
.position-relative {
  position: relative;
}

.btn-toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d; /* Change color as needed */
}
</style>
