<template>
  <main>
    <Header />
    <Medical />
    <Categories />
    <Faqs />
    <Footer />
    
  </main>
</template>

<script setup>
import Header from '@/components/Global/headerNav.vue'
import Footer from '@/components/Global/FooterSection.vue'
import Medical  from "../components/Global/servicesTab.vue"
import Categories  from '@/components/Global/categoriesSection.vue'
import Faqs  from '@/components/Global/faqsSection.vue'
</script>
