import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { UserPlus, Building, Calendar, Loader2 } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define form schema with Zod
const referralFormSchema = z.object({
  instituteName: z.string().min(2, 'Institute name must be at least 2 characters'),
  instituteType: z.string().min(1, 'Institute type is required'),
  studentCapacity: z.string().optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  designation: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  alternatePhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  establishedYear: z.string().optional(),
  affiliations: z.string().optional(),
  currentFeeStructure: z.string().optional(),
  painPoints: z.string().optional(),
  expectedRevenue: z.string().optional(),
  referralSource: z.string().optional(),
  notes: z.string().optional(),
});

type ReferralFormData = z.infer<typeof referralFormSchema>;

const AddReferrals = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Add state for recent referrals
  const [recentReferrals, setRecentReferrals] = useState([
    { name: "Modern Public School", contact: "Dr. Rajesh Kumar", status: "In Progress", date: "2024-01-20" },
    { name: "Excel Coaching Center", contact: "Prof. Amit Singh", status: "Converted", date: "2024-01-18" },
    { name: "Sunrise College", contact: "Dr. Meera Patel", status: "Follow-up", date: "2024-01-15" }
  ]);

  const { handleSubmit, control, formState: { errors }, trigger, reset } = useForm<ReferralFormData>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      instituteName: '',
      instituteType: '',
      studentCapacity: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      contactName: '',
      designation: '',
      email: '',
      phone: '',
      alternatePhone: '',
      website: '',
      facebook: '',
      linkedin: '',
      establishedYear: '',
      affiliations: '',
      currentFeeStructure: '',
      painPoints: '',
      expectedRevenue: '',
      referralSource: '',
      notes: '',
    },
  });

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger([
        'instituteName',
        'instituteType',
        'address',
        'city',
        'state',
        'pincode',
      ]);
    } else if (step === 2) {
      isValid = await trigger([
        'contactName',
        'email',
        'phone',
      ]);
    }

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = async (data: ReferralFormData) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting Referral:', data);
      // TODO: Implement API call to submit referralData to the backend
      // Example: await axios.post('/api/referrals/add-institute', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Referral Submitted",
        description: "The new institute referral has been successfully submitted.",
        variant: "default",
      });
      
      // Add the new referral to the recent referrals list
      setRecentReferrals(prevReferrals => [
        { 
          name: data.instituteName, 
          contact: data.contactName, 
          status: "Pending",
          date: new Date().toISOString().slice(0, 10)
        }, 
        ...prevReferrals
      ]);

      // Reset form and go back to step 1
      reset();
      setStep(1);
    } catch (error) {
      console.error('Submission Error:', error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting the referral.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.error('Validation Errors:', errors);
    toast({
      title: "Validation Error",
      description: "Please check the form for errors.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-colors duration-200 ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${step >= stepNumber ? 'text-blue-700' : 'text-gray-500'}`}>
                  {stepNumber === 1 ? 'Institute Details' : stepNumber === 2 ? 'Contact Information' : 'Additional Info'}
                </span>
                {stepNumber < 3 && <div className="w-16 h-0.5 bg-gray-300 mx-4"></div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Institute Details */}
      {step === 1 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Institute Details
            </CardTitle>
            <CardDescription>Enter basic information about the institute</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div>
              <Label htmlFor="instituteName">Institute Name <span className="text-red-500">*</span></Label>
              <Controller
                name="instituteName"
                control={control}
                rules={{ required: 'Institute Name is required' }}
                render={({ field }) => (
                  <Input 
                    id="instituteName" 
                    placeholder="Enter institute name" 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
              {errors.instituteName && <p className="text-red-500 text-sm mt-1">{errors.instituteName.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="instituteType">Institute Type <span className="text-red-500">*</span></Label>
                <Controller
                  name="instituteType"
                  control={control}
                  rules={{ required: 'Institute Type is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="coaching">Coaching Center</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="academy">Academy</SelectItem>
                  </SelectContent>
                </Select>
                  )}
                />
                {errors.instituteType && <p className="text-red-500 text-sm mt-1">{errors.instituteType.message}</p>}
              </div>
              <div>
                <Label htmlFor="studentCapacity">Student Capacity</Label>
                <Controller
                  name="studentCapacity"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="studentCapacity" 
                      type="number" 
                      placeholder="Approximate capacity" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Address is required' }}
                render={({ field }) => (
                  <Textarea 
                    id="address" 
                    placeholder="Enter complete address" 
                    rows={3} 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field }) => (
                    <Input 
                      id="city" 
                      placeholder="City" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: 'State is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>
                  )}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode <span className="text-red-500">*</span></Label>
                <Controller
                  name="pincode"
                  control={control}
                  rules={{ required: 'Pincode is required' }}
                  render={({ field }) => (
                    <Input 
                      id="pincode" 
                      placeholder="Pincode" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
              Contact Information
            </CardTitle>
            <CardDescription>Primary contact person details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="contactName">Contact Person Name <span className="text-red-500">*</span></Label>
                <Controller
                  name="contactName"
                  control={control}
                  rules={{ required: 'Contact Person Name is required' }}
                  render={({ field }) => (
                    <Input 
                      id="contactName" 
                      placeholder="Full name" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
                {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Controller
                  name="designation"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="designation" 
                      placeholder="Principal, Director, etc." 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email Address is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"}
                  }}
                  render={({ field }) => (
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contact@institute.com" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Phone Number is required',
                    pattern: { value: /^\+?[1-9]\d{1,14}$/, message: "Invalid phone number"}
                   }}
                  render={({ field }) => (
                    <Input 
                      id="phone" 
                      placeholder="+91 98765 43210" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <Controller
                name="alternatePhone"
                control={control}
                rules={{ pattern: { value: /^\+?[1-9]\d{1,14}$/, message: "Invalid phone number"} }}
                render={({ field }) => (
                  <Input 
                    id="alternatePhone" 
                    placeholder="Alternate contact number" 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
              {errors.alternatePhone && <p className="text-red-500 text-sm mt-1">{errors.alternatePhone.message}</p>}
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Input 
                    id="website" 
                    placeholder="https://www.institute.com" 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="socialMedia">Social Media</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
                <Controller
                  name="facebook"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      placeholder="Facebook page URL" 
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      placeholder="LinkedIn profile URL" 
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Additional Information */}
      {step === 3 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Additional Information
            </CardTitle>
            <CardDescription>Additional details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Controller
                  name="establishedYear"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      id="establishedYear" 
                      type="number" 
                      placeholder="YYYY" 
                      className="mt-1"
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="affiliations">Affiliations/Board</Label>
                <Controller
                  name="affiliations"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbse">CBSE</SelectItem>
                    <SelectItem value="icse">ICSE</SelectItem>
                    <SelectItem value="state">State Board</SelectItem>
                    <SelectItem value="iit">IIT</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                  </SelectContent>
                </Select>
                  )}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="currentFeeStructure">Current Fee Collection Method</Label>
              <Controller
                name="currentFeeStructure"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="mt-1">
                  <SelectValue placeholder="How do they currently collect fees?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual/Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="other-software">Other Software</SelectItem>
                  <SelectItem value="mixed">Mixed Methods</SelectItem>
                </SelectContent>
              </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="painPoints">Current Challenges</Label>
              <Controller
                name="painPoints"
                control={control}
                render={({ field }) => (
              <Textarea 
                id="painPoints" 
                placeholder="What challenges do they face with current fee collection?" 
                rows={3} 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="expectedRevenue">Expected Monthly Revenue</Label>
              <Controller
                name="expectedRevenue"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Estimated monthly fee collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1lakh">₹0 - ₹1 Lakh</SelectItem>
                  <SelectItem value="1-5lakh">₹1 - ₹5 Lakh</SelectItem>
                  <SelectItem value="5-10lakh">₹5 - ₹10 Lakh</SelectItem>
                  <SelectItem value="10-25lakh">₹10 - ₹25 Lakh</SelectItem>
                  <SelectItem value="25lakh+">₹25 Lakh+</SelectItem>
                </SelectContent>
              </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="referralSource">How did you find them?</Label>
              <Controller
                name="referralSource"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Referral source" />
                </SelectTrigger>
                <SelectContent>
                      <SelectItem value="website">Website/Online Search</SelectItem>
                      <SelectItem value="event">Event/Webinar</SelectItem>
                      <SelectItem value="word-of-mouth">Word of Mouth</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="existing-client">Existing Client Referral</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
              <Textarea 
                id="notes" 
                    placeholder="Any additional notes about the institute or contact" 
                rows={3} 
                    className="mt-1"
                    {...field}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          onClick={handlePrevious} 
          disabled={step === 1 || isSubmitting} 
          variant="outline" 
          className="px-6 py-2 border-gray-300 hover:bg-gray-100"
        >
          Previous
        </Button>
          {step < 3 ? (
          <Button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
            </Button>
          ) : (
          <Button 
            type="button" 
            onClick={handleSubmit(onSubmit, onError)}
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Referral'
            )}
              </Button>
          )}
      </div>

      {/* Recent Referrals */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Recent Referrals</CardTitle>
          <CardDescription>Your recently added referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <div className="font-medium text-gray-900">{referral.name}</div>
                  <div className="text-sm text-gray-600">{referral.contact}</div>
                </div>
                <div className="text-right">
                  <Badge className={`text-xs ${
                    referral.status === 'Converted' ? 'bg-green-100 text-green-800' :
                    referral.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    referral.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800' // Fallback for other statuses
                  }`}>
                    {referral.status}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">{referral.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddReferrals;
