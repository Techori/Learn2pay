import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";

const MyLeads = () => {
  // Mock data
  const initialLeads = [
    { id: 1, leadName: "Amit Sharma", institute: "Bright Future School", contact: "+91 9876543210", stage: "New", lastUpdated: "2025-06-20" },
    { id: 2, leadName: "Priya Desai", institute: "Excel Academy", contact: "+91 8765432109", stage: "Contacted", lastUpdated: "2025-06-22" },
    { id: 3, leadName: "Vikram Singh", institute: "Knowledge Hub", contact: "+91 7654321098", stage: "KYC Submitted", lastUpdated: "2025-06-23" },
    { id: 4, leadName: "Sneha Patel", institute: "LearnWell Institute", contact: "+91 6543210987", stage: "Onboarded", lastUpdated: "2025-06-24" },
    { id: 5, leadName: "Rohan Mehta", institute: "Smart Kids School", contact: "+91 5432109876", stage: "New", lastUpdated: "2025-06-19" },
  ];

  // State management
  const [leads, setLeads] = useState(initialLeads);
  const [filters, setFilters] = useState({ stage: "", startDate: "", endDate: "", search: "" });
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ leadName: "", contact: "", email: "", institute: "", stage: "New" });
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 3;

  // Filter and search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesStage = !filters.stage || lead.stage === filters.stage;
    const matchesDate = (!filters.startDate || new Date(lead.lastUpdated) >= new Date(filters.startDate)) &&
                       (!filters.endDate || new Date(lead.lastUpdated) <= new Date(filters.endDate));
    const matchesSearch = !filters.search || 
                         lead.leadName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         lead.institute.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStage && matchesDate && matchesSearch;
  });

  // Pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle new lead form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLead.leadName && newLead.contact && newLead.email && newLead.institute) {
      const newLeadEntry = { 
        id: Date.now(), 
        ...newLead, 
        lastUpdated: new Date().toISOString().split('T')[0] 
      };
      setLeads([newLeadEntry, ...leads]);
      setNewLead({ leadName: "", contact: "", email: "", institute: "", stage: "New" });
      setShowModal(false);
    }
  };

  // Quick actions
  const handleView = (id: number) => alert(`Viewing details for lead ID: ${id}`);
  const handleUpdateStage = (id: number) => {
    const newStage = prompt("Enter new stage (New, Contacted, KYC Submitted, Onboarded)") || "New";
    setLeads(leads.map(lead => lead.id === id ? { ...lead, stage: newStage, lastUpdated: new Date().toISOString().split('T')[0] } : lead));
  };
  const handleEdit = (id: number) => alert(`Editing lead ID: ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#101624] p-4">
      <Card>
        <CardHeader>
          <CardTitle>My Leads</CardTitle>
          <Button onClick={() => setShowModal(true)} className="mt-4 bg-orange-500 hover:bg-orange-600">Add New Lead</Button>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              name="stage"
              value={filters.stage}
              onChange={handleFilterChange}
              className="w-full md:w-1/4 p-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
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
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
              className="w-full md:w-1/4 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
            />
            <Input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
              className="w-full md:w-1/4 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
            />
            <Input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by Name or Institute"
              className="w-full md:w-1/4 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
            />
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-[#232b45] text-left">
                  <th className="p-2">Lead Name</th>
                  <th className="p-2">Institute</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Last Updated</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-[#232b45]">
                    <td className="p-2">{lead.leadName}</td>
                    <td className="p-2">{lead.institute}</td>
                    <td className="p-2">{lead.contact}</td>
                    <td className="p-2">{lead.stage}</td>
                    <td className="p-2">{lead.lastUpdated}</td>
                    <td className="p-2 space-x-2">
                      <Button onClick={() => handleView(lead.id)} variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">View</Button>
                      <Button onClick={() => handleUpdateStage(lead.id)} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">Update Stage</Button>
                      <Button onClick={() => handleEdit(lead.id)} variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">Edit</Button>
                      <Button onClick={() => handleDelete(lead.id)} variant="outline" className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} variant="outline" className="bg-gray-500 hover:bg-gray-600 text-white">Previous</Button>
            <span className="text-white">{currentPage} of {totalPages}</span>
            <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} variant="outline" className="bg-gray-500 hover:bg-gray-600 text-white">Next</Button>
          </div>

          {/* Modal for Add New Lead */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#181f32] p-6 rounded-lg w-full max-w-md">
                <h3 className="text-white text-xl mb-4">Add New Lead</h3>
                <form onSubmit={handleAddLead} className="space-y-4">
                  <Input type="text" name="leadName" value={newLead.leadName} onChange={handleInputChange} placeholder="Lead Name" />
                  <Input type="text" name="contact" value={newLead.contact} onChange={handleInputChange} placeholder="Contact Number" />
                  <Input type="email" name="email" value={newLead.email} onChange={handleInputChange} placeholder="Email" />
                  <Input type="text" name="institute" value={newLead.institute} onChange={handleInputChange} placeholder="Institute Name" />
                  <select name="stage" value={newLead.stage} onChange={handleInputChange} className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="KYC Submitted">KYC Submitted</option>
                    <option value="Onboarded">Onboarded</option>
                  </select>
                  <div className="flex justify-end space-x-2">
                    <Button onClick={() => setShowModal(false)} variant="outline" className="bg-red-500 text-white">Cancel</Button>
                    <Button type="submit" variant="outline" className="bg-green-500 text-white">Save</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyLeads;