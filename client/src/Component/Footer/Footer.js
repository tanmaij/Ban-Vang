import React from "react";
import map from "../../Asset/map.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquareAlt, faAt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="contactus">
        <h3>Liên hệ với chúng tôi</h3>
        <div className="contact">
          <div>
            <a href="tel:+84896664435">
              <span className="font">
                <FontAwesomeIcon icon={faPhoneSquareAlt} />
              </span>
              0896664435
            </a>
          </div>
          <div>
            <span className="font">
              <FontAwesomeIcon icon={faAt} />
            </span>
            tanmaijnguyen@gmail.com
          </div>
          <div>
            <span className="font">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </span>
            https://www.facebook.com/chuot.quyen.12
          </div>
        </div>
      </div>
      <div className="map">
        <img className="mapImg" src={map} />
      </div>
    </div>
  );
};

export default Footer;
