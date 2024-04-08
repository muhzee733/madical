<template>
  <header class="header-wrapper header-layout1">
    <!-- Header Top -->
    <div class="header-top bg-title py-4 d-none d-md-block">
      <div class="container container-style1 py-1">
        <div class="row justify-content-center justify-content-xl-between">
          <div class="col-12">
          </div>
        </div>
      </div>
    </div>
    <!-- Sticky Active -->
    <div class="sticky-wrap">
      <div class="sticky-active">
        <!-- Header Main -->
        <div class="header-main">
          <div class="container container-style1 position-relative">
            <div class="row align-items-center justify-content-between">
              <div class="col-xl-2">
                <div class="header1-logo py-2">
                  <img src="@/assets/img/Final-Final-Logo-1.png" width="100%" />
                </div>
              </div>
              <div class="col-xl-6 text-end text-lg-center justify-content-end">
                <nav class="main-menu menu-style1 d-none d-lg-block">
                  <ul style="text-align: right">
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
              <div class="col-xl-4 gap-3 d-none d-lg-flex justify-content-end">
                <router-link to="/pre-screenings" class="vs-btn yellow-color">Start Questionnaire</router-link>
                <router-link to="/login" class="vs-btn ">Patient Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
