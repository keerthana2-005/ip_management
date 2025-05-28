import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Info } from 'lucide-react'; // Added XCircle for error, Info for idle/loading

const UploadSection = () => {
  // State for file upload
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  
  // State for metadata form inputs
  const [title, setTitle] = useState('');
  const [workType, setWorkType] = useState('');
  const [description, setDescription] = useState('');

  // State for displaying uploaded IPFS data after successful submission
  const [uploadedArtworkCID, setUploadedArtworkCID] = useState(null);
  const [uploadedMetadataCID, setUploadedMetadataCID] = useState(null);
  const [uploadedTitle, setUploadedTitle] = useState(null);
  const [uploadedWorkType, setUploadedWorkType] = useState(null);
  const [uploadedDescription, setUploadedDescription] = useState(null);
  const [pinataGateway, setPinataGateway] = useState(null); // Received from backend

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
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation: Check if file and all metadata fields are filled
    if (!selectedFile || !title || !workType || !description) {
      setUploadStatus('error');
      // Set a temporary message for the user that fields are missing
      setTimeout(() => {
        setUploadStatus('idle'); // Clear the error message after some time
      }, 3000); 
      return; // Stop the submission
    }

    setUploadStatus('uploading');
    // Clear previous display data before a new upload attempt
    setUploadedArtworkCID(null);
    setUploadedMetadataCID(null);
    setUploadedTitle(null);
    setUploadedWorkType(null);
    setUploadedDescription(null);
    setPinataGateway(null);

    try {
      const formData = new FormData();
      formData.append('actualData', selectedFile); // This name MUST match `upload.single('actualData')` in backend
      formData.append('title', title);
      formData.append('workType', workType);
      formData.append('description', description);

      // Fetch call to your Node.js backend
      // Ensure this URL and port match your backend's configuration
      const response = await fetch('http://localhost:5000/upload-to-ipfs', {
        method: 'POST',
        body: formData, // Multer expects FormData for file and text fields
      });

      if (!response.ok) {
        // If response is not OK (e.g., 400, 500 status)
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed due to server error.');
      }

      const data = await response.json();
      
      // Store the CIDs and metadata received from the backend for display
      setUploadedArtworkCID(data.artworkCID);
      setUploadedMetadataCID(data.metadataCID);
      setUploadedTitle(data.title);
      setUploadedWorkType(data.workType);
      setUploadedDescription(data.description);
      setPinataGateway(data.pinataGateway); // Store the gateway URL from backend

      setUploadStatus('success');

      // Optionally clear form fields after successful upload for new entry
      setTitle('');
      setWorkType('');
      setDescription('');
      setSelectedFile(null);

      // Status message visibility duration
      setTimeout(() => {
        setUploadStatus('idle'); 
      }, 6000); 
      
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('error');
      setTimeout(() => {
        setUploadStatus('idle'); 
      }, 6000); // Error message visible for 6 seconds
    }
  };
  
  // Helper to determine media type for display (image, audio, video, iframe for documents)
  const getMediaType = (workType, artworkCid) => {
    if (!artworkCid) return 'unknown'; // Ensure CID exists
    const extension = artworkCid.split('.').pop()?.toLowerCase(); // Simple extension check

    if (workType === 'Digital Art' || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return 'image';
    }
    if (workType === 'Music' || ['mp3', 'wav', 'ogg'].includes(extension)) {
      return 'audio';
    }
    if (workType === 'Video' || ['mp4', 'webm'].includes(extension)) {
      return 'video';
    }
    if (workType === 'Literature' || ['pdf', 'txt', 'html'].includes(extension)) { // Added html
      return 'iframe'; // For PDFs, text files, HTML
    }
    return 'unknown';
  };

  // Inline styles (using Tailwind-like values for consistency and direct application)
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#000', // Full-width black background
    color: '#fff', // White text color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 1rem',
    fontFamily: 'Inter, sans-serif', // Using Inter font
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '2.5rem', // Larger title
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '0.75rem',
  };

  const subtitleStyle = {
    color: '#D1D5DB',
    maxWidth: '40rem',
    margin: '0 auto',
    fontSize: '1.125rem',
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
    padding: '0.75rem 1rem', // Increased padding
    color: 'white', // White text
    fontSize: '1rem',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center', // Center content in button
    gap: '0.5rem', // Space between icon and text
    padding: '1rem 2rem', // Increased padding
    border: 'none',
    color: 'white',
    fontSize: '1.125rem', // Larger font size
    fontWeight: '600', // Bolder font
    borderRadius: '0.5rem', // More rounded
    backgroundColor: '#6366F1', // Indigo-500
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
    boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)', // Subtle shadow
    ':hover': { backgroundColor: '#4F46E5' }, // Hover effect, if supported by styled-components/emotion
  };

  // Add styles for disabled state
  const disabledButtonStyle = {
    backgroundColor: '#4B5563', // Gray-600 for disabled
    cursor: 'not-allowed',
    boxShadow: 'none',
  };

  const statusMessageStyle = {
    marginTop: '2rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    minHeight: '3rem', // Ensure consistent height
    display: 'flex', // Use flex for vertical centering
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ...(uploadStatus === 'success' ? { backgroundColor: '#D4EDDA', color: '#155724' } : {}), // Light green, dark green text
    ...(uploadStatus === 'error' ? { backgroundColor: '#F8D7DA', color: '#721C24' } : {}), // Light red, dark red text
    ...(uploadStatus === 'uploading' ? { backgroundColor: '#D1ECF1', color: '#0C5460' } : {}), // Light blue, dark blue text
    ...(uploadStatus === 'idle' ? { display: 'none' } : {}), // Hidden when idle
  };

  const displaySectionStyle = {
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  };

  const cidLinkStyle = {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '0.3rem 0.6rem',
    borderRadius: '0.3rem',
    wordBreak: 'break-all',
    display: 'inline-block',
    marginTop: '0.5rem',
    color: '#E0E7FF', // Light blue for links
    textDecoration: 'none', // Remove underline
  };
  cidLinkStyle[':hover'] = { textDecoration: 'underline' }; // Add underline on hover

  const mediaContainerStyle = {
    marginTop: '2rem',
    textAlign: 'center',
  };

  const commonMediaStyle = {
    borderRadius: '0.75rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto', // Center media
    display: 'block', // To allow margin:auto
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '64rem', width: '100%' }}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Upload Your Work</h2>
          <p style={subtitleStyle}>
            Secure your intellectual property on IPFS. Get content-addressed proof of ownership.
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label htmlFor="work-title" style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                  Title/Name of Your Work
                </label>
                <input
                  type="text"
                  name="work-title"
                  id="work-title"
                  style={inputStyle}
                  placeholder="e.g., My Digital Artwork"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required // HTML5 required attribute
                />
              </div>
              <div>
                <label htmlFor="work-type" style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                  Work Type
                </label>
                <select
                  id="work-type"
                  name="work-type"
                  style={inputStyle}
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  required // HTML5 required attribute
                >
                  <option value="">Select Type</option> {/* Empty value for default */}
                  <option value="Digital Art">Digital Art</option>
                  <option value="Music">Music</option>
                  <option value="Literature">Literature</option>
                  <option value="Software">Software</option>
                  <option value="Research">Research</option>
                  <option value="Patent">Patent</option>
                  <option value="Other">Other</option>
                  <option value="Video">Video</option> {/* Added Video type */}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required // HTML5 required attribute
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button
                type="submit"
                // Disable if no file or any required metadata field is empty, or if uploading
                disabled={!selectedFile || !title || !workType || !description || uploadStatus === 'uploading'}
                style={{ ...buttonStyle, ...((!selectedFile || !title || !workType || !description || uploadStatus === 'uploading') ? disabledButtonStyle : {}),
                  ...(uploadStatus === 'uploading' ? { backgroundColor: '#4F46E5', animation: 'pulse 1s infinite' } : {}),
                  ...(uploadStatus === 'success' ? { backgroundColor: '#10B981', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' } : {}),
                  ...(uploadStatus === 'error' ? { backgroundColor: '#EF4444', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' } : {})
                }}
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
                    <XCircle style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                    Error Uploading
                  </>
                ) : (
                  'Upload File to IPFS'
                )}
              </button>
            </div>
          </form>
          <div style={statusMessageStyle}>
            {uploadStatus === 'uploading' && <><Info style={{ width: '1.25rem', height: '1.25rem'}} /> Pinning to IPFS...</>}
            {uploadStatus === 'success' && <><CheckCircle style={{ width: '1.25rem', height: '1.25rem'}} /> Data and metadata pinned to IPFS!</>}
            {uploadStatus === 'error' && <><XCircle style={{ width: '1.25rem', height: '1.25rem'}} /> Upload failed. Check console for details or fill all fields.</>}
          </div>
        </div>

        {/* Display Section - Only rendered if CIDs are available */}
        {(uploadedArtworkCID && uploadedMetadataCID && pinataGateway) && (
          <div style={displaySectionStyle}>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
              Your Work on IPFS
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '0.75rem' }}><strong>Title:</strong> {uploadedTitle}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>Work Type:</strong> {uploadedWorkType}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>Description:</strong> {uploadedDescription}</p>
              <p style={{ marginBottom: '0.75rem' }}>
                <strong>Actual Data CID:</strong>{' '}
                <a href={`https://${pinataGateway}/ipfs/${uploadedArtworkCID}`} target="_blank" rel="noopener noreferrer" style={cidLinkStyle}>
                  {uploadedArtworkCID}
                </a>
              </p>
              <p>
                <strong>Metadata CID:</strong>{' '}
                <a href={`https://${pinataGateway}/ipfs/${uploadedMetadataCID}`} target="_blank" rel="noopener noreferrer" style={cidLinkStyle}>
                  {uploadedMetadataCID}
                </a>
              </p>
            </div>

            <div style={mediaContainerStyle}>
              {getMediaType(uploadedWorkType, uploadedArtworkCID) === 'image' && (
                <img 
                  src={`https://${pinataGateway}/ipfs/${uploadedArtworkCID}`} 
                  alt={uploadedTitle || 'Uploaded Artwork'} 
                  style={commonMediaStyle} 
                />
              )}
              {getMediaType(uploadedWorkType, uploadedArtworkCID) === 'audio' && (
                <audio 
                  src={`https://${pinataGateway}/ipfs/${uploadedArtworkCID}`} 
                  controls 
                  style={{...commonMediaStyle, width: '100%', maxWidth: '400px'}} 
                />
              )}
              {getMediaType(uploadedWorkType, uploadedArtworkCID) === 'video' && (
                <video 
                  src={`https://${pinataGateway}/ipfs/${uploadedArtworkCID}`} 
                  controls 
                  style={{...commonMediaStyle, width: '100%'}} 
                />
              )}
              {getMediaType(uploadedWorkType, uploadedArtworkCID) === 'iframe' && (
                <iframe 
                  src={`https://${pinataGateway}/ipfs/${uploadedArtworkCID}`} 
                  title={uploadedTitle || 'Uploaded Document'} 
                  style={{...commonMediaStyle, width: '100%', height: '500px'}} 
                />
              )}
              {getMediaType(uploadedWorkType, uploadedArtworkCID) === 'unknown' && (
                <p style={{ color: '#D1D5DB' }}>
                  Cannot display this file type directly. Please use the CID link above to view.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
