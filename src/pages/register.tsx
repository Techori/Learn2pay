import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import FileInput from "../components/ui/file-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const RegistrationPage = () => {
  const [formType, setFormType] = useState<"student" | "institute" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [instituteType, setInstituteType] = useState<string>("");

  const handleFormSelection = (type: "student" | "institute") => {
    setFormType(type);
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {!formType && !submitted && (
        <Card className="max-w-md w-full text-center bg-[#1A1A1A] text-white">
          <CardHeader>
            <CardTitle className="text-[#FFA500] text-2xl">
              Select Registration Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-[#FFA500] text-black mb-4 hover:bg-orange-600"
              onClick={() => handleFormSelection("student")}
            >
              Student Registration
            </Button>
            <Button
              className="w-full bg-[#1A1A1A] text-white hover:bg-gray-800 border border-gray-600"
              onClick={() => handleFormSelection("institute")}
            >
              Institute Registration
            </Button>
          </CardContent>
        </Card>
      )}

      {formType === "student" && !submitted && (
        <Card className="max-w-lg w-full bg-[#1A1A1A] text-white">
          <CardHeader>
            <CardTitle className="text-[#FFA500]">Student Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" required />
              </div>
              <div>
                <Label htmlFor="class">Class</Label>
                <Input id="class" type="text" placeholder="Enter your class" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" type="tel" placeholder="Enter your contact number" required />
              </div>
              <div>
                <Label htmlFor="identity">Identity Proof (PAN Card)</Label>
                <FileInput id="identity" required />
              </div>
              <Button className="w-full bg-orange-600 text-white hover:bg-orange-700" type="submit">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {formType === "institute" && !submitted && (
        <Card className="max-w-lg w-full bg-[#1A1A1A] text-white">
          <CardHeader>
            <CardTitle className="text-[#FFA500]">Institute Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="institute-name">Institute Name</Label>
                <Input
                  id="institute-name"
                  type="text"
                  placeholder="Enter institute name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="institute-type">Institute Type</Label>
                <Select
                  value={instituteType}
                  onValueChange={setInstituteType}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue>{instituteType ? instituteType : "Select type"}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="coaching">Coaching Center</SelectItem>
                    <SelectItem value="academy">Academy</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="institute-address">Address</Label>
                <Input
                  id="institute-address"
                  type="text"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input
                  id="contact-person"
                  type="text"
                  placeholder="Enter contact person"
                  required
                />
              </div>
              <div>
                <Label htmlFor="institute-email">Email</Label>
                <Input
                  id="institute-email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pan-card">PAN Card</Label>
                <FileInput id="pan-card" required />
              </div>
              <div>
                <Label htmlFor="registration-id">Institute Registration ID</Label>
                <FileInput id="registration-id" required />
              </div>
              <Button
                className="w-full bg-[#FFA500] text-black hover:bg-orange-600"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {submitted && (
        <Card className="max-w-md w-full text-center bg-[#1A1A1A] text-white">
          <CardHeader>
            <CardTitle className="text-green-500 text-2xl">
              Registration Successful!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Thank you for registering. We will process your application shortly.
            </p>
            <Button
              className="mt-4 bg-[#FFA500] text-black hover:bg-orange-600"
              onClick={() => setFormType(null)}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegistrationPage;
