import Image from "next/image";
import OurTopCategories from "./Components/our-top-categories/OurTopCategories";
import ShopNowBanner from "./Components/Banner/ShopNowBanner";

export default function Home() {
  return (
    <div>
      <ShopNowBanner></ShopNowBanner>
      <OurTopCategories></OurTopCategories>
    </div>

  );
}
