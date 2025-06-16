
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, X, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small schools and coaching centers",
      features: [
        "Up to 500 students",
        "Basic fee collection",
        "Email notifications",
        "Standard reports",
        "Mobile app access",
        "Payment gateway integration",
      ],
      limitations: ["Limited customization", "Basic support"],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$149",
      period: "/month",
      description: "Ideal for growing institutions and colleges",
      features: [
        "Up to 2,000 students",
        "Advanced fee management",
        "SMS & Email notifications",
        "Custom reports & analytics",
        "Multi-campus support",
        "API access",
        "Priority support",
        "Custom branding",
      ],
      limitations: [],
      popular: true,
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large universities and institution chains",
      features: [
        "Unlimited students",
        "Full customization",
        "Advanced analytics & AI insights",
        "Multi-language support",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations",
        "White-label solution",
        "Advanced security features",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for all plans. No credit card required to start.",
    },
    {
      question: "Can I change plans anytime?",
      answer:
        "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, bank transfers, and various digital payment methods.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use bank-grade security with 256-bit SSL encryption and are PCI DSS compliant.",
    },
    {
      question: "Do you offer custom pricing for large institutions?",
      answer:
        "Yes, we offer custom pricing and solutions for large institutions with specific requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="py-20 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 leading-[1.15] pb-2">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your institution. Start with a free
              trial and scale as you grow.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in ${
                  plan.popular ? "border-orange-500/50 scale-105" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-orange-400">
                      {plan.price}
                    </span>
                    <span className="text-gray-300">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-400">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                        : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                    }`}
                    onClick={() =>
                      plan.name === "Enterprise"
                        ? navigate("/contact")
                        : navigate("/register-institute")
                    }
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>{plan.cta}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-600/20 rounded-2xl p-12 text-center mt-20 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of institutions that trust Learn2Pay for their fee
              collection needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-4 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => navigate("/register-institute")}
              >
                <ArrowRight className="h-5 w-5" />
                <span>Start Free Trial</span>
              </Button>
              <Button
                className="px-8 py-4 text-lg border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => navigate("/contact")}
              >
                <ArrowRight className="h-5 w-5" />
                <span>Talk to Sales</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
