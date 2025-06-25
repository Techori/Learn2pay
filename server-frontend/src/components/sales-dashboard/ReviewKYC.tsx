import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  MessageCircle,
  Send,
  ArrowUpDown,
  Loader2,
  FileText,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

interface KYC {
  id: number;
  instituteName: string;
  salesperson: string;
  submissionDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Forwarded";
  documents: { [key: string]: string };
  comments: { text: string; timestamp: string; by: string }[];
  rejectionReason?: string;
}

const ReviewKYC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [salespersonFilter, setSalespersonFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortConfig, setSortConfig] = useState<{ key: keyof KYC; direction: "asc" | "desc" } | null>(null);
  const [loading, setLoading] = useState(true);
  const [kyCs, setKyCs] = useState<KYC[]>([]);
  const [selectedKYC, setSelectedKYC] = useState<KYC | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [kyCsPerPage] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      setKyCs([
        { id: 1, instituteName: "Sunrise Public School", salesperson: "Ravi Kumar", submissionDate: "2025-06-20", status: "Pending", documents: { PAN: "Uploaded", GST: "Pending", Agreement: "Uploaded" }, comments: [] },
        { id: 2, instituteName: "Excel Coaching Center", salesperson: "Priya Patel", submissionDate: "2025-06-21", status: "Approved", documents: { PAN: "Uploaded", GST: "Uploaded", Agreement: "Uploaded" }, comments: [{ text: "Looks good", timestamp: "2025-06-22 10:00 IST", by: "Sales Manager" }] },
        { id: 3, instituteName: "Modern Academy", salesperson: "Vikram Singh", submissionDate: "2025-06-23", status: "Rejected", documents: { PAN: "Uploaded", GST: "Pending", Agreement: "Pending" }, comments: [{ text: "Missing GST", timestamp: "2025-06-24 09:30 IST", by: "Sales Manager" }], rejectionReason: "Missing GST document" },
        { id: 4, instituteName: "Bright Future School", salesperson: "Sneha Desai", submissionDate: "2025-06-19", status: "Forwarded", documents: { PAN: "Uploaded", GST: "Uploaded", Agreement: "Uploaded" }, comments: [{ text: "Forwarded for review", timestamp: "2025-06-24 11:00 IST", by: "Sales Manager" }] },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const uniqueSalespeople = Array.from(new Set(kyCs.map((k) => k.salesperson)));
  const uniqueStatuses = ["Pending", "Approved", "Rejected", "Forwarded"];

  const filteredKyCs = kyCs.filter((kyc) => {
    const matchesSearch = kyc.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) || kyc.salesperson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalesperson = !salespersonFilter || kyc.salesperson === salespersonFilter;
    const matchesStatus = !statusFilter || kyc.status === statusFilter;
    const matchesDate = (!dateRange.from || new Date(kyc.submissionDate) >= new Date(dateRange.from)) && (!dateRange.to || new Date(kyc.submissionDate) <= new Date(dateRange.to));
    return matchesSearch && matchesSalesperson && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredKyCs.length / kyCsPerPage);
  const paginatedKyCs = filteredKyCs.slice((currentPage - 1) * kyCsPerPage, currentPage * kyCsPerPage);

  const sortedKyCs = React.useMemo(() => {
    let sortableKyCs = [...paginatedKyCs];
    if (sortConfig !== null) {
      sortableKyCs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableKyCs;
  }, [paginatedKyCs, sortConfig]);

  const requestSort = (key: keyof KYC) => {
    setSortConfig((prev) => (prev && prev.key === key && prev.direction === "asc" ? { key, direction: "desc" } : { key, direction: "asc" }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-900/60 text-yellow-300";
      case "Approved": return "bg-green-900/60 text-green-300";
      case "Rejected": return "bg-red-900/60 text-red-300";
      case "Forwarded": return "bg-blue-900/60 text-blue-300";
      default: return "bg-gray-800 text-gray-300";
    }
  };

  const handleApprove = (kyc: KYC) => {
    const updatedKyCs = kyCs.map((k) => k.id === kyc.id ? { ...k, status: "Approved" } : k);
    setKyCs(updatedKyCs);
    toast({ title: "Approved", description: `${kyc.instituteName} approved.` });
  };

  const handleReject = (kyc: KYC) => {
    if (!rejectionReason) {
      toast({ title: "Error", description: "Rejection reason is required.", variant: "destructive" });
      return;
    }
    const updatedKyCs = kyCs.map((k) => k.id === kyc.id ? { ...k, status: "Rejected", rejectionReason } : k);
    setKyCs(updatedKyCs);
    setShowRejectModal(false);
    setRejectionReason("");
    toast({ title: "Rejected", description: `${kyc.instituteName} rejected.` });
  };

  const handleComment = (kyc: KYC) => {
    if (!commentText.trim()) return;
    const updatedKyCs = kyCs.map((k) => k.id === kyc.id ? { ...k, comments: [...k.comments, { text: commentText, timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), by: "Sales Manager" }] } : k);
    setKyCs(updatedKyCs);
    setCommentText("");
    toast({ title: "Comment Added", description: `Comment added to ${kyc.instituteName}.` });
  };

  const handleForward = (kyc: KYC) => {
    if (kyc.status !== "Approved") {
      toast({ title: "Error", description: "Only Approved KYCs can be forwarded.", variant: "destructive" });
      return;
    }
    const updatedKyCs = kyCs.map((k) => k.id === kyc.id ? { ...k, status: "Forwarded" } : k);
    setKyCs(updatedKyCs);
    toast({ title: "Forwarded", description: `${kyc.instituteName} forwarded to Super Admin at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", " ")}.` });
  };

  const handleGenerateReport = () => {
    const csvContent = [["KYC ID", "Institute Name", "Salesperson", "Submission Date", "Status"], ...kyCs.map((k) => [k.id, k.instituteName, k.salesperson, k.submissionDate, k.status])].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kyc_review_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[#101624]"><Loader2 className="h-8 w-8 animate-spin text-orange-400" /></div>;
  }

  if (kyCs.length === 0) {
    return <div className="flex justify-center items-center h-screen bg-[#101624] text-white">No KYCs submitted yet.</div>;
  }

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6">
        <div className="relative flex-1"><Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><Input placeholder="Search by institute or salesperson..." className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="relative"><select className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={salespersonFilter || ""} onChange={(e) => setSalespersonFilter(e.target.value || null)}><option value="">Salesperson</option>{uniqueSalespeople.map((salesperson) => <option key={salesperson} value={salesperson}>{salesperson}</option>)}</select></div>
        <div className="relative"><select className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={statusFilter || ""} onChange={(e) => setStatusFilter(e.target.value || null)}><option value="">Status</option>{uniqueStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></div>
        <div className="flex items-center space-x-2"><input type="date" className="rounded bg-[#232b45] border border-[#232b45] text-gray-300 px-2 py-2" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} /><span className="text-gray-400">to</span><input type="date" className="rounded bg-[#232b45] border border-[#232b45] text-gray-300 px-2 py-2" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} /></div>
        {(salespersonFilter || statusFilter || dateRange.from || dateRange.to) && <Button variant="outline" className="border-[#232b45] text-gray-300" onClick={() => { setSalespersonFilter(null); setStatusFilter(null); setDateRange({ from: "", to: "" }); }}>Reset Filters</Button>}
      </div>
      <Filter className="h-4 w-4 text-gray-400 mt-2 md:mt-0" />
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div><CardTitle className="text-white">KYC Review</CardTitle><CardDescription className="text-gray-400">Review and manage KYC submissions</CardDescription></div>
            <Button variant="outline" className="border-[#ff7900] text-orange-400 hover:bg-orange-500/10" onClick={handleGenerateReport}><FileText className="h-4 w-4 mr-2" /> Generate Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full text-white">
            <TableHeader>
              <TableRow className="bg-[#232b45]">
                <TableHead className="text-orange-400"><button className="flex items-center" onClick={() => requestSort("id")}>KYC ID<ArrowUpDown className="ml-1 h-4 w-4" /></button></TableHead>
                <TableHead className="text-orange-400"><button className="flex items-center" onClick={() => requestSort("instituteName")}>Institute Name<ArrowUpDown className="ml-1 h-4 w-4" /></button></TableHead>
                <TableHead className="text-orange-400"><button className="flex items-center" onClick={() => requestSort("salesperson")}>Salesperson<ArrowUpDown className="ml-1 h-4 w-4" /></button></TableHead>
                <TableHead className="text-orange-400"><button className="flex items-center" onClick={() => requestSort("submissionDate")}>Submission Date<ArrowUpDown className="ml-1 h-4 w-4" /></button></TableHead>
                <TableHead className="text-orange-400"><button className="flex items-center" onClick={() => requestSort("status")}>Status<ArrowUpDown className="ml-1 h-4 w-4" /></button></TableHead>
                <TableHead className="text-orange-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedKyCs.map((kyc) => (
                <TableRow key={kyc.id} className="hover:bg-[#232b45]/60">
                  <TableCell className="font-medium">{kyc.id}</TableCell>
                  <TableCell>{kyc.instituteName}</TableCell>
                  <TableCell>{kyc.salesperson}</TableCell>
                  <TableCell>{kyc.submissionDate}</TableCell>
                  <TableCell><Badge className={getStatusColor(kyc.status)}>{kyc.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Dialog>
                        <DialogTrigger asChild><Button size="sm" variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10" onClick={() => setSelectedKYC(kyc)}><Eye className="h-3 w-3" /></Button></DialogTrigger>
                        <DialogContent><DialogHeader><DialogTitle>{kyc.instituteName} KYC Details</DialogTitle></DialogHeader><div className="space-y-2 text-sm text-gray-300"><p><strong>Institute:</strong> {kyc.instituteName}</p><p><strong>Submitted By:</strong> {kyc.salesperson}</p><p><strong>Submission Date:</strong> {kyc.submissionDate}</p><p><strong>Documents:</strong></p><ul>{Object.entries(kyc.documents).map(([doc, status]) => <li key={doc}>{doc}: {status}</li>)}</ul><p><strong>Comments:</strong></p>{kyc.comments.length > 0 ? <ul>{kyc.comments.map((comment, index) => <li key={index}>{comment.text} (by {comment.by}, {comment.timestamp})</li>)}</ul> : <p>No comments yet.</p>}</div></DialogContent>
                      </Dialog>
                      {kyc.status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline" className="border-[#232b45] text-green-400 hover:bg-orange-500/10" onClick={() => handleApprove(kyc)} disabled={kyc.status !== "Pending"}><CheckCircle className="h-3 w-3" /></Button>
                          <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}><DialogTrigger asChild><Button size="sm" variant="outline" className="border-[#232b45] text-red-400 hover:bg-orange-500/10" disabled={kyc.status !== "Pending"}><XCircle className="h-3 w-3" /></Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Reject {kyc.instituteName}</DialogTitle></DialogHeader><Input placeholder="Enter rejection reason" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="mb-2" /><Button onClick={() => handleReject(kyc)} className="bg-red-500 text-white">Submit Rejection</Button></DialogContent></Dialog>
                          <Button size="sm" variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10" onClick={() => handleComment(kyc)} disabled={kyc.status === "Forwarded"}><MessageCircle className="h-3 w-3" /></Button>
                        </>
                      )}
                      {kyc.status === "Approved" && <Button size="sm" variant="outline" className="border-[#232b45] text-blue-400 hover:bg-orange-500/10" onClick={() => handleForward(kyc)} disabled={kyc.status !== "Approved"}><Send className="h-3 w-3" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-orange-500 text-white">Previous</Button>
            <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-orange-500 text-white">Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewKYC;