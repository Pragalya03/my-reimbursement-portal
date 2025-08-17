import React, { useState, useEffect } from "react";

const ModalForm = ({ fields, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const defaults = {};
    fields.forEach(f => {
      if (f.type === "checkbox") defaults[f.name] = f.default || false;
      if (f.type === "select" && initialData?.[f.name] === undefined) {
        defaults[f.name] = f.options?.[0]?.value || "";
      }
      if (f.type === "date" && f.default && !initialData?.[f.name]) {
        defaults[f.name] = f.default;
      }
    });
    setFormData({ ...defaults, ...(initialData || {}) });
  }, [initialData, fields]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
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
          {fields.map(f => (
            <div key={f.name} className="form-group">
              <label>{f.label}</label>
              {f.type === "select" ? (
                <select
                  name={f.name}
                  value={formData[f.name] || ""}
                  onChange={handleChange}
                >
                  {f.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  name={f.name}
                  value={f.type === "checkbox" ? undefined : formData[f.name] || ""}
                  checked={f.type === "checkbox" ? !!formData[f.name] : undefined}
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
