<template>
  <section class="testimonial-wrapper space-bottom">
    <div class="container">
      <div class="row text-center justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-6">
          <div class="section-title">
            <span class="h3 text-theme sec-subtitle">Testimonial</span>
            <h2 class="h1">Australia's most trusted plant medicine clinic</h2>
            <p>
                Delivering best-in-class medical care. Discover why 20,000+ patients have rated us 4.7 on Google.
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="row vs-carousel wow fadeInUp" data-wow-delay="0.3s" data-slide-show="2">
            <swiper
              :slidesPerView="2"
              :spaceBetween="20"
              :pagination="{
                clickable: true
              }"
              :modules="modules"
              class="mySwiper"
            >
            <swiper-slide>
                <div class="col-xl-12">
                  <div class="testimonial-box mb-30 bg-white">
                    <div class="content">
                      <p class="text-center">
                        Could not have been easier. I'm 66 years old and I have very limited internet skills and often experience difficulty using it. Thank you for making it so easy.
                      </p>
                    </div>
                    <div class="author-info">
                      <div class="info">
                        <h3 class="fs-20 name">Moris Jonson</h3>
                        <span class="fs-xs degi text-theme">CEO, Hosak Int. Ltd.</span>
                      </div>
                    </div>
                  </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="col-xl-12">
                  <div class="testimonial-box mb-30 bg-white">
                    <div class="content">
                      <p >
                        Could not have been easier. I'm 66 years old and I have very limited internet skills and often experience difficulty using it. Thank you for making it so easy.
                      </p>
                    </div>
                    <div class="author-info">
                      <div class="info">
                        <h3 class="fs-20 name">Moris Jonson</h3>
                        <span class="fs-xs degi text-theme">CEO, Hosak Int. Ltd.</span>
                      </div>
                    </div>
                  </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="col-xl-12">
                  <div class="testimonial-box mb-30 bg-white">
                    <div class="content">
                      <p >
                        Could not have been easier. I'm 66 years old and I have very limited internet skills and often experience difficulty using it. Thank you for making it so easy.
                      </p>
                    </div>
                    <div class="author-info">
                      <div class="info">
                        <h3 class="fs-20 name">Moris Jonson</h3>
                        <span class="fs-xs degi text-theme">CEO, Hosak Int. Ltd.</span>
                      </div>
                    </div>
                  </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="col-xl-12">
                  <div class="testimonial-box mb-30 bg-white">
                    <div class="content">
                      <p >
                        Could not have been easier. I'm 66 years old and I have very limited internet skills and often experience difficulty using it. Thank you for making it so easy.
                      </p>
                    </div>
                    <div class="author-info">
                      <div class="info">
                        <h3 class="fs-20 name">Moris Jonson</h3>
                        <span class="fs-xs degi text-theme">CEO, Hosak Int. Ltd.</span>
                      </div>
                    </div>
                  </div>
                </div>
            </swiper-slide>

            </swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination]
    }
  }
}
</script>
