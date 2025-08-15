import React, { useState, useEffect } from "react";

const ModalForm = ({ fields, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const defaults = {};
    fields.forEach(f => {
      if (f.type === "checkbox" && initialData && initialData[f.name] === undefined) {
        defaults[f.name] = f.default || false;
      }
      if (f.type === "select" && initialData && initialData[f.name] === undefined) {
        defaults[f.name] = f.default || "";
      }
    });
    setFormData({ ...defaults, ...(initialData || {}) });
  }, [initialData, fields]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to save. See console for details.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  {field.options && field.options.map((opt) => {
                    if (typeof opt === "object") {
                      return <option key={opt.value} value={opt.value}>{opt.label}</option>;
                    }
                    return <option key={opt} value={opt}>{opt}</option>;
                  })}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={field.type === "checkbox" ? undefined : formData[field.name] || ""}
                  checked={field.type === "checkbox" ? !!formData[field.name] : undefined}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
