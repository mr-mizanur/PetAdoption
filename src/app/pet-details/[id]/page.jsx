import AdoptionFrom from "@/components/AdoptionFrom";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  // ১. URL ঠিক করা হলো (/api/pets/${id}) এবং ক্যাশ রিলিজের জন্য no-store দেওয়া হলো
  const res = await fetch(`http://localhost:5000/api/pets/${id}`, {
    method: "GET",
    cache: "no-store", 
  });

  // সার্ভার এরর দিলে তা হ্যান্ডেল করার সেফটি চেক
  if (!res.ok) {
    return (
      <div className="min-h-screen pt-36 text-center text-red-500 font-semibold">
        Pet details not found or Server error!
      </div>
    );
  }

  const pet = await res.json();

  return (
    <div className="min-h-screen pb-32 bg-gray-100 pt-36 py-10 px-5">
      <div className="container px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="h-112.5 overflow-hidden">
            {/* ২. imageUrl পরিবর্তন করে ডাটাবেজের সঠিক ফিল্ড pet.image দেওয়া হলো */}
            <img
              src={pet.image} 
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold">{pet.name}</h1>

              <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
                {pet.species}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <h3 className="font-semibold text-gray-800">Breed</h3>
                <p className="text-gray-600">{pet.breed}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Age</h3>
                <p className="text-gray-600">{pet.age} Years</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Gender</h3>
                <p className="text-gray-600">{pet.gender}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Health Status</h3>
                <p className="text-gray-600">{pet.healthStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Vaccination Status
                </h3>
                <p className="text-gray-600">{pet.vaccinationStatus}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">{pet.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Adoption Fee</h3>
                <p className="text-2xl font-bold">${pet.adoptionFee}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Owner Email</h3>
                <p className="text-gray-600">{pet.ownerEmail}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 text-xl mb-2">
                Description
              </h3>

              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>
          </div>
        </div>

        <AdoptionFrom pet={pet} />
      </div>
    </div>
  );
};

export default PetDetailsPage;