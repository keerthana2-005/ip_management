import React, { useState } from 'react';
import { Upload, FilePlus, FileText, CheckCircle } from 'lucide-react';

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [ipfsLink, setIpfsLink] = useState(null);


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!selectedFile) return;

  //   try {
  //     setUploadStatus('uploading');
      
  //     // Simulate upload delay
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Here you would connect to your blockchain service to register the IP
  //     console.log('Uploading file:', selectedFile.name);
      
  //     setUploadStatus('success');
      
  //     // Reset form after successful upload
  //     setTimeout(() => {
  //       setSelectedFile(null);
  //       setUploadStatus('idle');
  //     }, 3000);
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     setUploadStatus('error');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
  
    try {
      setUploadStatus('uploading');
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      const ipfsUrl = `https://ipfs.io/ipfs/${data.cid}`;
  
      // 👇 Just log the link here
      console.log('File uploaded to IPFS:', ipfsUrl);
  
      setUploadStatus('success');
  
      setTimeout(() => {
        setSelectedFile(null);
        setUploadStatus('idle');
      }, 6000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
    }
  };
  
  
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'black', // Full-width black background
    color: 'white', // White text color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 1rem',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
  };

  const subtitleStyle = {
    color: '#D1D5DB',
    maxWidth: '40rem',
    margin: '0 auto',
  };

  const dropzoneStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)', // White border
    transition: 'all 0.3s',
    ...(dragActive ? { borderColor: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}),
  };

  const fileInputStyle = {
    border: '2px dashed #4B5563',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ...(dragActive ? { borderColor: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}),
  };

  const inputStyle = {
    marginTop: '0.25rem',
    width: '100%',
    backgroundColor: 'rgba(31, 41, 55, 0.7)', // Dark input background
    border: '1px solid rgba(255, 255, 255, 0.3)', // Light border for inputs
    borderRadius: '0.375rem',
    padding: '0.5rem 0.75rem',
    color: 'white', // White text
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    backgroundColor: '#4F46E5', // Dark blue button color
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ...(uploadStatus === 'uploading' ? { backgroundColor: '#4338CA', animation: 'pulse 1s infinite' } : {}),
    ...(uploadStatus === 'success' ? { backgroundColor: '#10B981' } : {}),
    ...(uploadStatus === 'error' ? { backgroundColor: '#EF4444' } : {}),
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '64rem', width: '100%' }}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Upload Your Work</h2>
          <p style={subtitleStyle}>
            Secure your intellectual property on the blockchain in minutes. Get timestamped proof of ownership.
          </p>
        </div>

        <div style={dropzoneStyle}>
          <form onSubmit={handleSubmit}>
            <div
              style={fileInputStyle}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {selectedFile ? (
                <div>
                  <FileText style={{ height: '3rem', width: '3rem', color: '#FFFFFF', marginBottom: '0.75rem' }} />
                  <p style={{ color: 'white', fontSize: '1.125rem', fontWeight: '500' }}>{selectedFile.name}</p>
                  <p style={{ color: '#D1D5DB', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <Upload style={{ height: '3rem', width: '3rem', color: '#FFFFFF', marginBottom: '0.75rem' }} />
                  <p style={{ color: 'white', fontSize: '1.125rem', fontWeight: '500' }}>
                    Drag and drop your file here
                  </p>
                  <p style={{ color: '#D1D5DB', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    or click to browse your files
                  </p>
                  <p style={{ color: '#D1D5DB', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                    Supported formats: PDF, JPG, PNG, MP3, MP4 (max 50MB)
                  </p>
                </div>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
              <div style={{ flexGrow: 1 }}>
                <label htmlFor="work-title" style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                  Title/Name of Your Work
                </label>
                <input
                  type="text"
                  name="work-title"
                  id="work-title"
                  style={inputStyle}
                  placeholder="e.g., My Digital Artwork"
                />
              </div>
              <div style={{ width: '30%' }}>
                <label htmlFor="work-type" style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                  Work Type
                </label>
                <select
                  id="work-type"
                  name="work-type"
                  style={inputStyle}
                >
                  <option>Digital Art</option>
                  <option>Music</option>
                  <option>Literature</option>
                  <option>Software</option>
                  <option>Research</option>
                  <option>Patent</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label htmlFor="description" style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                style={inputStyle}
                placeholder="Describe your work in detail..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                type="submit"
                disabled={!selectedFile || uploadStatus === 'uploading'}
                style={buttonStyle}
              >
                {uploadStatus === 'uploading' ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 12-7.466A6.992 6.992 0 0 0 12 4v1.25A8.014 8.014 0 0 0 4 12z" />
                    </svg>
                    Uploading...
                  </>
                ) : uploadStatus === 'success' ? (
                  <>
                    <CheckCircle style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                    Uploaded Successfully
                  </>
                ) : uploadStatus === 'error' ? (
                  <>
                    <FileText style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                    Error
                  </>
                ) : (
                  'Upload File'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
