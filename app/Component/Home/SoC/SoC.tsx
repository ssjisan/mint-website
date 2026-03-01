"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Radar from "../../Assets/Radar";
import "./SoC.scss";

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
                                <p>SOC as Service</p>
                            </div>
                            <h4>24×7×365 Managed Security Operations</h4>
                        </div>

                        <p>
                            Powered by advanced XDR and SIEM platforms including Stellar Cyber and Microsoft Sentinel, our SOC delivers continuous, enterprise-grade monitoring and rapid incident response.
                        </p>

                        <div className="soc-points-deck">
                            <p>🛡️ 24/7 Real-Time Monitoring</p>
                            <p>⚠️ Advanced Threat Detection</p>
                            <p>📊 Log Management & SIEM Analysis</p>
                            <p>📑 Compliance & Reporting</p>
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