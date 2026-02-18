import { useRef, useState, useEffect } from "react";
import { Button, Image } from "@heroui/react";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { addToast } from "@heroui/react";

interface ImageUploaderProps {
  images: (File | string)[];
  onChange: (images: (File | string)[]) => void;
  maxFiles?: number;
  error?: string;
}

export default function ImageUploader({
  images,
  onChange,
  maxFiles = 10,
  error,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((img) =>
      img instanceof File ? URL.createObjectURL(img) : img,
    );

    setPreviews(urls);

    return () => {
      urls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - images.length;

    if (fileArray.length > remainingSlots) {
      addToast({
        title: "Error",
        description: `You can add up to ${remainingSlots} more image(s) (min 1, max 10).`,
        color: "danger",
      });

      return;
    }

    const imageFiles = fileArray.filter((file) => {
      if (!file.type.startsWith("image/")) {
        addToast({
          title: "Error",
          description: `${file.name} is not an image file`,
          color: "danger",
        });

        return false;
      }

      return true;
    });

    if (imageFiles.length === 0) return;

    onChange([...images, ...imageFiles]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);

    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer bg-gray-50/50 flex flex-col items-center justify-center min-h-[220px] ${
          isDragging
            ? "border-primary bg-primary-50/50 scale-[1.01]"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-100"
        } ${error ? "border-red-500 bg-red-50/10" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            fileInputRef.current?.click();
          }
        }}
      >
        <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
          <FiUpload className="text-3xl text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium text-lg mb-1">
          Upload Property Images
        </p>
        <p className="text-sm text-gray-400">Max {maxFiles} Files</p>
        <input
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleFileInputChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                removeWrapper
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover rounded-xl border border-gray-100"
                src={preview}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center z-20">
                <Button
                  isIconOnly
                  className="bg-red-500 text-white"
                  radius="full"
                  size="sm"
                  variant="flat"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <MdDelete className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
