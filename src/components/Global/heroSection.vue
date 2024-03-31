<template>
  <section class="vs-hero-wrapper position-relative">
    <div class="overlay">
      <div class="main-box">
        <h1 class="hero-heading">Plant medicine for a better you</h1>
        <p>
          Alternaleaf is an online medical clinic providing plant medicine care to 100,000+<br />
          Australians. Get started with a 30-second pre-screening and see if plant medicine could be
          right for you.
        </p>
        <router-link to="/pre-screenings" class="vs-btn w-100">Start questionnaire</router-link>
        <div class="row pt-3">
          <div class="col-lg-4 text-center">
            <img src="@/assets/img/certified-doctors.svg" class="me-2" />
            <div class="font-8">Certified Doctors</div>
          </div>
          <div class="col-lg-4 text-center">
            <img src="@/assets/img/plant-medicine.svg" class="me-2" />
            <div class="font-8">Legal access to plant medicine</div>
          </div>
          <div class="col-lg-4 text-center">
            <img src="@/assets/img/legal-script.svg" class="me-2" />
            <div class="font-8">LegitScript certified</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
