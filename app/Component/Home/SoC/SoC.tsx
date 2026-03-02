"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Radar from "../../Assets/Radar";
import "./SoC.scss";
import LogManagment from "../../Assets/LogManagment";
import Shield from "../../Assets/Shield";
import Alert from "../../Assets/Alert";
import Investigation from "../../Assets/Investigation";
import Dashboard from "../../Assets/Dashboard";

/* ===== Animation Variants ===== */

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25, // controls left -> right timing
        },
    },
};

const leftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9 },
    },
};

const rightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, },
    },
};


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
        <motion.section
            className="container soc-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-120px" }}
        >
            <div className="row g-4">
                {/* LEFT SIDE */}
                <div className="col-12 col-md-6">
                    <motion.div className="soc-content" variants={leftVariants}>
                        <div className="soc-content-header">
                            <div className="soc-chip">
                                <Radar />
                                <p>SOC as Service (SOCaaS)</p>
                            </div>
                            <h4>24×7×365 Managed Security Operations</h4>
                        </div>

                        <p>
                            Powered by advanced XDR and SIEM platforms including Stellar Cyber and Microsoft Sentinel, our SOC delivers continuous, enterprise-grade monitoring and rapid incident response.
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
                    </motion.div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-12 col-md-6">
                    <motion.div className="soc-graphic-content" variants={rightVariants}>
                        {/* Background Vector */}
                        <Image
                            src="/soc-vector.svg"
                            alt="Background Vector"
                            fill
                            priority
                            className="vector-svg"
                        />

                        {/* Center SOC Graphic */}
                        <Image
                            src="/soc.svg"
                            alt="SOC Graphic"
                            width={420}
                            height={420}
                            className="soc-center-svg"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}