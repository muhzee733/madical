import Link from 'next/link';
import Image from 'next/image'
import Logo from '../assets/img/pro-logo.png';



function Header() {

  return (
    <header className="header-wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Logo */}
          <div className="row w-100">
            <div className="col-lg-2 col-md-12 d-flex align-content-center justify-content-between">
              <Link className="navbar-brand logo" href="/">
                <Image src={Logo} width="100%" alt="Logo" className="mobile-menu" />
              </Link>
              {/* Hamburger Icon */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-lg-10 col-md-12 d-flex align-content-center">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Existing Content */}
                <div className="container container-style1 position-relative">
                  <div className="row align-items-center justify-content-between justify-content-md-end">
                    <div className="col-xl-9 col-md-9 text-end text-lg-center justify-content-end">
                      <nav className="main-menu menu-style1">
                        <ul style={{ textAlign: 'right' }} className="burger-menu">
                          <li className="mega-menu-wrap">
                            <Link href="/medical-certificate">Home</Link>
                          </li>
                          <li className="mega-menu-wrap">
                            <Link href="/">How it works</Link>
                          </li>
                          <li>
                            <a href="about.html">Pricing</a>
                          </li>
                          <li>
                            <a href="blog.html">About Us</a>
                          </li>
                          <li>
                            <a href="service.html">FAQs</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="col-xl-3 col-md-3 gap-3 d-lg-flex justify-content-end custom-button">
                      <Link href="/preScreen" className="vs-btn">
                        Start Questionnaire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
