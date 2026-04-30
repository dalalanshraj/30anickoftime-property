import { useState } from "react";

export default function ReviewsSection() {
  const [open, setOpen] = useState(false);

  // 🔥 STATIC REVIEWS
  const reviews = [
  {
    id: 1,
    title: "30A Best Kept Secret",
    message: "This property is truly an Oasis! If you are looking for an escape to the beach, this is it! From the private pool to the elaborate kitchen, the amenities are endless, it will not disappoint. But if cooking is not on your list of things to do, there are many fabulous restaurants close by to choose from. Family approved, we will definitely book again!!",
    date: "08/20/2025",
    name: "Dean Kirkfield",
  },
  {
    id: 2,
    title: "Good Times",
    message: "We chose this beautiful beach home for our family vacation this year in June. The house is stunning inside, the kitchen is a chef�s dream, the laundry rooms on all floors is FANTASTIC, your private pool is a HUGE BONUS especially if you have kids. The elevator is a wonderful amity as well. Each bedroom hosts is our bathroom too which is incredible, so NO waiting for a free shower and the hot water is always available too. The location is a short walk to the main strip at 30A which boasts restaurants, souvenir shops, boutique shops, coffee shops, ice cream store, etc. This area is fantastic for anyone who loves to walk or run.",
    date: "08/16/2025",
    name: "Laura Boyd",
  },
  {
    id: 3,
    title: "GREAT STAY!",
    message: "My family had a great time. Loved being on second floor, easy access to the beach and pool area. Great location, walking distance to lots of restaurants. Most importantly Ann was just a phone call away. Thank you Ann!",
    date: "Jul 15, 2017",
    name: "Natalya",
  },
  {
    id: 4,
    title: "Lori Terrell",
    message: "Thank you for a wonderful Christmas for our family!! You can�t ask for a better owner who went out of his way for us!! The place was beautiful and that kitchen is wow!! Love love this place!!",
    date: "01/02/2021",
    name: "Jeanne McGehee", // 
  },
];

  const preview = reviews.slice(0, 3);

  return (
    <section className="bg-[#f5f5f5] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

  {/* 🔥 HEADER */}
  <div className="mb-14 text-center">
    <p className="uppercase text-xs tracking-[3px] text-[#2f9bad]
  mb-3">
      Testimonials
    </p>

    <h2 className="text-3xl md:text-5xl font-semibold text-gray-800">
      What Our Clients Say
    </h2>

    {/* <div className="w-16 h-[2px] bg-[#2f9bad] mx-auto mt-4"></div> */}
  </div>

  
  <div className="grid md:grid-cols-2 gap-8">

   
    <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">

      
      <div className="absolute -inset-1 bg-[#FFE8BE]/10 blur-xl rounded-3xl"></div>

      <div className="relative">
       
        <div className="text-yellow-500
  text-lg mb-3">
          ★★★★★
        </div>

        
        <p className="text-gray-600 leading-relaxed text-lg">
          {preview[0].message}
        </p>

       
        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFE8BE] rounded-full flex items-center justify-center text-black font-bold">
            {preview[0].name?.charAt(0)}
          </div>
          <p className="font-semibold text-gray-800">
            {preview[0].name}
          </p>
        </div>
      </div>
    </div>

    
    <div className="flex flex-col gap-6">

      {preview.slice(1).map((r) => (
        <div
          key={r.id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
         
          <div className="text-yellow-500
  mb-2 text-sm">
            ★★★★★
          </div>

        
          <p className="text-gray-600 text-sm">
            {r.message}
          </p>

 
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
              {r.name?.charAt(0)}
            </div>
            <p className="font-semibold text-gray-800 text-sm">
              {r.name}
            </p>
          </div>
        </div>
      ))}

    </div>

  </div>

  {/* 🔥 BUTTON */}
  <div className="flex justify-center mt-14">
    <button
      onClick={() => setOpen(true)}
      className="px-8 py-3 rounded-full bg-[#FFE8BE] text-black font-medium shadow-md hover:scale-105  transition duration-300"
    >
      View All Reviews →
    </button>
  </div>

</div>

      {/* 🔥 MODAL */}
     {open && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

    
    <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative shadow-xl">

      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">
          Reviews ({reviews.length})
        </h3>

        <button
          onClick={() => setOpen(false)}
          className="text-2xl text-gray-600 hover:text-black"
        >
          ✕
        </button>
      </div>

    
      <div className="max-h-[65vh] overflow-y-auto space-y-6 pr-2">

        {reviews.map((r) => (
          <div
            key={r.id}
            className="shadow-xl rounded-2xl p-6 bg-gray-50 hover:shadow-md transition"
          >

            
            <div className="text-yellow-500 text-lg mb-2">
              {"★".repeat(5)}
            </div>

            
            <h4 className="font-semibold text-lg mb-1">
              {r.title || "Great Vacation"}
            </h4>

            
            <p className="text-gray-600 leading-relaxed">
              {r.message}
            </p>

          
            <p className="text-sm text-gray-400 mt-3">
              {r.date || "Jan 7, 2017"}
            </p>
            <div className="mt-4 flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFE8BE] rounded-full flex items-center justify-center text-black font-bold">
  {r.name?.charAt(0)}
</div>
 <p className="font-semibold text-gray-800 text-sm">
              {r.name}
            </p>

          </div>
          </div>
        ))}

      </div>
    </div>
  </div>
)}
    </section>
  );
}