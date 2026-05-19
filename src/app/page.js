import BannerPage from "@/components/Homepage/Banner";
import FeaturedPets from "@/components/Homepage/FeaturedPets";
import PetCareTips from "@/components/Homepage/PetCare";
import SuccessStories from "@/components/Homepage/Success";
import WhyAdopt from "@/components/Homepage/WhyAdopt";

export default function Home() {
  return (
    // মেইন ডার্ক কন্টেইনার - ফ্লেক্স বা সেন্টার ট্রিক বাদ দিয়ে সোজা উপর থেকে নিচে (flex-col) সাজানো হয়েছে
    <main className="relative bg-slate-950 min-h-screen w-full overflow-hidden flex flex-col">
      
      {/* ব্যানার এবং ফিচার্ড পেটস সেকশন */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BannerPage />
        <FeaturedPets />
      </div>

      {/* মাঝের সেকশনগুলোর ব্যাকগ্রাউন্ড গ্লোবাল ডার্ক থিমের সাথে ম্যাচ করানো হলো */}
      <div className="w-full bg-slate-900/40 border-y border-white/5 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <WhyAdopt />
          <PetCareTips />
        </div>
      </div>

      {/* সাকসেস স্টোরিজ সেকশন */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SuccessStories />
      </div>

    </main>
  );
}