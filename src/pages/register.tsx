import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import FileInput from "../components/ui/File-input";

const RegistrationPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      {!submitted && (
        <Card className="max-w-lg w-full bg-[#1A1A1A] text-white">
          <CardHeader>
            <CardTitle className="text-[#FFA500]">Institute Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="institute-name">Institute Name</Label>
                <Input id="institute-name" type="text" placeholder="Enter institute name" required />
              </div>
              <div>
                <Label htmlFor="institute-address">Address</Label>
                <Input id="institute-address" type="text" placeholder="Enter address" required />
              </div>
              <div>
                <Label htmlFor="institute-contact-person">Contact Person</Label>
                <Input id="institute-contact-person" type="text" placeholder="Enter contact person" required />
              </div>
              <div>
                <Label htmlFor="institute-email">Email</Label>
                <Input id="institute-email" type="email" placeholder="Enter email" required />
              </div>
              <div>
                <Label htmlFor="institute-pan">PAN Card</Label>
                <FileInput id="institute-pan" required />
              </div>
              <div>
                <Label htmlFor="institute-registration-id">Institute Registration ID</Label>
                <FileInput id="institute-registration-id" required />
              </div>
              <Button className="w-full bg-[#FFA500] text-black hover:bg-orange-600" type="submit">
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
              onClick={() => setSubmitted(false)}
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
