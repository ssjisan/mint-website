import AbstractGrid from "../../Assets/AbstractGrid";
import Email from "../../Assets/Email";
import LightRayTypeSix from "../../Assets/LightRayTypeSix";
import Phone from "../../Assets/Phone";
import "./FinalCta.scss";

export default function FinalCta() {
  return (
    <div className="final-ctg-container container">
      <div className="final-cta-body">
        <div className="cta-gradient">
          <LightRayTypeSix />
        </div>{" "}
        <div className="cta-grid">
          <AbstractGrid />
        </div>{" "}
        <div className="final-cta-content">
          <h2 className="heading-h2">
            More than just speed. Mint is a lifestyle.
          </h2>
          <p className="subtitle">
            Ready for internet as exceptional as your address?
          </p>
        </div>
        <button className="button primary-fill-button">Order Now</button>
        <div className="final-cta-contact-deck">
          <div className="final-cta-contact-email">
            <div className="final-cta-icon-body">
              <Email />
            </div>
            <p className="subtitle">info@mint.com.bd</p>
          </div>
          <div className="final-cta-contact-email">
            <div className="final-cta-icon-body">
              <Phone />
            </div>
            <p className="subtitle">+880 1617 55 54 29</p>
          </div>
        </div>
      </div>
    </div>
  );
}
