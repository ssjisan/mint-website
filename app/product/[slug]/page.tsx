import Footer from "@/app/Component/Home/Footer/Footer";
import Navbar from "@/app/Component/Navbar/Navbar";
import ProductDetails from "@/app/Component/ProductDetails/ProductDetails";

export default function page() {
    return (
        <div>
            <Navbar />
            <ProductDetails />
            <Footer />
        </div>
    )
}
