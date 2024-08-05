<template>
  <main>
    <Header />
    <HeroSection />
    <WhoWeAre />
    <ourServices />
    <Faq />
    <Footer />
  </main>
</template>

<script setup>
import Header from '@/components/Global/headerNav.vue'
import HeroSection from '@/components/Global/heroSection.vue'
import WhoWeAre from '@/components/Global/whoweAre.vue'
import ourServices from '@/components/Global/ourServices.vue'
import Faq from '../components/Global/tabsPlant.vue';
import Footer from '@/components/Global/FooterSection.vue'
</script>
