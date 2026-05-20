import BannerPage from "@/components/Homepage/Banner";
import FeaturedPets from "@/components/Homepage/FeaturedPets";
import PetCareTips from "@/components/Homepage/PetCare";
import SuccessStories from "@/components/Homepage/Success";
import WhyAdopt from "@/components/Homepage/WhyAdopt";
import ImpactPage from "./global-impact/page";

export default function Home() {
  return (
   
    <main className="relative bg-slate-950 min-h-screen w-full overflow-hidden flex flex-col">
      
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BannerPage />
        <FeaturedPets />
      </div>

    
      <div className="w-full bg-slate-900/40 border-y border-white/5 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
               < ImpactPage />
          <WhyAdopt />
         
          <PetCareTips />
        </div>
      </div>

   
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SuccessStories />
      </div>

    </main>
  );
}