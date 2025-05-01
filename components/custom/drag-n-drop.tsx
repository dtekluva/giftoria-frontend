'use client';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

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
        setPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);

    onUpload(file);
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
  );
};

export default DragAndDropUpload;
