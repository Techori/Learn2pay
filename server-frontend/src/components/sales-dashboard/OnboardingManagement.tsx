import React, { useState } from "react";
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
  CheckCircle,
  Clock,
  FileText,
  User,
  Phone,
  Mail,
  Upload,
  ArrowUpDown,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

interface OnboardingCase {
  id: number;
  instituteName: string;
  contact: string;
  phone: string;
  email: string;
  stage: "Documentation" | "Setup" | "Training" | "Completed";
  progress: number;
  startDate: string;
  expectedCompletion: string;
  assignedTo: string;
  documents: {
    registration: "Completed" | "Pending" | "In Review";
    license: "Completed" | "Pending" | "In Review";
    agreement: "Completed" | "Pending" | "In Review";
  };
  value: string;
}

const OnboardingManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [salespersonFilter, setSalespersonFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [casesPerPage] = useState(5);

  const onboardingCases: OnboardingCase[] = [
    { id: 1, instituteName: "Sunrise Public School", contact: "Dr. Priya Sharma", phone: "+91 9876543210", email: "principal@sunriseschool.edu", stage: "Documentation", progress: 60, startDate: "2024-01-15", expectedCompletion: "2024-01-30", assignedTo: "Ravi Kumar", documents: { registration: "Completed", license: "Pending", agreement: "In Review" }, value: "₹25,000" },
    { id: 2, instituteName: "Excel Coaching Center", contact: "Mr. Rajesh Kumar", phone: "+91 9876543211", email: "info@excelcoaching.com", stage: "Setup", progress: 85, startDate: "2024-01-10", expectedCompletion: "2024-01-25", assignedTo: "Priya Patel", documents: { registration: "Completed", license: "Completed", agreement: "Completed" }, value: "₹15,000" },
    { id: 3, instituteName: "Modern Academy", contact: "Ms. Anita Patel", phone: "+91 9876543212", email: "director@modernacademy.in", stage: "Training", progress: 40, startDate: "2024-01-18", expectedCompletion: "2024-02-02", assignedTo: "Vikram Singh", documents: { registration: "Completed", license: "Completed", agreement: "Pending" }, value: "₹12,000" },
    { id: 4, instituteName: "Bright Future School", contact: "Prof. Vikram Singh", phone: "+91 9876543213", email: "admin@brilliantminds.edu", stage: "Completed", progress: 100, startDate: "2024-01-20", expectedCompletion: "2024-01-25", assignedTo: "Sneha Desai", documents: { registration: "Completed", license: "Completed", agreement: "Completed" }, value: "₹30,000" },
  ];

  const uniqueStages = Array.from(new Set(onboardingCases.map((c) => c.stage)));
  const uniqueSalespeople = Array.from(new Set(onboardingCases.map((c) => c.assignedTo)));

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Documentation": return "bg-yellow-900/60 text-yellow-300";
      case "Setup": return "bg-blue-900/60 text-blue-300";
      case "Training": return "bg-purple-900/60 text-purple-300";
      case "Completed": return "bg-green-900/60 text-green-300";
      default: return "bg-gray-800 text-gray-300";
    }
  };

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "Completed": return "text-green-400";
      case "Pending": return "text-yellow-400";
      case "In Review": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const filteredCases = onboardingCases.filter((case_) => {
    const matchesSearch = case_.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) || case_.contact.toLowerCase().includes(searchTerm.toLowerCase()) || case_.phone.toLowerCase().includes(searchTerm.toLowerCase()) || case_.email.toLowerCase().includes(searchTerm.toLowerCase()) || case_.stage.toLowerCase().includes(searchTerm.toLowerCase()) || case_.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = !stageFilter || case_.stage === stageFilter;
    const matchesSalesperson = !salespersonFilter || case_.assignedTo === salespersonFilter;
    const matchesDate = (!dateRange.from || new Date(case_.startDate) >= new Date(dateRange.from)) && (!dateRange.to || new Date(case_.expectedCompletion) <= new Date(dateRange.to));
    return matchesSearch && matchesStage && matchesSalesperson && matchesDate;
  });

  const totalPages = Math.ceil(filteredCases.length / casesPerPage);
  const paginatedCases = filteredCases.slice((currentPage - 1) * casesPerPage, currentPage * casesPerPage);

  const isOverdue = (expectedCompletion: string) => new Date(expectedCompletion) < new Date() && filteredCases.some(c => c.stage !== "Completed");

  const handleCall = (phone: string) => {
    const mockCallWindow = window.open("", "_blank", "width=400,height=300");
    if (mockCallWindow) mockCallWindow.document.write(`<html><body style="background: #101624; color: white; padding: 20px;"><h2>Mock Call</h2><p>Dialing: ${phone}</p><button onclick="window.close()">End Call</button></body></html>`);
  };

  const handleEmail = (email: string) => {
    const mockEmailWindow = window.open("", "_blank", "width=400,height=300");
    if (mockEmailWindow) mockEmailWindow.document.write(`<html><body style="background: #101624; color: white; padding: 20px;"><h2>Compose Email</h2><p>To: ${email}</p><textarea style="width: 100%; height: 100px; background: #232b45; color: white;"></textarea><button onclick="window.close()">Send</button></body></html>`);
  };

  const handleDocuments = (documents: OnboardingCase["documents"]) => {
    toast({ title: "Documents Status", description: `Registration: ${documents.registration}<br>License: ${documents.license}<br>Agreement: ${documents.agreement}`.replace(/\n\s*/g, ""), duration: 5000 });
  };

  const handleComplete = (case_: OnboardingCase) => {
    if (window.confirm(`Mark ${case_.instituteName} as completed?`)) toast({ title: "Completed", description: `${case_.instituteName} marked as completed at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", " ")}.` });
  };

  const handleBulkUpload = () => {
    if (selectedFile) {
      toast({ title: "Upload Success", description: `Uploaded ${selectedFile.name} at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).replace(",", " ")}.` });
      setShowBulkUpload(false);
    }
  };

  const handleGenerateReport = () => {
    const csvContent = [["ID", "Institute Name", "Contact", "Phone", "Email", "Stage", "Progress", "Start Date", "Expected Completion", "Salesperson", "Value"], ...onboardingCases.map((c) => [c.id, c.instituteName, c.contact, c.phone, c.email, c.stage, `${c.progress}%`, c.startDate, c.expectedCompletion, c.assignedTo, c.value])].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onboarding_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none"><CardContent className="p-4"><div className="text-2xl font-bold text-blue-400">12</div><div className="text-sm text-gray-300">Active Onboardings</div><div className="text-xs text-blue-400">In progress</div></CardContent></Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none"><CardContent className="p-4"><div className="text-2xl font-bold text-green-400">45</div><div className="text-sm text-gray-300">Completed This Month</div><div className="text-xs text-green-400">+15% from last month</div></CardContent></Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none"><CardContent className="p-4"><div className="text-2xl font-bold text-yellow-400">8</div><div className="text-sm text-gray-300">Pending Documentation</div><div className="text-xs text-yellow-400">Requires follow-up</div></CardContent></Card>
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none"><CardContent className="p-4"><div className="text-2xl font-bold text-purple-400">5.2</div><div className="text-sm text-gray-300">Avg. Days to Complete</div><div className="text-xs text-purple-400">Industry benchmark: 7 days</div></CardContent></Card>
      </div>
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div><CardTitle className="text-white">Onboarding Pipeline</CardTitle><CardDescription className="text-gray-400">Track institute onboarding progress</CardDescription></div>
            <div className="flex space-x-2">
              <Dialog open={showBulkUpload} onOpenChange={setShowBulkUpload}>
                <DialogTrigger asChild><Button variant="outline" className="border-[#ff7900] text-orange-400 hover:bg-orange-500/10"><Upload className="h-4 w-4 mr-2" /> Bulk Upload</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Bulk Upload Leads</DialogTitle></DialogHeader><input type="file" accept=".csv, .xlsx" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="mb-4" /><Button onClick={handleBulkUpload} disabled={!selectedFile} className="bg-orange-500 text-white">Upload</Button></DialogContent>
              </Dialog>
              <Button variant="outline" className="border-[#ff7900] text-orange-400 hover:bg-orange-500/10" onClick={handleGenerateReport}><FileText className="h-4 w-4 mr-2" /> Generate Report</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-6">
            <div className="relative flex-1"><Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><Input placeholder="Search by institute name or contact..." className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            <div className="relative"><select className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}><option value="">Stage</option>{uniqueStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}</select></div>
            <div className="relative"><select className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={salespersonFilter} onChange={(e) => setSalespersonFilter(e.target.value)}><option value="">Salesperson</option>{uniqueSalespeople.map((salesperson) => <option key={salesperson} value={salesperson}>{salesperson}</option>)}</select></div>
            <div className="flex items-center space-x-2"><input type="date" className="rounded bg-[#232b45] border border-[#232b45] text-gray-300 px-2 py-2" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} /><span className="text-gray-400">to</span><input type="date" className="rounded bg-[#232b45] border border-[#232b45] text-gray-300 px-2 py-2" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} /></div>
            {(stageFilter || salespersonFilter || dateRange.from || dateRange.to) && <Button variant="outline" className="border-[#232b45] text-gray-300" onClick={() => { setStageFilter(""); setSalespersonFilter(""); setDateRange({ from: "", to: "" }); }}>Reset Filters</Button>}
          </div>
          <Filter className="h-4 w-4 text-gray-400 mt-2 md:mt-0" />
          <div className="overflow-x-auto rounded-lg"><Table className="min-w-full bg-[#181f32] text-white"><TableHeader><TableRow className="bg-[#232b45]"><TableHead className="text-orange-400">Institute Details</TableHead><TableHead className="text-orange-400">Stage & Progress</TableHead><TableHead className="text-orange-400">Documents Status</TableHead><TableHead className="text-orange-400">Timeline</TableHead><TableHead className="text-orange-400">Salesperson</TableHead><TableHead className="text-orange-400">Value</TableHead><TableHead className="text-orange-400">Actions</TableHead></TableRow></TableHeader><TableBody>{paginatedCases.map((case_) => <TableRow key={case_.id} className={`hover:bg-[#232b45]/60 transition ${isOverdue(case_.expectedCompletion) ? "bg-red-900/30" : ""}`}><TableCell><div><div className="font-medium text-white">{case_.instituteName}</div><div className="text-sm text-gray-400">{case_.contact}</div><div className="text-sm text-gray-400">{case_.phone}</div></div></TableCell><TableCell><div className="space-y-2"><Badge className={getStageColor(case_.stage) + " font-semibold"}>{case_.stage}</Badge><div className="w-full bg-[#232b45] rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: `${case_.progress}%` }}></div></div><div className="text-xs text-gray-400">{case_.progress}% complete</div></div></TableCell><TableCell><div className="space-y-1"><div className={`text-xs ${getDocumentStatus(case_.documents.registration)}`}>Registration: {case_.documents.registration}</div><div className={`text-xs ${getDocumentStatus(case_.documents.license)}`}>License: {case_.documents.license}</div><div className={`text-xs ${getDocumentStatus(case_.documents.agreement)}`}>Agreement: {case_.documents.agreement}</div></div></TableCell><TableCell><div className="text-sm"><div>Started: <span className="text-gray-300">{case_.startDate}</span></div><div>Expected: <span className={`text-gray-300 ${isOverdue(case_.expectedCompletion) ? "text-red-400" : ""}`}>{case_.expectedCompletion}</span></div></div></TableCell><TableCell><div className="flex items-center"><User className="h-4 w-4 mr-1 text-orange-400" /><span className="text-sm text-white">{case_.assignedTo}</span></div></TableCell><TableCell><div className="font-semibold text-orange-400">{case_.value}</div></TableCell><TableCell><div className="flex space-x-1"><Button size="sm" variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10" onClick={() => handleCall(case_.phone)}><Phone className="h-3 w-3" /></Button><Button size="sm" variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10" onClick={() => handleEmail(case_.email)}><Mail className="h-3 w-3" /></Button><Button size="sm" variant="outline" className="border-[#232b45] text-gray-300 hover:bg-orange-500/10" onClick={() => handleDocuments(case_.documents)}><FileText className="h-3 w-3" /></Button><Button size="sm" variant="outline" className="border-[#232b45] text-green-400 hover:bg-orange-500/10" onClick={() => handleComplete(case_)}><CheckCircle className="h-3 w-3" /></Button></div></TableCell></TableRow>)}</TableBody></Table></div>
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

export default OnboardingManagement;