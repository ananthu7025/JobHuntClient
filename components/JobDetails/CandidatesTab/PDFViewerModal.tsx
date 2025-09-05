import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBase64: string;
  candidateName: string;
  fileName?: string;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  pdfBase64,
  candidateName,
  fileName = "Resume"
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (pdfBase64 && isOpen) {
      try {
        setIsLoading(true);
        setError("");
        
        // Convert base64 to blob URL
        const byteCharacters = atob(pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        setPdfUrl(url);
        setIsLoading(false);
      } catch (err) {
        console.error("Error processing PDF:", err);
        setError("Failed to load PDF. Please try again.");
        setIsLoading(false);
      }
    }

    // Cleanup function to revoke URL
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfBase64, isOpen]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${candidateName}_${fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClose = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl("");
    }
    setIsLoading(true);
    setError("");
    onClose();
  };

  const modalStyles = {
    content: {
      top: '5%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      padding: '0',
      border: 'none',
      borderRadius: '12px',
      background: '#f8f9fa',
      overflow: 'hidden'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="pdf-viewer-modal">
        <div className="pdf-viewer-header">
          <div className="pdf-info">
            <h3>
              <i className="fas fa-file-pdf"></i>
              {candidateName} - {fileName}
            </h3>
            <p className="pdf-subtitle">Resume PDF Viewer</p>
          </div>
          
          <div className="pdf-actions">
            <button 
              className="pdf-action-btn download-btn" 
              onClick={handleDownload}
              disabled={!pdfUrl || isLoading}
              title="Download PDF"
            >
              <i className="fas fa-download"></i>
              Download
            </button>
            
            <button 
              className="pdf-action-btn print-btn" 
              onClick={() => window.open(pdfUrl, '_blank')}
              disabled={!pdfUrl || isLoading}
              title="Open in new tab"
            >
              <i className="fas fa-external-link-alt"></i>
              Open
            </button>
            
            <button className="close-btn" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="pdf-viewer-content">
          {isLoading && (
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          )}

          {error && (
            <div className="pdf-error">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h4>Error Loading PDF</h4>
              <p>{error}</p>
              <button 
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-redo"></i>
                Retry
              </button>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <div className="pdf-embed-container">
              <iframe
                src={pdfUrl}
                title={`${candidateName} Resume`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PDFViewerModal;