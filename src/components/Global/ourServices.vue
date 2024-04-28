<template>
  <section class="vs-service-wrapper py-130">
    <div class="container">
      <div class="row text-center justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-6 wow fadeInUp" data-wow-delay="0.3s">
          <div class="section-title">
            <h2 class="text-center railway-font theme-color">How it works</h2>
          </div>
        </div>
      </div>
      <div class="row custom-box">
        <div class="col-xl-3 col-md-3 col-sm-3 col-6 mb-25">
          <div class="service-box-1">
            <img src="@/assets/img/icon-5.png" />
          </div>
        </div>
        <div class="col-xl-3  col-md-3 col-sm-3 col-6 mb-25">
          <div class="service-box-1">
            <img src="@/assets/img/icon-6.png" />
          </div>
        </div>
        <div class="col-xl-3 col-md-3 col-sm-3 col-6 mb-25">
          <div class="service-box-1">
            <img src="@/assets/img/icon-7.png" />
          </div>
        </div>
        <div class="col-xl-3 col-md-3 col-sm-3 col-6 mb-25">
          <div class="service-box-1">
            <img src="@/assets/img/icon-8.png" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 d-flex flex-column align-items-center justify-content-center gap-sm-0 gap-5 mt-5 ">
          <div class="d-flex flex-column align-items-center justify-content-center gap-5">
            <h2 class="text-center railway-font theme-color">Transparent & affordable pricing</h2>
            <button class="vs-btn-2 railway-font">Only $59</button>
            <p class="text-center who">
              And if your doctor decides alternative medicine isn't the right treatment, you will
              not be charged!
            </p>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <ul class="custom-ul">
                <li class="mb-4">
                  <img src="@/assets/img/icon-9.png" class="pe-3" /><span
                    >Telehealth appointment</span
                  >
                </li>
                <li class="mb-4">
                  <img src="@/assets/img/icon-10.png" class="pe-3" /><span
                    >Assess condition & medical history</span
                  >
                </li>
                <li>
                  <img src="@/assets/img/icon-11.png" class="pe-3" /><span
                    >Personalised treatment plan</span
                  >
                </li>
              </ul>
            </div> 
            <div class="col-lg-6 col-md-6 col-sm-6">
              <ul class="custom-ul">
                <li class="mb-4">
                  <img src="@/assets/img/icon-12.png" class="pe-3" /><span
                    >No referral required</span
                  >
                </li>
                <li class="mb-4">
                  <img src="@/assets/img/icon-13.png" class="pe-3" /><span
                    >Concession program available</span
                  >
                </li>
                <li class="mb-4">
                  <img src="@/assets/img/icon-14.png" class="pe-3" /><span
                    >30 minutes total</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex flex-column align-items-center justify-content-center gap-5 gap-md-2">
            <h2 class="text-center railway-font theme-color">Ready to get started?</h2>

            <p class="text-center who">
              Ready to get started? Complete our complimentary pre-screening questionnaire to see if
              you might be suitable.
            </p>
            <router-link to="/pre-screenings" class="vs-btn yellow-color"
                      >Start Questionnaire</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
