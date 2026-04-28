import Inquiry from "../models/Inquiry.js";

// USER → CREATE INQUIRY
export const createInquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message, Arrival , Departure , Adults , Kids } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property is required" });
    }

    const inquiry = await Inquiry.create({
      property: propertyId,
      name,
      email,
      phone,
      message,
      Arrival,
      Departure, 
      Adults, 
      Kids,


    });

    //  populate property title
    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate("property", "title");

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry: populatedInquiry,
    });

  } catch (err) {
    // console.error("Inquiry Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ADMIN → GET ALL
export const getAllInquiries = async (req, res) => {
  const inquiries = await Inquiry.find()
    .populate("property")
    .sort({ createdAt: -1 });

  res.json(inquiries);
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    await Inquiry.findByIdAndDelete(id);

    res.json({ message: "Inquiry deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
};