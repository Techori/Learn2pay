import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Shield, CheckCircle, XCircle, Eye, Clock, FileText, Upload, AlertTriangle } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface Document {
  name: string;
  size: string;
  type: string;
}

interface KycSubmission {
  id: number;
  instituteName: string;
  submittedBy: string;
  submittedDate: string;
  documentType: string;
  status: string;
  priority: string;
  documents: Document[];
  assignedTo: string;
  comments: string | null;
}

interface TeamPerformance {
  team: string;
  processed: number;
  pending: number;
  avgTime: string;
  accuracy: string;
}

const KycApprovalManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({ status: 'all', priority: 'all', team: 'all' });
  const [showReviewDialog, setShowReviewDialog] = useState<boolean>(false);
  const [selectedSubmission, setSelectedSubmission] = useState<KycSubmission | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<'Approved' | 'Rejected' | ''>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const kycSubmissions: KycSubmission[] = [
    {
      id: 1,
      instituteName: "Modern Public School",
      submittedBy: "Dr. Rajesh Kumar",
      submittedDate: "2024-01-20",
      documentType: "Registration Certificate",
      status: "Pending",
      priority: "High",
      documents: [
        { name: "School Registration.pdf", size: "2.3 MB", type: "PDF" },
        { name: "Principal ID.jpg", size: "1.8 MB", type: "Image" },
        { name: "Address Proof.pdf", size: "1.2 MB", type: "PDF" }
      ],
      assignedTo: "KYC Team 1",
      comments: null
    },
    {
      id: 2,
      instituteName: "Excel Coaching Center",
      submittedBy: "Priya Sharma",
      submittedDate: "2024-01-18",
      documentType: "Business License",
      status: "Under Review",
      priority: "Medium",
      documents: [
        { name: "Business License.pdf", size: "1.9 MB", type: "PDF" },
        { name: "Tax Certificate.pdf", size: "1.1 MB", type: "PDF" }
      ],
      assignedTo: "KYC Team 2",
      comments: "Additional address verification required"
    },
    {
      id: 3,
      instituteName: "Sunrise College",
      submittedBy: "Prof. Amit Singh",
      submittedDate: "2024-01-15",
      documentType: "All Documents",
      status: "Approved",
      priority: "Low",
      documents: [
        { name: "College Registration.pdf", size: "3.1 MB", type: "PDF" },
        { name: "AICTE Approval.pdf", size: "2.7 MB", type: "PDF" }
      ],
      assignedTo: "KYC Team 1",
      comments: "All documents verified successfully"
    },
    {
      id: 4,
      instituteName: "Tech Academy",
      submittedBy: "Neha Gupta",
      submittedDate: "2024-01-17",
      documentType: "Principal Identity",
      status: "Rejected",
      priority: "High",
      documents: [
        { name: "Principal Aadhaar.jpg", size: "1.5 MB", type: "Image" }
      ],
      assignedTo: "KYC Team 2",
      comments: "Document quality is poor, please resubmit clear images"
    }
  ];

  const teamPerformance: TeamPerformance[] = [
    { team: "KYC Team 1", processed: 45, pending: 12, avgTime: "2.1 hrs", accuracy: "98%" },
    { team: "KYC Team 2", processed: 38, pending: 8, avgTime: "2.8 hrs", accuracy: "96%" },
    { team: "KYC Team 3", processed: 52, pending: 15, avgTime: "1.9 hrs", accuracy: "99%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-white';
      case 'Rejected': return 'bg-danger text-white';
      case 'Pending': return 'bg-warning text-white';
      case 'Under Review': return 'bg-secondary text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-danger text-white';
      case 'Medium': return 'bg-warning text-white';
      case 'Low': return 'bg-success text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-danger" />;
      case 'Under Review': return <Eye className="h-4 w-4 text-secondary" />;
      case 'Pending': return <Clock className="h-4 w-4 text-warning" />;
      default: return <FileText className="h-4 w-4 text-text-secondary" />;
    }
  };

  // Filtered submissions
  const [filteredSubmissions, setFilteredSubmissions] = useState<KycSubmission[]>(kycSubmissions);
  useEffect(() => {
    let filtered = [...kycSubmissions];
    if (searchTerm) {
      filtered = filtered.filter(submission =>
        submission.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(submission => submission.status === filters.status);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(submission => submission.priority === filters.priority);
    }
    if (filters.team !== 'all') {
      filtered = filtered.filter(submission => submission.assignedTo === filters.team);
    }
    setFilteredSubmissions(filtered);
  }, [searchTerm, filters]);

  // Handle actions
  const handleView = (submission: KycSubmission) => {
    setSelectedSubmission(submission);
    setShowReviewDialog(true);
    toast({
      title: "View Submission",
      description: `Viewing details for "${submission.instituteName}".`
    });
  };

  const handleApprove = (submission: KycSubmission) => {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ');
    toast({
      title: "KYC Approved",
      description: `${submission.instituteName} KYC approved at ${now}.`
    });
    setShowReviewDialog(false);
  };

  const handleReject = (submission: KycSubmission) => {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ');
    toast({
      title: "KYC Rejected",
      description: `${submission.instituteName} KYC rejected at ${now}. Please provide comments for resubmission.`
    });
    setShowReviewDialog(false);
  };

  const handleDownloadReport = () => {
    const csv = [
      'Institute Name,Submitted By,Submitted Date,Document Type,Status,Priority,Assigned To,Comments',
      ...kycSubmissions.map(submission =>
        `${submission.instituteName},${submission.submittedBy},${submission.submittedDate},${submission.documentType},${submission.status},${submission.priority},${submission.assignedTo},${submission.comments || ''}`
      )
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kyc_report_${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(/[,:\s]/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Report Downloaded",
      description: `KYC report downloaded at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => file.type === 'application/pdf' || file.type.startsWith('image/'));
      if (validFiles.length === 0) {
        toast({
          title: "Upload Error",
          description: "Please upload only PDF or image files.",
          variant: "destructive"
        });
        return;
      }
      if (validFiles.length < fileArray.length) {
        toast({
          title: "Warning",
          description: "Some files were skipped as they are not PDF or image files.",
          variant: "destructive"
        });
      }
      setUploadedFiles(validFiles);
      toast({
        title: "Bulk Upload Success",
        description: `${validFiles.length} files uploaded successfully at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`,
      });
      if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
    }
  };

  const handleAlertAction = (title: string) => {
    toast({
      title: `${title} Action Taken`,
      description: `Action for "${title}" has been initiated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      {/* KYC Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">47</div>
            <div className="text-sm text-text-secondary">Pending KYC</div>
            <div className="text-xs text-warning">Awaiting review</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">156</div>
            <div className="text-sm text-text-secondary">Approved This Month</div>
            <div className="text-xs text-success">+23 this week</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">12</div>
            <div className="text-sm text-text-secondary">Rejected</div>
            <div className="text-xs text-danger">Need resubmission</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">2.5 hrs</div>
            <div className="text-sm text-text-secondary">Avg Processing Time</div>
            <div className="text-xs text-secondary">Within SLA</div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Approval Panel */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color">
                <Shield className="h-5 w-5 mr-2 text-orange-400" />
                KYC Approval Management
              </CardTitle>
              <CardDescription className="text-text-secondary">Review and approve institute KYC submissions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleBulkUpload}
                className="hidden"
                accept=".pdf,image/*"
              />
              <Button variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={handleDownloadReport}>
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search by institute name or submitter..."
                className="pl-10 bg-card-bg border border-card-border text-text-color placeholder-text-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary cursor-pointer"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary cursor-pointer"
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <option value="all">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary cursor-pointer"
                value={filters.team}
                onChange={(e) => setFilters({ ...filters, team: e.target.value })}
              >
                <option value="all">Team</option>
                <option value="KYC Team 1">KYC Team 1</option>
                <option value="KYC Team 2">KYC Team 2</option>
                <option value="KYC Team 3">KYC Team 3</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>

          {/* KYC Submissions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-text-secondary">Institute & Submitter</TableHead>
                <TableHead className="text-text-secondary">Document Type</TableHead>
                <TableHead className="text-text-secondary">Status & Priority</TableHead>
                <TableHead className="text-text-secondary">Assigned Team</TableHead>
                <TableHead className="text-text-secondary">Submitted Date</TableHead>
                <TableHead className="text-text-secondary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-medium">{submission.instituteName}</div>
                      <div className="text-sm text-text-secondary">By: {submission.submittedBy}</div>
                      <div className="text-xs text-text-secondary">{submission.documents.length} documents</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div className="font-medium">{submission.documentType}</div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </div>
                      <Badge className={getPriorityColor(submission.priority)} variant="outline">
                        {submission.priority} Priority
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div className="font-medium">{submission.assignedTo}</div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div className="text-sm">{submission.submittedDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleView(submission)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      {submission.status === 'Pending' && (
                        <>
                          <Button size="sm" className="bg-success hover:bg-success-foreground text-white" onClick={() => handleApprove(submission)}>
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="bg-danger hover:bg-danger-foreground text-white" onClick={() => handleReject(submission)}>
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleView(submission)}>
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* KYC Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="text-text-color">Team Performance</CardTitle>
            <CardDescription className="text-text-secondary">KYC processing team statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((team, index) => (
                <div key={index} className="p-4 bg-card-bg rounded-lg">
                  <div className="font-medium mb-2 text-text-color">{team.team}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Processed:</span>
                      <span className="font-medium ml-2 text-text-color">{team.processed}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Pending:</span>
                      <span className="font-medium ml-2 text-text-color">{team.pending}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Avg Time:</span>
                      <span className="font-medium ml-2 text-text-color">{team.avgTime}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Accuracy:</span>
                      <span className="font-medium ml-2 text-success text-text-color">{team.accuracy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center text-text-color">
              <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
              Priority Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card-bg rounded border-l-4 border-danger">
                <div>
                  <div className="font-medium text-text-color">High Priority KYC Overdue</div>
                  <div className="text-sm text-text-secondary">5 high priority submissions pending for 24+ hours</div>
                  <div className="text-xs text-text-secondary">Needs immediate attention</div>
                </div>
                <Button variant="outline" className="text-text-color border-danger hover:bg-danger hover:text-white" onClick={() => handleAlertAction("High Priority KYC Overdue")}>
                  Review
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-card-bg rounded border-l-4 border-warning">
                <div>
                  <div className="font-medium text-text-color">Document Quality Issues</div>
                  <div className="text-sm text-text-secondary">Multiple submissions with poor image quality</div>
                  <div className="text-xs text-text-secondary">May require resubmission requests</div>
                </div>
                <Button variant="outline" className="text-text-color border-warning hover:bg-warning hover:text-white" onClick={() => handleAlertAction("Document Quality Issues")}>
                  Check
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-card-bg rounded border-l-4 border-blue-500">
                <div>
                  <div className="font-medium text-text-color">New Document Type</div>
                  <div className="text-sm text-text-secondary">Unusual document type submitted by Tech Academy</div>
                  <div className="text-xs text-text-secondary">Requires senior review</div>
                </div>
                <Button variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleAlertAction("New Document Type")}>
                  Escalate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="bg-card-bg border-card-border text-text-color max-w-md">
          <DialogHeader>
            <DialogTitle>Review KYC Submission</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Review and update the status for {selectedSubmission?.instituteName}.
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-medium">Documents</h4>
                <ul className="list-disc pl-5 text-sm text-text-secondary">
                  {selectedSubmission.documents.map((doc, index) => (
                    <li key={index}>{doc.name} ({doc.size}, {doc.type})</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Comments</h4>
                <Input
                  placeholder="Add comments (optional)"
                  value={selectedSubmission.comments || ''}
                  onChange={(e) => setSelectedSubmission({ ...selectedSubmission, comments: e.target.value })}
                  className="bg-card-bg border border-card-border text-text-color"
                />
              </div>
              <div>
                <h4 className="font-medium">Update Status</h4>
                <select
                  className="w-full pl-10 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary cursor-pointer"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value as 'Approved' | 'Rejected' | '')}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <DialogFooter>
                              <Button variant="outline" className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white" onClick={() => setShowReviewDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  if (updatedStatus === 'Approved') handleApprove(selectedSubmission);
                  else if (updatedStatus === 'Rejected') handleReject(selectedSubmission);
                  setUpdatedStatus('');
                }}
                disabled={!updatedStatus}
              >
                Update
              </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KycApprovalManagement;