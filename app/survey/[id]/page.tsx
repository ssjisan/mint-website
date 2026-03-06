import Logo from "@/app/Component/Assets/Logo";
import Footer from "@/app/Component/Home/Footer/Footer";
import SurveyForm from "@/app/Component/Survey/SurveyForm";
import Link from "next/link";

export default function page() {
    return (
        <div>
            <div className="survey-navbar">
                <Link href="/" className="logo">
                    <Logo width={64} height={64} />
                </Link>
            </div>
            <SurveyForm />
            <Footer />
        </div>
    )
}
