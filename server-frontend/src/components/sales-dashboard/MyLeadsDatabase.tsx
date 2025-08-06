import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useTheme } from "../../context/ThemeContext";
import { leadsApi, type Lead, type CreateLeadData, type LeadsFilters } from "../../services/leadsApi";
import ViewLeadModal from "./ViewLeadModal";
import EditLeadModal from "./EditLeadModal";

const MyLeads = () => {
  const { theme } = useTheme();
  
  // Theme variables
  const bgColor = theme === "dark" ? "bg-[#101624]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const inputBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const inputBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const inputText = theme === "dark" ? "text-white" : "text-gray-900";
  const placeholderText = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";
  const tableHeaderBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const tableBorderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const modalBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverBg = theme === "dark" ? "hover:bg-[#232b45]" : "hover:bg-gray-50";

  // State management
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState<LeadsFilters>({ stage: "", startDate: "", endDate: "", search: "", page: 1, limit: 10 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newLead, setNewLead] = useState<CreateLeadData>({ leadName: "", contactPhone: "", instituteName: "", stage: "New" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeads: 0,
    hasNext: false,
    hasPrev: false
  });

  // Load leads from API
  const loadLeads = async (currentFilters: LeadsFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await leadsApi.getAllLeads(currentFilters);
      setLeads(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error loading leads:', error);
      setError('Failed to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadLeads();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value, page: 1 };
    setFilters(newFilters);
    loadLeads(newFilters);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    loadLeads(newFilters);
  };

  // Handle new lead form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLead.leadName && newLead.contactPhone && newLead.instituteName) {
      try {
        setLoading(true);
        await leadsApi.createLead(newLead);
        setNewLead({ leadName: "", contactPhone: "", instituteName: "", stage: "New" });
        setShowAddModal(false);
        loadLeads(); // Reload leads
      } catch (error) {
        console.error('Error creating lead:', error);
        setError('Failed to create lead. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle view lead
  const handleView = async (id: string) => {
    try {
      const response = await leadsApi.getLeadById(id);
      setSelectedLead(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching lead:', error);
      setError('Failed to load lead details.');
    }
  };

  // Handle edit lead
  const handleEdit = async (id: string) => {
    try {
      const response = await leadsApi.getLeadById(id);
      setSelectedLead(response.data);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching lead:', error);
      setError('Failed to load lead details.');
    }
  };

  // Handle save edit
  const handleSaveEdit = async (id: string, updateData: any) => {
    try {
      setLoading(true);
      await leadsApi.updateLead(id, updateData);
      setShowEditModal(false);
      setSelectedLead(null);
      loadLeads(); // Reload leads
    } catch (error) {
      console.error('Error updating lead:', error);
      setError('Failed to update lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle update stage
  const handleUpdateStage = async (id: string) => {
    const newStage = prompt("Enter new stage (New, Contacted, KYC Submitted, Onboarded)") || "New";
    const validStages = ['New', 'Contacted', 'KYC Submitted', 'Onboarded'];
    
    if (!validStages.includes(newStage)) {
      alert('Invalid stage. Please enter one of: New, Contacted, KYC Submitted, Onboarded');
      return;
    }

    try {
      setLoading(true);
      await leadsApi.updateLeadStage(id, newStage);
      loadLeads(); // Reload leads
    } catch (error) {
      console.error('Error updating lead stage:', error);
      setError('Failed to update lead stage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete lead
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        setLoading(true);
        await leadsApi.deleteLead(id);
        loadLeads(); // Reload leads
      } catch (error) {
        console.error('Error deleting lead:', error);
        setError('Failed to delete lead. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${bgColor} p-4`}>
      <Card className={cardBg}>
        <CardHeader>
          <CardTitle className={textColor}>My Leads</CardTitle>
          <Button 
            onClick={() => setShowAddModal(true)} 
            className="mt-4 bg-orange-500 hover:bg-orange-600"
            disabled={loading}
          >
            Add New Lead
          </Button>
        </CardHeader>
        <CardContent>
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
              <button 
                onClick={() => setError(null)}
                className="float-right font-bold text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              name="stage"
              value={filters.stage || ""}
              onChange={handleFilterChange}
              className={`w-full md:w-1/4 p-2 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
              disabled={loading}
            >
              <option value="">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="KYC Submitted">KYC Submitted</option>
              <option value="Onboarded">Onboarded</option>
            </select>
            <Input
              type="date"
              name="startDate"
              value={filters.startDate || ""}
              onChange={handleFilterChange}
              placeholder="Start Date"
              className={`w-full md:w-1/4 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              disabled={loading}
            />
            <Input
              type="date"
              name="endDate"
              value={filters.endDate || ""}
              onChange={handleFilterChange}
              placeholder="End Date"
              className={`w-full md:w-1/4 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              disabled={loading}
            />
            <Input
              type="text"
              name="search"
              value={filters.search || ""}
              onChange={handleFilterChange}
              placeholder="Search by Name or Institute"
              className={`w-full md:w-1/4 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              disabled={loading}
            />
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-4">
              <div className={`${textMuted}`}>Loading leads...</div>
            </div>
          )}

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className={`w-full ${textColor}`}>
              <thead>
                <tr className={`${tableHeaderBg} text-left`}>
                  <th className="p-2">Lead Name</th>
                  <th className="p-2">Institute</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Last Updated</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className={`border-t ${tableBorderColor} ${hoverBg}`}>
                    <td className="p-2">{lead.leadName}</td>
                    <td className="p-2">{lead.instituteName}</td>
                    <td className="p-2">{lead.contactPhone}</td>
                    <td className="p-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        lead.stage === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        lead.stage === 'Contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        lead.stage === 'KYC Submitted' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="p-2">{formatDate(lead.lastUpdated)}</td>
                    <td className="p-2 space-x-2">
                      <Button 
                        onClick={() => handleView(lead._id)} 
                        variant="outline" 
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                        disabled={loading}
                      >
                        View
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStage(lead._id)} 
                        variant="outline" 
                        className="bg-green-500 hover:bg-green-600 text-white text-xs"
                        disabled={loading}
                      >
                        Update Stage
                      </Button>
                      <Button 
                        onClick={() => handleEdit(lead._id)} 
                        variant="outline" 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                        disabled={loading}
                      >
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDelete(lead._id)} 
                        variant="outline" 
                        className="bg-red-500 hover:bg-red-600 text-white text-xs"
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {!loading && leads.length === 0 && (
            <div className="text-center py-8">
              <div className={`${textMuted}`}>No leads found. Try adjusting your filters or add a new lead.</div>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <Button 
                onClick={() => handlePageChange(pagination.currentPage - 1)} 
                disabled={!pagination.hasPrev || loading} 
                variant="outline" 
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Previous
              </Button>
              <span className={textColor}>
                Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalLeads} total leads)
              </span>
              <Button 
                onClick={() => handlePageChange(pagination.currentPage + 1)} 
                disabled={!pagination.hasNext || loading} 
                variant="outline" 
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Next
              </Button>
            </div>
          )}

          {/* Modal for Add New Lead */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${modalBg} p-6 rounded-lg w-full max-w-md border ${inputBorder}`}>
                <h3 className={`${textColor} text-xl mb-4`}>Add New Lead</h3>
                <form onSubmit={handleAddLead} className="space-y-4">
                  <Input 
                    type="text" 
                    name="leadName" 
                    value={newLead.leadName} 
                    onChange={handleInputChange} 
                    placeholder="Lead Name"
                    className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
                    required
                    disabled={loading}
                  />
                  <Input 
                    type="text" 
                    name="contactPhone" 
                    value={newLead.contactPhone} 
                    onChange={handleInputChange} 
                    placeholder="Contact Phone"
                    className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
                    required
                    disabled={loading}
                  />
                  <Input 
                    type="text" 
                    name="instituteName" 
                    value={newLead.instituteName} 
                    onChange={handleInputChange} 
                    placeholder="Institute Name"
                    className={`${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
                    required
                    disabled={loading}
                  />
                  <select 
                    name="stage" 
                    value={newLead.stage} 
                    onChange={handleInputChange} 
                    className={`w-full p-2 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
                    disabled={loading}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="KYC Submitted">KYC Submitted</option>
                    <option value="Onboarded">Onboarded</option>
                  </select>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button"
                      onClick={() => setShowAddModal(false)} 
                      variant="outline" 
                      className="bg-red-500 text-white"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="outline" 
                      className="bg-green-500 text-white"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* View Lead Modal */}
          <ViewLeadModal
            lead={selectedLead}
            isOpen={showViewModal}
            onClose={() => {
              setShowViewModal(false);
              setSelectedLead(null);
            }}
          />

          {/* Edit Lead Modal */}
          <EditLeadModal
            lead={selectedLead}
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedLead(null);
            }}
            onSave={handleSaveEdit}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyLeads;
