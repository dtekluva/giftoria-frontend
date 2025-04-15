'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent } from '../ui/dialog';

interface DragAndDropUploadProps {
  onUpload: (file: File) => void;
  placeholderImage?: string;
  maxSize?: number; // Max file size in bytes (default: 10MB)
  acceptedFormats?: string[]; // Accepted file formats (default: PNG, JPG/JPEG)
}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({
  onUpload,
  placeholderImage = 'https://placehold.co/100.png',
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'],
}) => {
  const [preview, setPreview] = useState<string>(placeholderImage);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      alert(
        `Only the following formats are allowed: ${acceptedFormats.join(', ')}`
      );
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setCropImage(e.target.result);
        setIsCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = () => {
    setPreview(cropImage || placeholderImage);
    setIsCropModalOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      const extension = format.split('/')[1];
      acc[format] = [`.${extension}`];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex items-center gap-[10px] md:gap-7 px-7 p-4 rounded-lg transition-colors duration-300 ${
          isDragActive ? 'bg-gray-100' : 'bg-white'
        }`}>
        <input {...getInputProps()} />
        <Image
          src={preview}
          width={100}
          height={100}
          alt='Uploaded Preview'
          className='rounded-full md:h-[100px] md:w-[100px] h-[60px] w-[60px] object-cover border-2 border-gray-200'
        />
        <div className='space-y-[6px]'>
          <h1 className='text-xs md:text-base font-bold font-montserrat'>
            Upload company logo
          </h1>
          <p className='font-dm-sans text-xs md:text-sm font-medium text-[#344054] md:mt-1'>
            Drag and drop your file(s) here or{' '}
            <span className='font-bold text-primary cursor-pointer hover:underline'>
              Click to upload
            </span>
          </p>
          <p className='text-[#344054] md:text-xs text-[10px] font-dm-sans font-medium'>
            Accepted formats: {acceptedFormats.join(', ')}. Max file size:{' '}
            {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {isCropModalOpen && cropImage && (
        <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
          <DialogContent className='bg-white h-full max-h-[60vh] max-w-[80vw]'>
            <div>
              <Cropper
                image={cropImage}
                crop={crop}
                style={{
                  containerStyle: {
                    backgroundColor: 'white',
                  },
                }}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </div>
            <div>
              <button
                onClick={handleCropComplete}
                className='px-4 py-2 bg-primary text-white rounded-md'>
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DragAndDropUpload;
