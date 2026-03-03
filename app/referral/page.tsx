import FormConnection from '../Component/Referral/FormConnection'
import ReferralHeroSection from '../Component/Referral/ReferralHero/ReferralHeroSection'

export default function page() {
    return (
        <div>
            <ReferralHeroSection />
            <section id="referral-form" style={{ scrollMarginTop: "100px" }}>
                <FormConnection />
            </section>
        </div>
    )
}
