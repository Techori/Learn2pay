import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Home, BookOpen, GraduationCap, User } from "lucide-react";

const LearnMore = () => {
  const sections = [
    {
      title: "Schools & Colleges",
      description:
        "Complete fee management solution for educational institutions, providing tools for student registration and management, class-wise fee structure, parent communication portal, and transport fee management.",
      features: [
        "Student registration & management",
        "Class-wise fee structure",
        "Parent communication portal",
        "Transport fee management",
      ],
    },
    {
      title: "Coaching Centers",
      description:
        "Streamlined billing and management for coaching institutes, including batch-wise fee collection, automated fee reminders, discounts, and scholarship management.",
      features: [
        "Batch-wise fee collection",
        "Automated Fee Reminders",
        "Discount and Scholarship Management",
      ],
    },
    {
      title: "Universities",
      description:
        "Enterprise-grade solutions for large educational institutions, featuring multi-campus management, department-wise billing, scholarship management, and hostel fee collection.",
      features: [
        "Multi-campus management",
        "Department-wise billing",
        "Scholarship management",
        "Hostel fee collection",
      ],
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {sections.map((section, index) => (
        <Card key={index} className="bg-gray-100 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {section.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="text-primary">✔</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default LearnMore;
