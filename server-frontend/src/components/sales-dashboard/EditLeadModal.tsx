import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useTheme } from '../../context/ThemeContext';
import { type Lead, type UpdateLeadData } from '../../services/leadsApi';

interface EditLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: UpdateLeadData) => Promise<void>;
  isLoading?: boolean;
}

const EditLeadModal: React.FC<EditLeadModalProps> = ({ 
  lead, 
  isOpen, 
  onClose, 
  onSave, 
  isLoading = false 
}) => {
  const { theme } = useTheme();

  const modalBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const inputBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const inputBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const inputText = theme === "dark" ? "text-white" : "text-gray-900";
  const placeholderText = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";

  const [formData, setFormData] = useState<UpdateLeadData>({
    leadName: '',
    instituteName: '',
    contactPhone: '',
    stage: 'New'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lead && isOpen) {
      setFormData({
        leadName: lead.leadName,
        instituteName: lead.instituteName,
        contactPhone: lead.contactPhone,
        stage: lead.stage
      });
      setErrors({});
    }
  }, [lead, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.leadName?.trim()) {
      newErrors.leadName = 'Lead name is required';
    }

    if (!formData.instituteName?.trim()) {
      newErrors.instituteName = 'Institute name is required';
    }

    if (!formData.contactPhone?.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    if (!formData.stage) {
      newErrors.stage = 'Stage is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lead || !validateForm()) {
      return;
    }

    try {
      await onSave(lead._id, formData);
      onClose();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      leadName: '',
      instituteName: '',
      contactPhone: '',
      stage: 'New'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${modalBg} p-6 rounded-lg w-full max-w-md border ${borderColor}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`${textColor} text-xl font-semibold`}>Edit Lead</h3>
          <button
            onClick={handleClose}
            className={`${textMuted} hover:${textColor} text-2xl font-bold`}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Lead Name */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Lead Name *
            </label>
            <Input
              type="text"
              name="leadName"
              value={formData.leadName || ''}
              onChange={handleInputChange}
              placeholder="Enter lead name"
              className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText} ${
                errors.leadName ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
            />
            {errors.leadName && (
              <p className="text-red-500 text-sm mt-1">{errors.leadName}</p>
            )}
          </div>

          {/* Institute Name */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Institute Name *
            </label>
            <Input
              type="text"
              name="instituteName"
              value={formData.instituteName || ''}
              onChange={handleInputChange}
              placeholder="Enter institute name"
              className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText} ${
                errors.instituteName ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
            />
            {errors.instituteName && (
              <p className="text-red-500 text-sm mt-1">{errors.instituteName}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Contact Phone *
            </label>
            <Input
              type="text"
              name="contactPhone"
              value={formData.contactPhone || ''}
              onChange={handleInputChange}
              placeholder="Enter contact phone"
              className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText} ${
                errors.contactPhone ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
            )}
          </div>

          {/* Stage */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Stage *
            </label>
            <select
              name="stage"
              value={formData.stage || 'New'}
              onChange={handleInputChange}
              className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${inputText} ${
                errors.stage ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="KYC Submitted">KYC Submitted</option>
              <option value="Onboarded">Onboarded</option>
            </select>
            {errors.stage && (
              <p className="text-red-500 text-sm mt-1">{errors.stage}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="bg-gray-500 hover:bg-gray-600 text-white"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;
