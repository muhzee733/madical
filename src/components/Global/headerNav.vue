<template>
  <header class="header-wrapper">
    <div class="header-top bg-title py-4 d-none d-md-block">
      <div class="container container-style1 py-1">
        <div class="row justify-content-center justify-content-xl-between">
          <div class="col-12"></div>
        </div>
      </div>
    </div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <!-- Logo -->
        <div class="row">
          <div class="col-lg-2 col-md-12 d-flex align-content-center justify-content-between">
            <router-link class="navbar-brand" to="/">
              <img src="@/assets/img/Final-Final-Logo-1.png" width="100%" alt="Logo" class="mobile-menu"/>
            </router-link>
            <!-- Hamburger Icon -->
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="col-lg-10 col-md-12 d-flex align-content-center">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <!-- Existing Content -->
              <div class="container container-style1 position-relative">
                <div class="row align-items-center justify-content-between justify-content-md-end">
                  <div class="col-xl-8 col-md-8 text-end text-lg-center justify-content-end">
                    <nav class="main-menu menu-style1">
                      <ul style="text-align: right" class="burger-menu">
                        <li class="mega-menu-wrap">
                          <router-link to="/medical-certificate">Medical Certificate</router-link>
                        </li>
                        <li>
                          <a href="blog.html">How It Works</a>
                        </li>
                        <li>
                          <a href="about.html">Pricing</a>
                        </li>
                        <li>
                          <a href="blog.html">About Us</a>
                        </li>
                        <li>
                          <a href="service.html">FAQs</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div class="col-xl-4 col-md-4 gap-3  d-lg-flex justify-content-end custom-button">
                    <router-link to="/pre-screenings" class="vs-btn yellow-color"
                      >Start Questionnaire</router-link>
                    <router-link to="/login" class="vs-btn">Patient Login</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
