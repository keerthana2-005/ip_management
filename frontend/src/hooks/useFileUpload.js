import { useState } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);

  const validateFile = (file) => {
    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return 'File size exceeds 50MB limit';
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'audio/mpeg',
      'video/mp4',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'Unsupported file type. Please upload PDF, JPG, PNG, MP3, MP4, DOC, or DOCX.';
    }

    return null;
  };

  const uploadToBlockchain = async (options) => {
    if (!file) {
      return { success: false, error: 'No file selected' };
    }

    const validationError = validateFile(file);
    if (validationError) {
      return { success: false, error: validationError };
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate file upload with progress updates
      const totalSteps = 10;
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setUploadProgress(Math.floor((i / totalSteps) * 100));
      }

      // In a real application, here you would:
      // 1. Upload the file to IPFS or similar decentralized storage
      // 2. Register the IPFS hash on the blockchain with metadata
      // 3. Return the transaction details

      // Simulate successful blockchain registration
      const mockTransactionId = '0x' + Math.random().toString(16).substring(2, 34);
      const timestamp = new Date().toISOString();

      // Simulate blockchain confirmation delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const uploadResult = {
        success: true,
        transactionId: mockTransactionId,
        timestamp
      };

      setResult(uploadResult);
      return uploadResult;
    } catch (error) {
      const errorResult = { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred during upload' 
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setResult(null);
  };

  return {
    file,
    setFile,
    isUploading,
    uploadProgress,
    result,
    uploadToBlockchain,
    resetUpload
  };
};

export default useFileUpload;
