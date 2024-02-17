import { Navbar } from "./navbar";
import { ControlledCarousel } from "./carosel";

import { Header } from "./components/Header/header";
import Footer from "../common/Footer";
import { Featured } from "./components/FeaturedProduct/Featured";
import { Categories } from "./components/categories/categories";
import { Offers } from "./components/offerseforyou/offerse";

export const LandingpageContent = () => {
  return (
    <div className="">
      <Navbar> </Navbar>
      {/* Header section */}
      <Header></Header>
      <ControlledCarousel> </ControlledCarousel>

      <Featured> </Featured>
      <Categories> </Categories>
      <Offers></Offers>
      <Footer> </Footer>
    </div>
  );
};
