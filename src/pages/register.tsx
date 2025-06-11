import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/Form";

const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      instituteType: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border border-orange-500/20 bg-gradient-to-br from-gray-900/80 to-gray-800/50 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="font-bold">
                <span className="text-orange-500">Learn2Pay</span>
              </span>
            </div>
            <CardTitle className="text-2xl text-white">
              Register Your Institute
            </CardTitle>
            <CardDescription className="text-gray-300">
              Start your free trial and transform your fee collection process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Institute Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Institute Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instituteName">Institute Name *</Label>
                      <Input
                        id="instituteName"
                        placeholder="e.g., ABC Academy"
                        {...form.register("instituteName")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="instituteType"
                        rules={{ required: "Please select an institute type." }}
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormLabel>Institute Type *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500">
                                  <SelectValue
                                    placeholder="Select type"
                                    className="placeholder-gray-400"
                                  />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                  <SelectItem value="school">School</SelectItem>
                                  <SelectItem value="coaching">
                                    Coaching Center
                                  </SelectItem>
                                  <SelectItem value="gym">
                                    Gym/Fitness Center
                                  </SelectItem>
                                  <SelectItem value="academy">
                                    Academy
                                  </SelectItem>
                                  <SelectItem value="college">
                                    College
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Institute Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your institute"
                      {...form.register("description")}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Contact Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Principal/Director/Owner name"
                      {...form.register("contactPerson")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@institute.com"
                        {...form.register("email")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...form.register("phone")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.yourinstitute.com"
                      {...form.register("website")}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Address Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Street address, building name, etc."
                      {...form.register("address")}
                      required
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="City name"
                        {...form.register("city")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="State name"
                        {...form.register("state")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        placeholder="123456"
                        {...form.register("pincode")}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* KYC Documents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    KYC Documents
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload required documents for verification (PDF/JPG format,
                    max 5MB each)
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institute Registration Certificate</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>PAN Card</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    rules={{ required: "You must agree to terms." }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Label
                    htmlFor="agreeTerms"
                    className="text-sm leading-5 text-gray-300"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-orange-400 hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-400 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                >
                  Register Institute
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-300 hover:text-orange-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </Form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
