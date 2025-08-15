import React, { useState } from "react";
import "./ReceiptUpload.css";

function ReceiptUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", file);

    try {
      const res = await fetch("/api/receipts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setSuccess("Receipt uploaded successfully!");
      setFile(null);
      if (onUpload) onUpload();
    } catch (err) {
      setError(err.message || "Upload error");
    }
  };

  return (
    <div className="receipt-upload">
      <h3>Upload Receipt</h3>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ReceiptUpload;
