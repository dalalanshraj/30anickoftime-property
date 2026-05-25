import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useModal } from "../context/ModalContext";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// =====================================
// SORTABLE PHOTO
// =====================================

function SortablePhoto({
  photo,
  imageUrl,
  deletePhoto,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id:
      typeof photo === "string"
        ? photo
        : photo.url,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative border rounded overflow-hidden bg-white"
    >
      {/* DRAG AREA */}
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <img
          src={
            imageUrl ||
            "/placeholder.png"
          }
          alt="listing"
          className="w-full h-40 object-cover select-none"
          draggable={false}
          onError={(e) => {
            e.target.src =
              "/placeholder.png";
          }}
        />
      </div>

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          deletePhoto(photo);
        }}
        className="absolute top-2 right-2 z-50 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
      >
        ✕
      </button>
    </div>
  );
}

// =====================================
// MAIN COMPONENT
// =====================================

export default function PhotosTab({
  listingId,
  goNextTab,
}) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] =
    useState(false);

  const { showModal } = useModal();

  // =====================================
  // SAFE IMAGE URL
  // =====================================

  const getImageUrl = (photo) => {
    const base =
      import.meta.env.VITE_API_URL || "";

    // NEW OBJECT FORMAT
    if (photo?.url) {
      if (
        photo.url.startsWith("http")
      ) {
        return photo.url;
      }

      return (
        base.replace(/\/$/, "") +
        "/" +
        photo.url.replace(/^\//, "")
      );
    }

    // OLD STRING FORMAT
    if (typeof photo === "string") {
      if (photo.startsWith("http")) {
        return photo;
      }

      return (
        base.replace(/\/$/, "") +
        "/" +
        photo.replace(/^\//, "")
      );
    }

    return "/placeholder.png";
  };

  // =====================================
  // FETCH PHOTOS
  // =====================================

  useEffect(() => {
    if (!listingId) return;

    fetchPhotos();
  }, [listingId]);

  const fetchPhotos = async () => {
    try {
      const res = await api.get(
        `/listings/${listingId}`
      );

      setPhotos(res.data.photos || []);
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================
  // UPLOAD
  // =====================================

  const uploadPhotos = async (files) => {
    if (!listingId) {
      return showModal(
        "Create listing first"
      );
    }

    setUploading(true);

    const formData = new FormData();

    for (let file of files) {
      formData.append("photos", file);
    }

    try {
      const res = await api.put(
        `/listings/${listingId}/photos`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPhotos(res.data.photos || []);

      showModal(
        "Photos uploaded successfully"
      );
    } catch (err) {
      console.log(err);

      showModal("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const deletePhoto = async (photo) => {
    try {
      console.log(
        "DELETE PHOTO:",
        photo
      );

      let imagePath = "";

      // OBJECT FORMAT
      if (photo?.url) {
        imagePath = photo.url;
      }

      // STRING FORMAT
      else if (
        typeof photo === "string"
      ) {
        imagePath = photo;
      }

      else {
        console.log(
          "INVALID PHOTO"
        );
        return;
      }

      const filename =
        imagePath.split("/").pop();

      console.log(
        "FILENAME:",
        filename
      );

      const res = await api.delete(
        `/listings/${listingId}/photos/${filename}`
      );

      setPhotos(res.data.photos || []);

      showModal(
        "Photo deleted successfully"
      );
    } catch (err) {
      console.log(
        "DELETE ERROR:",
        err.response?.data || err
      );

      showModal("Delete failed");
    }
  };

  // =====================================
  // DRAG END
  // =====================================

  const handleDragEnd = async (
    event
  ) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex =
        photos.findIndex(
          (p) =>
            (typeof p === "string"
              ? p
              : p.url) === active.id
        );

      const newIndex =
        photos.findIndex(
          (p) =>
            (typeof p === "string"
              ? p
              : p.url) === over.id
        );

      const updatedPhotos =
        arrayMove(
          photos,
          oldIndex,
          newIndex
        );

      const reordered =
        updatedPhotos.map(
          (photo, index) => ({
            url:
              typeof photo ===
              "string"
                ? photo
                : photo.url,
            order: index,
          })
        );

      setPhotos(reordered);

      try {
        await api.put(
          `/listings/${listingId}/photos/reorder`,
          {
            photos: reordered,
          }
        );

        showModal(
          "Photos reordered"
        );
      } catch (err) {
        console.log(err);

        showModal(
          "Reorder failed"
        );
      }
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="space-y-6">
      {/* FILE INPUT */}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          uploadPhotos(
            e.target.files
          )
        }
        className="border p-3 w-full rounded"
      />

      {/* LOADING */}

      {uploading && (
        <p className="text-blue-600 font-semibold">
          Uploading...
        </p>
      )}

      {/* PHOTOS */}

      <DndContext
        collisionDetection={
          closestCenter
        }
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={photos.map((p) =>
            typeof p === "string"
              ? p
              : p.url
          )}
          strategy={
            rectSortingStrategy
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map(
              (photo, index) => (
                <SortablePhoto
                  key={
                    typeof photo ===
                    "string"
                      ? photo
                      : photo.url ||
                        index
                  }
                  photo={photo}
                  imageUrl={getImageUrl(
                    photo
                  )}
                  deletePhoto={
                    deletePhoto
                  }
                />
              )
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* NEXT BUTTON */}

      <div className="pt-6">
        <button
          onClick={goNextTab}
          className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}