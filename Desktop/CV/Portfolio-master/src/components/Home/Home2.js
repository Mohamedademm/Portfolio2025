import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  const { t } = useTranslation();
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              {t('home.introduce')}
            </h1>
            <p className="home-about-body">
              {t('home.love')}
              <br />
              <br />{t('home.languages')}
              <i>
                <b className="purple"> C, C++, Java, Python, JavaScript, PHP</b>
              </i>
              <br />
              <br />
              {t('home.interests')}
              <i>
                <b className="purple">{t('home.webMobile')}</b> {t('home.and')} {t('home.exploring')} <b className="purple">{t('home.aiBigData')}</b>
              </i>
              <br />
              <br />
              {t('home.develop')}
              <b className="purple"> MERN Stack (MongoDB, Express.js, React.js, Node.js)</b>, 
              <b className="purple"> Spring Boot</b> {t('home.backend')},
              {t('home.andText')} <b className="purple"> Flutter</b> {t('home.mobile')}.
              <br />
              <br />
              {t('home.passionate')} &nbsp;
              <i>
                <b className="purple">{t('home.competitive')}</b>
              </i>
              &nbsp; {t('home.improving')}.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{t('home.findMe')}</h1>
            <p>
              {t('home.connect')} <span className="purple">{t('home.connectWord')} </span>{t('home.withMe')}
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Mohamedademm"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/mohamed-adem-20mt047147/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/adem.mohamed0?igsh=dDdud2IyMHFhbWU="
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
