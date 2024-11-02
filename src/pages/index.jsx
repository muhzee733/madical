import React from "react";
import Head from "next/head";
import Layout from "../Components/layout";
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
