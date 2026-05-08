import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Inquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/inquiries").then((res) => setInquiries(res.data));
  }, []);

  const download = (inq) => {
    const text = `
Property: ${inq.property?.property?.title || "N/A"}
Name: ${inq.name}
Email: ${inq.email}
Phone: ${inq.phone}

Arrival: ${inq.Arrival ? new Date(inq.Arrival).toLocaleDateString() : "-"}
Departure: ${inq.Departure ? new Date(inq.Departure).toLocaleDateString() : "-"}

Adults: ${inq.Adults}
Kids: ${inq.Kids || 0}

Message: ${inq.message}
Date: ${new Date(inq.createdAt).toLocaleString()}
    `;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inquiry.txt";
    a.click();
  };

  const deleteInquiry = async (id) => {
    if (!confirm("Delete this inquiry?")) return;

    await api.delete(`/inquiries/${id}`);
    setInquiries((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inquiries</h1>
          <p className="text-sm text-gray-500">
            Messages sent by users from property pages
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
          {inquiries.length} Total
        </span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          {/* HEAD */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Check-in</th>
              <th className="p-4 text-left">Check-out</th>
              {/* <th className="p-4 text-left">Property</th> */}
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No inquiries found
                </td>
              </tr>
            )}

            {inquiries.map((inq) => (
              <tr
                key={inq._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{inq.name}</td>
                <td className="p-4">{inq.email}</td>
                <td className="p-4">{inq.phone}</td>

                <td className="p-4">
                  {inq.Arrival
                    ? new Date(inq.Arrival).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4">
                  {inq.Departure
                    ? new Date(inq.Departure).toLocaleDateString()
                    : "-"}
                </td>

                {/* <td className="p-4">{inq.property?.title || "N/A"}</td> */}

                <td className="p-4 text-center space-x-2">
                  {/* VIEW */}
                  <button
                    onClick={() => setSelected(inq)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs"
                  >
                    View
                  </button>

                  {/* DOWNLOAD */}
                  <button
                    onClick={() => download(inq)}
                    className="px-3 py-1 bg-green-100 text-green-600 rounded text-xs"
                  >
                    Download
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteInquiry(inq._id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            {/* CLOSE */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full w-9 h-9 flex items-center justify-center transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Inquiry Details
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-3">
                <p>
                  <b>Name:</b>
                  <br /> {selected.name}
                </p>
                <p>
                  <b>Email:</b>
                  <br /> {selected.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <b>Phone:</b>
                  <br /> {selected.phone}
                </p>
                <p>
                  <b>Property:</b>
                  <br /> {selected.property?.property?.title || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <b>Arrival:</b>
                  <br />
                  {selected.Arrival
                    ? new Date(selected.Arrival).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <b>Departure:</b>
                  <br />
                  {selected.Departure
                    ? new Date(selected.Departure).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <p>
                  <b>Adults:</b>
                  <br /> {selected.Adults}
                </p>
                <p>
                  <b>Kids:</b>
                  <br /> {selected.Kids || 0}
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Message:</p>
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                  {selected.message}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelected(null)}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
