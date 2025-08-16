import React, { useState, useEffect } from "react";

function ModalForm({ isOpen, onClose, onSubmit, initialData, categories }) {
  const [formData, setFormData] = useState({
    policyName: "",
    categoryId: "",
    spendingLimit: "",
    approvalRequired: true,
    receiptRequired: true,
    effectiveDate: "",
    expiryDate: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        policyName: initialData.policyName || "",
        categoryId: initialData.category?.id || "",
        spendingLimit: initialData.spendingLimit || "",
        approvalRequired: initialData.approvalRequired ?? true,
        receiptRequired: initialData.receiptRequired ?? true,
        effectiveDate: initialData.effectiveDate || "",
        expiryDate: initialData.expiryDate || "",
        isActive: initialData.isActive ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔑 Build payload exactly how backend expects
    const payload = {
      policyName: formData.policyName,
      category: { id: Number(formData.categoryId) },
      spendingLimit: formData.spendingLimit,
      approvalRequired: formData.approvalRequired,
      receiptRequired: formData.receiptRequired,
      effectiveDate: formData.effectiveDate,
      expiryDate: formData.expiryDate,
      isActive: formData.isActive,
    };

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialData ? "Edit Policy" : "Add Policy"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Policy Name</label>
          <input
            type="text"
            name="policyName"
            value={formData.policyName}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">--Select Category--</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Spending Limit</label>
          <input
            type="number"
            name="spendingLimit"
            value={formData.spendingLimit}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="approvalRequired"
              checked={formData.approvalRequired}
              onChange={handleChange}
            />
            Approval Required
          </label>

          <label>
            <input
              type="checkbox"
              name="receiptRequired"
              checked={formData.receiptRequired}
              onChange={handleChange}
            />
            Receipt Required
          </label>

          <label>Effective Date</label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
            required
          />

          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
