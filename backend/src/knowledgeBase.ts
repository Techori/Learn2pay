// Learn2Pay Knowledge Base for in-memory RAG
export interface KnowledgeChunk {
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  // About
  { text: "Learn2Pay is a digital platform that revolutionizes fee collection for educational institutions across India, making it smarter, faster, and more efficient. The platform serves schools, colleges, coaching centers, and universities. Mission: To simplify fee payments for educational institutions and parents by offering EMI solutions and advanced management tools." },
  // Core Values
  { text: "Security First: Bank-grade encryption for data and transactions." },
  { text: "Customer Success: Committed to helping users achieve their goals." },
  { text: "Innovation: Continuously innovating for smarter fee management." },
  { text: "Community: Building strong relationships with educational partners." },
  // Key Features & Services
  { text: "Online fee payment and automated payment collection." },
  { text: "EMI scheduling and flexible EMI terms." },
  { text: "Student registration and management." },
  { text: "Class-wise and batch-wise fee structure." },
  { text: "Parent communication portal." },
  { text: "Attendance tracking and exam management." },
  { text: "Transport and hostel fee management." },
  { text: "Multi-campus and department-wise billing." },
  { text: "Real-time analytics and custom reports." },
  { text: "Multi-gateway payment integration." },
  { text: "Multi-language support." },
  { text: "SMS & Email alerts." },
  { text: "Secure payment processing (PCI DSS, 256-bit SSL)." },
  { text: "Mobile app access." },
  { text: "24/7 customer support." },
  // Pricing & Plans
  { text: "Starter: $49/month, up to 500 students, basic features, standard reports, mobile app, payment gateway, basic support." },
  { text: "Professional: $149/month, up to 2,000 students, advanced management, analytics, multi-campus, API, priority support, custom branding." },
  { text: "Enterprise: Custom pricing, unlimited students, full customization, advanced analytics, dedicated manager, SLA, white-label, advanced security." },
  { text: "14-day free trial for all plans, no credit card required. Plans can be changed anytime. Payment methods: Credit cards, bank transfers, digital payments. Custom pricing for large institutions." },
  // FAQs
  { text: "What is Learn2Pay? A digital platform simplifying fee payments for educational institutions and parents by offering EMI solutions." },
  { text: "How can I register as a parent or institution? Visit the Registration page and select your category to fill out the necessary details." },
  { text: "What are the EMI terms? Flexible and transparent; use the EMI Calculator on the website." },
  { text: "Is my data secure? Yes, bank-grade security with 256-bit SSL encryption and PCI DSS compliance." },
  { text: "Do you offer custom pricing for large institutions? Yes, contact sales for custom solutions." },
  // Support & Contact
  { text: "Email: support@larn2pay.com. For further assistance, contact the support team or use the Contact Us page." },
]; 