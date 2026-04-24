import { useState } from "react";
import { amenities } from "../../data/amenities";
import AmenitiesModal from "./AmenitiesModal";
import { getIcon } from "../../utils/getIcon";

export default function AmenitiesSection() {
  const [open, setOpen] = useState(false);

  const preview = amenities.slice(0, 6);

  return (
    <section className="py-16 px-6 md:px-16">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Amenities
      </h2>

      {/* PREVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {preview.map((name, i) => {
          const Icon = getIcon(name);

          return (
            <div key={i} className="flex items-center gap-2">
              <Icon size={18} />
              <span>{name}</span>
            </div>
          );
        })}

      </div>

      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="mt-6 border px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        Show all {amenities.length} amenities
      </button>

      {/* MODAL */}
      {open && (
        <AmenitiesModal
          amenities={amenities}
          onClose={() => setOpen(false)}
        />
      )}

    </section>
  );
}