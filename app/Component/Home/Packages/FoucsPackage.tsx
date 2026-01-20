import GlowingStar from "../../Assets/GlowingStar";
import PricingPlan from "../../Assets/PricingPlan";
import TickMarked from "../../Assets/TickMarked";
import "./FoucsPackage.scss";

export default function FoucsPackage() {
  const packagePoints = [
    "Radical Simplicity: One price, no hidden fees",
    "Ideal For: 4K Streaming & Smart Homes",
    "Priority Support: 24/7 Dedicated Line",
    "Real Public IP included",
  ];
  return (
    <div className="foucs-package-container container">
      <div className="title-for-focus-package">
        <p className="heading-h6">RESIDENTIAL</p>
        <PricingPlan />
      </div>
      <div className="focus-package-card-container">
        <div className="focus-package-card">
          <div className="glow-wrapper">
            <GlowingStar />
          </div>
          <div className="package-name-volume">
            <h4 className="body">Unleash Unrestricted</h4>
            <p className="body-one">2,500/month</p>
          </div>
          <h2 className="heading-h2">100Mbps</h2>
          <button className="button primary-fill-button">
            GET RESIDENTIAL
          </button>
          <div className="package-points-deck">
            {packagePoints.map((point, index) => (
              <div className="package-point" key={index}>
                <div className="package-point-bullet">
                  <TickMarked />
                </div>
                <p className="subtitle">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
