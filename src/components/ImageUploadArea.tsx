import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from 'next/image';
import DeleteButton from './DeleteButton';
import ImageCropModal from './ImageCropModal';

interface ImageUploadAreaProps {
  onTextExtracted: (text: string) => void;
}

export default function ImageUploadArea({ onTextExtracted }: ImageUploadAreaProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setTempImageUrl(url);
    setShowCropModal(true);
  };

  const handleCropComplete = async (croppedImageUrl: string) => {
    setPreviewUrl(croppedImageUrl);
    setShowCropModal(false);
    setIsProcessing(true);

    try {
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const worker = await createWorker('jpn');
      const { data: { text } } = await worker.recognize(blob);
      await worker.terminate();
      onTextExtracted(text);
    } catch (error) {
      console.error('OCR処理エラー:', error);
      onTextExtracted('OCRで文字を認識できませんでした。');
    }
    setIsProcessing(false);
  };

  const handleDeleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      onTextExtracted('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row gap-2 w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-row items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 px-4"
          >
            <MdOutlineAddPhotoAlternate size={24} className="mr-2 text-gray-500" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">がぞうをアップロード</span>
              <span className="ml-2 text-xs">(PNG, JPG, JPEG)</span>
            </p>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </label>
          <DeleteButton
            onClick={handleDeleteImage}
            disabled={!previewUrl}
          />
        </div>
      </div>
      {isProcessing && (
        <div className="mt-2 text-center text-sm text-indigo-600 animate-pulse">
          画像を解析中...
        </div>
      )}
      {previewUrl && (
        <div className="mt-2">
          <Image
            src={previewUrl}
            alt="プレビュー"
            className="max-w-full h-auto rounded-lg shadow-md"
            width={800}
            height={100}
          />
        </div>
      )}
      {showCropModal && tempImageUrl && (
        <ImageCropModal
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setShowCropModal(false);
            URL.revokeObjectURL(tempImageUrl);
            setTempImageUrl(null);
          }}
        />
      )}
    </div>
  );
} 