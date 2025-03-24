import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Footer/footer";

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className="layout-margin">
                <Outlet />

                </div>
<Footer />
        </>
    )
}