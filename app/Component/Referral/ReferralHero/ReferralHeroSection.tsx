"use client";

import Heartbeat from '../../Assets/Heartbeat'
import TwentyFiveYears from '../../Assets/TwentyFiveYears'
import './ReferralHeroSection.scss'
import InternetUnderline from "../../Assets/InternetUnderline";
import DataCenter from '../../Assets/DataCenter';
import Security from '../../Assets/Security';
import BackedConnect from '../../Assets/BackedConnect';
export default function ReferralHeroSection() {
    return (
        <div className='container' style={{ padding: "120px 16px 48px 16px" }}>
            <div className='referral-container-body row g-3'>
                <div className='col-12 col-sm-12 col-md-6 common-grid-style-one'>
                    <div className='referral-content'>
                        <TwentyFiveYears />
                        <h2>
                            Built for {" "}
                            <span className="twentyfive-wrapper">
                                <span className="twentyfive-text">Exceptionals.</span>
                                <InternetUnderline />
                            </span>{" "}
                        </h2>
                        <button className='get-now-button' onClick={() => {
                            const section = document.getElementById("referral-form");
                            section?.scrollIntoView({ behavior: "smooth" })
                        }}>Get now</button>
                    </div>
                </div>
                <div className='col-12 col-sm-12 col-md-6 common-grid-style-two'>
                    <div className='referral-points-deck'>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <Heartbeat />
                            </div>
                            <p>99.9% uptime guaranteed</p>
                        </div>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <BackedConnect />
                            </div>
                            <p>First 100% starlink backed brand</p>
                        </div>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <Security />
                            </div>
                            <p>Security Operation Center
                            </p>
                        </div>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <Heartbeat />
                            </div>
                            <p>AI Optimized Network

                            </p>
                        </div>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <Heartbeat />
                            </div>
                            <p>SD-WAN Tunnel Between Office and Home

                            </p>
                        </div>
                        <div className='referral-points-card'>
                            <div className='referral-points-icon-body'>
                                <DataCenter />
                            </div>
                            <p>Hosted in the finest Tier III Data center in Bangladesh


                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
