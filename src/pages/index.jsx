import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../Components/layout";
import "../assets/css/style.css";
import "../assets/css/fontawesome.min.css";
import ServicesTab from "../Components/ServicesTab";
import Category from '../Components/Category';
import HowItWork from '../Components/HowItWork';
import Faqs from '../Components/Faqs';

const Index = () => {
  return (
    <>
      <Head>
        <title>Madical</title>
        <meta name="description" content="Welcome to our homepage" />
      </Head>
      <Layout>
        <ServicesTab />
        <Category />
        <HowItWork />
        <Faqs />
      </Layout>
    </>
  );
};

export default Index;
