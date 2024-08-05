<template>
  <section class="py-130 faqs">
    <div class="container">
      <div class="row how">
        <div class="head">
          <h2 class="text-center">How it works</h2>
        </div>
        <div class="d-flex gap-2">
          <div class="col-md-3 text-center py-3 px-4">
            <img src="../../assets/img/clock.png"/>
            <h4>30 Second Pre-screening</h4>
            <p>Complete a simple questionnaire to see if you could be eligible.</p>
          </div>
          <div class="col-md-3 text-center py-3 px-4">
            <img src="../../assets/img/man.png"/>
            <h4>Online Consultation</h4>
            <p>Talk to a friendly nurse and doctor in a two-step telehealth appointment.</p>
          </div>
          <div class="col-md-3 text-center py-3 px-4">
            <img src="../../assets/img/circle.png"/>
            <h4>Express Delivery, Australia Wide</h4>
            <p>If eligible, your plant medicine will be delivered directly to your door.</p>
          </div>
          <div class="col-md-3 text-center py-3 px-4">
            <img src="../../assets/img/portal.png"/>
            <h4>Patient Portal & Follow-up Care</h4>
            <p>Re-order medication and book follow-up appointments using our online portal.</p>
          </div>
        </div>
        <div class="trans text-center">
          <h2 class="text-center">Transparent & affordable pricing</h2>
          <router-link to="/pre-screenings" class="vs-btn only"
          >Only £59</router-link>
          <p class="pb-5 pt-4">And if your doctor decides alternative medicine isn't the right treatment, you will not be charged!</p>
          <div class="d-flex flex-wrap">
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/tele.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">Telehealth appointment</h5>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/ref.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">No referral required</h5>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/access.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">Assess condition & medical history</h5>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/crc.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">Concession program available</h5>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/plan.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">Personalised treatment plan</h5>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="ic">
                <img src="../../assets/img/total.png"/>
              </div>
              <div class="txt">
                <h5 class="mb-0">30 minutes total</h5>
              </div>
            </div>
          </div>
          <div class="ready pt-5">
            <h2 class="text-center mb-3">Ready to get started?</h2>
            <p>Ready to get started? Complete our complimentary pre-screening questionnaire to see if you might be suitable.
            </p>
            <router-link to="/pre-screenings" class="vs-btn"
          >Start Questionaire</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
