import Image from "next/image";
import MapRader from "../../Assets/MapRader";
import "./StacklinkBacked.scss";
import DummyLoader from "../../Assets/DummyLoader";

export default function StacklinkBacked() {
  return (
    <div className="container starlink-backed-container">
      <div className="starlink-backed-header">
        <DummyLoader />
        <p className="starlink-chip">Starlink-backed connectivity</p>
      </div>
      <div className="starlink-backed-content">
        <h4 className="starlink-backed-h3">
          Always Connected. Even When Others Go Down
        </h4>
        <p className="starlink-backed-body">
          All Mint internet packages are supported by Starlink-backed
          connectivity, ensuring strong network stability, improved uptime, and
          consistent performance across our network.
        </p>
      </div>
      <div className="map-svg-part">
        <Image
          src="/map.svg"
          alt="World Map"
          fill
          className="map-img"
          priority
        />

        <div className="map-radar">
          <MapRader />
        </div>
      </div>
    </div>
  );
}
