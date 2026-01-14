import Image from "next/image";
import OurTopCategories from "./Components/our-top-categories/OurTopCategories";
import ShopNowBanner from "./Components/Banner/ShopNowBanner";
import DealsSection from "./Components/DealSection/DealSection";
import WinterHighlight from "./Components/WinterHighlight/WinterHighlight";
import WhyChooseUs from "./Components/WhyChoseUs/WhyChoseUs";
import InstagramSection from "./Components/insta/InstaPhoto";
import FAQSection from "./Components/FAQ/FaqSection";
import NewsletterSection from "./Components/Discount/NewsLetterDiscount";
import CustomerReviews from "./Components/WhatSaysOur-Clients/CustomerReview";

export default function Home() {
  return (
    <div>
      <ShopNowBanner></ShopNowBanner>
      <OurTopCategories></OurTopCategories>
      <DealsSection></DealsSection>
      <WinterHighlight></WinterHighlight>
      <WhyChooseUs></WhyChooseUs>
      <InstagramSection></InstagramSection>
      <NewsletterSection></NewsletterSection>
      <CustomerReviews></CustomerReviews>
      <FAQSection></FAQSection>
    </div>

  );
}
