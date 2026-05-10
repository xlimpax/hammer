import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutSection />
      <ReviewsSection />
      <Newsletter />
    </>
  );
}
