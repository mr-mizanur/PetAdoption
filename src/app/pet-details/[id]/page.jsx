import React from "react";
import Image from "next/image";
import { 
  FaDna, 
  FaHourglassHalf, 
  FaVenusMars, 
  FaHeartbeat, 
  FaShieldVirus, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaEnvelope, 
  FaTerminal 
} from "react-icons/fa";
import AdoptionFrom from "@/components/AdoptionFrom";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  try {
    const res = await fetch(`${baseUrl}/api/pets/${id}`);
    if (!res.ok) return { title: "Asset Not Found" };
    
    const pet = await res.json();
    return {
      title: `${pet.name} | Companion Profile`,
      description: pet.description || `Specification profile for node ${pet.name}`,
    };
  } catch {
    return { title: "Secure Gateway Failure" };
  }
}

async function getPetData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const res = await fetch(`${baseUrl}/api/pets/${id}`, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const pet = await getPetData(id);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-rose-500 font-bold uppercase tracking-widest text-xs border border-rose-500/10">
        Fatal: Companion Diagnostics Not Found For Node ID: {id}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          
          <div className="relative h-[450px] w-full bg-slate-950 border-b border-white/5">
            <Image
              src={pet.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"} 
              alt={pet.name}
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-8 flex items-center gap-4">
              <span className="bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">
                {pet.species}
              </span>
            </div>
          </div>

          <div className="p-8 flex-grow flex flex-col space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <h1 className="text-4xl font-black text-white tracking-tight">{pet.name}</h1>
              <div className="flex items-center bg-slate-950 border border-white/5 px-4 py-2.5 rounded-xl gap-2 shadow-inner">
                <FaDollarSign className="text-emerald-400 text-sm" />
                <span className="text-2xl font-black text-white">{pet.adoptionFee}</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider ml-1">Asset Value</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FaDna />, label: "Genetic Breed", value: pet.breed },
                { icon: <FaHourglassHalf />, label: "Age Metric", value: `${pet.age} Earth Years` },
                { icon: <FaVenusMars />, label: "Gender Node", value: pet.gender },
                { icon: <FaHeartbeat />, label: "Vital Health Status", value: pet.healthStatus },
                { icon: <FaShieldVirus />, label: "Biosecurity Immunization", value: pet.vaccinationStatus },
                { icon: <FaMapMarkerAlt />, label: "Grid Coordinates", value: pet.location },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-slate-950/60 border border-white/5 rounded-xl group hover:border-emerald-500/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{item.label}</p>
                    <p className="text-sm font-extrabold text-slate-200 mt-0.5 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                <FaEnvelope />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Custodian Registry Email</p>
                <p className="text-sm font-bold text-slate-300 mt-0.5 truncate">{pet.ownerEmail}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                <FaTerminal className="text-emerald-400" /> Behavioral Log Summary
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium bg-slate-950/40 p-5 rounded-xl border border-white/5">
                {pet.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <AdoptionFrom pet={pet} />
        </div>

      </div>
    </div>
  );
};

export default PetDetailsPage;