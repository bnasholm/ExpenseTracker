import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

type ProfilePicSelectorType = {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
};

const ProfilePicSelector = ({ image, setImage }: ProfilePicSelectorType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);

      // generate preview url from file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
  };

  const handleChooseFile = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="flex justify-end mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile pic"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -irght-1"
            onClick={handleImageRemove}
          >
            <LuTrash />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePicSelector;
