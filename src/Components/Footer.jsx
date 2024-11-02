import Image from 'next/image';
import LogoWhite from '../assets/img/logo-white.png'; // Import the logo image
import Link from 'next/link'; // Include Link if you need to use it

const Footer = () => {
  return (
    <footer className="footer-wrapper footer bg-theme py-130">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center text-white">
            <div className="text-center mb-5">
              <Image
                src={LogoWhite}
                alt="Logo"
                width={230}
                height={100} // You can specify a height based on your layout requirements
                style={{ maxWidth: '230px' }} // Optional: handle max width with CSS
              />
            </div>
            <div className="mb-5">
              <h4 className="text-white">Get in Touch</h4>
              <p className="text-white">We’re available Mon-Fri, 9am-5am (AEST)</p>
            </div>
            <div className="footer-container mb-5">
              <h4 className="text-white">About Us</h4>
              <p className="text-white">
                We’re an online pharmacist and doctor-backed platform providing in-home telehealth
                consultations and electronic medical certificates.
              </p>
            </div>
            <div className="footer-container">
              <div className="row">
                <div className="col-lg-4">
                  <i className="fa fa-address-book me-2"></i>
                  <span>Brisbane 4000, Australia</span>
                </div>
                <div className="col-lg-5 p-0 text-center">
                  <i className="fa fa-envelope me-2"></i>
                  <span>contact@frazmedicall.com.au</span>
                </div>
                <div className="col-lg-3">
                  <i className="fa fa-envelope me-2"></i>
                  <span>frazmedicall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
