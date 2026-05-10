import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import OfferRow from "@/components/OfferRow";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <OfferRow />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutSection />
      <ReviewsSection />
      <Newsletter />
    </>
  );
}
