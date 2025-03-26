import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Container>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
