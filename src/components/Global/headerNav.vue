<template>
  <header class="header-wrapper header-layout1">
    <!-- Header Top -->
    <div class="header-top bg-title py-2 d-none d-md-block">
      <div class="container container-style1 py-1">
        <div class="row justify-content-center justify-content-xl-between">
          <div class="col-12">
            <ul
              class="header-top-info d-flex align-items-center justify-content-center list-unstyled m-0"
            >
              <li><img src="@/assets/img/leave.svg" />Initial consults now $59</li>
              <li><img src="@/assets/img/leave.svg" />No referral required</li>
              <li><img src="@/assets/img/leave.svg" />Australia-wide treatments</li>
              <li><img src="@/assets/img/leave.svg" />Delivered to your door</li>
            </ul>
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
                      <router-link to="/medical-certificate">medical certificate</router-link>
                    </li>
                    <li>
                      <a href="about.html">Pricing</a>
                    </li>
                    <li>
                      <a href="service.html">FAQs</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-xl-4 gap-3 d-none d-lg-flex">
                <router-link to="/pre-screenings" class="vs-btn">Start questionnaire</router-link>
                <router-link to="/login" class="vs-btn">Patient Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
