import React from 'react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { type Lead } from '../../services/leadsApi';

interface ViewLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewLeadModal: React.FC<ViewLeadModalProps> = ({ lead, isOpen, onClose }) => {
  const { theme } = useTheme();

  const modalBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const borderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";

  if (!isOpen || !lead) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'KYC Submitted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Onboarded':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${modalBg} p-6 rounded-lg w-full max-w-lg border ${borderColor}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`${textColor} text-xl font-semibold`}>Lead Details</h3>
          <button
            onClick={onClose}
            className={`${textMuted} hover:${textColor} text-2xl font-bold`}
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Lead Name */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Lead Name
            </label>
            <p className={`${textColor} text-lg font-semibold`}>{lead.leadName}</p>
          </div>

          {/* Institute Name */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Institute Name
            </label>
            <p className={`${textColor}`}>{lead.instituteName}</p>
          </div>

          {/* Contact Phone */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Contact Phone
            </label>
            <p className={`${textColor}`}>{lead.contactPhone}</p>
          </div>

          {/* Sales Owner */}
          {lead.salesOwner && (
            <div>
              <label className={`${textMuted} text-sm font-medium block mb-1`}>
                Sales Owner
              </label>
              <p className={`${textColor}`}>
                {lead.salesOwner.name} ({lead.salesOwner.email})
              </p>
            </div>
          )}

          {/* Stage */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Stage
            </label>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStageColor(lead.stage)}`}>
              {lead.stage}
            </span>
          </div>

          {/* Last Updated */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Last Updated
            </label>
            <p className={`${textColor}`}>{formatDate(lead.lastUpdated)}</p>
          </div>

          {/* Created At */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Created At
            </label>
            <p className={`${textColor}`}>{formatDate(lead.createdAt)}</p>
          </div>

          {/* Lead ID */}
          <div>
            <label className={`${textMuted} text-sm font-medium block mb-1`}>
              Lead ID
            </label>
            <p className={`${textMuted} text-sm font-mono`}>{lead._id}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={onClose} 
            variant="outline" 
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeadModal;
