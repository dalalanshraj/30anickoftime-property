import { getIcon } from "../../utils/getIcon";

export default function AmenitiesModal({ amenities, onClose }) {
  return (
   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[90%] max-w-4xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Amenities ({amenities.length})
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6">

          {amenities.map((name, i) => {
            const Icon = getIcon(name);

            return (
              <div key={i} className="flex items-center gap-3">
                <Icon size={20} />
                <span className="text-gray-700">{name}</span>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}