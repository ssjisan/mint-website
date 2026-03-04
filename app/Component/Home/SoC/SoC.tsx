"use client";

import Image from "next/image";
import Radar from "../../Assets/Radar";
import "./SoC.scss";
import LogManagment from "../../Assets/LogManagment";
import Shield from "../../Assets/Shield";
import Alert from "../../Assets/Alert";
import Investigation from "../../Assets/Investigation";
import Dashboard from "../../Assets/Dashboard";

const socPoints = [
    {
        icon: Shield,
        title: "Real-time threat detection & proactive hunting",
    },
    {
        icon: Alert,
        title: "Accurate alert triage and prioritization",
    },
    {
        icon: Investigation,
        title: "Fast incident investigation & response",
    },
    {
        icon: LogManagment,
        title: "Centralized log management & correlation",
    },
    {
        icon: Dashboard,
        title: "Compliance-aligned reporting & executive dashboards",
    },
];

export default function SoC() {
    return (
        <section className="container soc-container">
            <div className="row g-4 align-items-center">
                {/* LEFT SIDE */}
                <div className="col-12 col-md-6">
                    <div className="soc-content">
                        <div className="soc-content-header">
                            <div className="soc-chip">
                                <Radar />
                                <p>SOC as Service (SOCaaS)</p>
                            </div>
                            <h4>24×7×365 Managed Security Operations</h4>
                        </div>

                        <p>
                            Powered by advanced XDR and SIEM platforms including Stellar
                            Cyber and Microsoft Sentinel, our SOC delivers continuous,
                            enterprise-grade monitoring and rapid incident response.
                        </p>

                        <div className="soc-points-deck">
                            {socPoints.map((item, index) => {
                                const IconComponent = item.icon;

                                return (
                                    <div className="soc-points-list" key={index}>
                                        <IconComponent />
                                        <p>{item.title}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="button-deck-soc">
                            <button className="button primary-fill-button">
                                Request for Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-md-6">
                    <div className="soc-graphic-content position-relative">
                        <Image
                            src="/soc-vector.svg"
                            alt="Background Vector"
                            fill
                            className="vector-svg"
                        />

                        <Image
                            src="/soc.svg"
                            alt="SOC Graphic"
                            width={420}
                            height={420}
                            className="soc-center-svg img-fluid"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}