import React from 'react';
import Image from 'next/image';
import ImgStress from '../assets/img/stress.png';
import ImgBrain from '../assets/img/brain.png';
import ImgPain from '../assets/img/pain.png';
import ImgSleep from '../assets/img/sleep.png';
import Link from 'next/link';

const CategorySection = () => {
  return (
    <section className="category-section text-center">
      <div className="container-ct">
        <div className="row">
          <h2 className="text-center">Who is ProMed for?</h2>
          <p className="pb-2">
            {`Whether you're exploring alternative healthcare choices for the first time or have had extensive experience with holistic medicine, we're here to connect you with highly qualified doctors and nurses who are experienced and specialize in alternative medicine.`}
          </p>
        </div>
        <div className="bg-box p-5">
          <p className="text-center top pb-4">
            Alternative medicine has been prescribed for more than 140 conditions. Our caring doctors often talk to people experiencing issues with..
          </p>
          <div className="four-bx d-flex">
            <div className="col-md-3">
              <Image
                src={ImgStress}
                alt="Stress"
                width={100}
                height={100}
              />
              <p>Stress</p>
            </div>
            <div className="col-md-3">
              <Image
                src={ImgBrain}
                alt="Mental Health"
                width={100}
                height={100}
              />
              <p>Mental Health</p>
            </div>
            <div className="col-md-3">
              <Image
                src={ImgPain}
                alt="Pain Management"
                width={100}
                height={100}
              />
              <p>Pain Management</p>
            </div>
            <div className="col-md-3">
              <Image
                src={ImgSleep}
                alt="Sleep"
                width={100}
                height={100}
              />
              <p>Sleep</p>
            </div>
          </div>
          <p className="text-center py-2">
            Complete our 30-second pre-screening questionnaire to find out if alternative medicine is right for you.
          </p>
          <Link href="/preScreen" className="vs-btn">
          Start Questionnaire
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
