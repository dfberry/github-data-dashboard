import Footer from "./Footer";
import Navigation from "./Navigation";
const Layout = ({ children }: any) => {
  return (
    <>
      <Navigation></Navigation>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
