<template>
  <section class="category-section">
    <div class="container">
      <div class="row">
        <h2 class="text-center gray-color">Categories</h2>
        <div class="category-container">
          <div class="row">
            <div class="col-lg-5 col-sm-5 section">
              <div class="box-container text-center">
                <img src="@/assets/img/person-1.png" />
                <h4>Online</h4>
                <h3 class="m-0">Medical Certificate</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="https://frazmedicall.com.au/" class="vs-btn white-color">Get Certificate Now</a>

              </div>
            </div>
            <div class="col-lg-2 col-sm-2"></div>
            <div class="col-lg-5 col-sm-5 section"> 
              <div class="box-container text-center">
                <img src="@/assets/img/person-2.png" />
                <h4>Plant-Based</h4>
                <h3 class="m-0">Medicine</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <router-link to="/medical-certificate" class="vs-btn yellow-color"  >Meet Medical Team</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="category-container disply-none my-4">
        <div class="row">
          <div class="col-lg-5 col-sm-5 p-0 d-flex justify-content-center">
            <img src="@/assets/img/down-arrow.png" width="10%" />
          </div>
          <div class="col-lg-2 col-sm-2 p-0"></div>
          <div class="col-lg-5 p-0 col-sm-5 d-flex justify-content-center">
            <img src="@/assets/img/down-arrow-yellow.png" width="10%" />
          </div>
        </div>
      </div>
      <div class="category-container">
        <div class="row">
          <div class="col-lg-5 col-sm-5 p-0"><img src="@/assets/img/How.png" width="100%" /></div>
          <div class="col-lg-2 col-sm-2 p-0"></div>
          <div class="col-lg-5 col-sm-5 p-0"><img src="@/assets/img/In.png" width="100%" /></div>
        </div>
      </div>
    </div>
  </section>
</template>
