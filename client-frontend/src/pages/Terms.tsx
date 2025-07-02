import React, { useState } from "react";

const termsContent = {
  en: (
    <>
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Terms and Conditions</h1>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. Purpose of Agreement</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Digital Transformation of Fee Collection:</strong> Larn2Pay, developed by Rishishwar Industry Private Limited, automates and secures the fee collection process.</li>
          <li><strong>Operational Reliability:</strong> Ensures minimal downtime and reliable performance through advanced infrastructure.</li>
          <li><strong>Transparency:</strong> Offers real-time, verifiable transaction data to all stakeholders.</li>
          <li><strong>Online Payment Portal:</strong> Supports UPI, cards, net banking, E-Nach, and E-Mandate securely.</li>
          <li><strong>Real-Time Insights:</strong> Provides tools to track collections and access financial insights.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. Scope of Services</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Secure, cloud-based fee collection and data management platform.</li>
          <li>Student data and payment record management.</li>
          <li>Automated notifications, role-based staff access, and real-time dashboards.</li>
          <li>Mobile and desktop compatibility with customizable institute branding.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. Fee Structure</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>5% transaction fee, capped at ₹225 per transaction.</li>
          <li>Additional ₹75 technical service charge per transaction.</li>
          <li>Optional annual maintenance and report customization fees.</li>
          <li>All service charges are non-refundable.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">4. Payment & Settlement</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Monthly settlement within T+7 working days.</li>
          <li>NEFT/RTGS payments with deductions for any outstanding dues.</li>
          <li>Secure and verifiable receipts issued only via Larn2Pay.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">5. Data Security & Confidentiality</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Data hosted on encrypted Indian servers.</li>
          <li>Strict access controls, OTP-based login, and audit trails.</li>
          <li>No unauthorized third-party data sharing.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">6. Termination Policy</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>30 days written notice by either party for termination.</li>
          <li>Access revoked after final settlements and dues are cleared.</li>
          <li>Data is handed over securely within 30 days post-termination.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">7.Data Security & Confidentiality </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Data hosted on encrypted Indian servers.</li>
          <li>Strict authorized access controls.</li>
          <li>No third-party data sharing (unless legally needed).</li>
        </ul>
      </section>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Larn2Pay. All rights reserved.
      </p>
    </>
  ),
  hi: (
    <>
      <h1 className="text-4xl font-bold text-orange-600 mb-6">नियम और शर्तें</h1>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. समझौते का उद्देश्य</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>शुल्क संग्रहण का डिजिटलीकरण:</strong> Larn2Pay, जिसे Rishishwar Industry Private Limited द्वारा विकसित किया गया है, शुल्क संग्रहण प्रक्रिया को स्वचालित और सुरक्षित बनाता है।</li>
          <li><strong>संचालनिक विश्वसनीयता:</strong> उन्नत अवसंरचना के माध्यम से न्यूनतम डाउनटाइम और विश्वसनीय प्रदर्शन सुनिश्चित करता है।</li>
          <li><strong>पारदर्शिता:</strong> सभी हितधारकों को वास्तविक समय, सत्यापन योग्य लेनदेन डेटा प्रदान करता है।</li>
          <li><strong>ऑनलाइन भुगतान पोर्टल:</strong> UPI, कार्ड, नेट बैंकिंग, E-Nach, और E-Mandate को सुरक्षित रूप से समर्थन करता है।</li>
          <li><strong>वास्तविक समय की जानकारी:</strong> संग्रहण को ट्रैक करने और वित्तीय जानकारी प्राप्त करने के लिए उपकरण प्रदान करता है।</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. सेवाओं का दायरा</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>सुरक्षित, क्लाउड-आधारित शुल्क संग्रहण और डेटा प्रबंधन प्लेटफ़ॉर्म।</li>
          <li>छात्र डेटा और भुगतान रिकॉर्ड प्रबंधन।</li>
          <li>स्वचालित सूचनाएँ, भूमिका-आधारित स्टाफ एक्सेस, और वास्तविक समय डैशबोर्ड।</li>
          <li>मोबाइल और डेस्कटॉप संगतता के साथ अनुकूलन योग्य संस्थान ब्रांडिंग।</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. शुल्क संरचना</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>5% लेनदेन शुल्क, प्रति लेनदेन ₹225 तक सीमित।</li>
          <li>प्रति लेनदेन ₹75 तकनीकी सेवा शुल्क अतिरिक्त।</li>
          <li>वैकल्पिक वार्षिक रखरखाव और रिपोर्ट अनुकूलन शुल्क।</li>
          <li>सभी सेवा शुल्क गैर-वापसी योग्य हैं।</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">4. भुगतान और निपटान</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>मासिक निपटान T+7 कार्य दिवसों के भीतर।</li>
          <li>NEFT/RTGS भुगतान, किसी भी बकाया राशि की कटौती के साथ।</li>
          <li>सुरक्षित और सत्यापन योग्य रसीदें केवल Larn2Pay के माध्यम से जारी की जाती हैं।</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">5. डेटा सुरक्षा और गोपनीयता</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>डेटा एन्क्रिप्टेड भारतीय सर्वरों पर होस्ट किया जाता है।</li>
          <li>कठोर एक्सेस नियंत्रण, OTP-आधारित लॉगिन, और ऑडिट ट्रेल्स।</li>
          <li>अनधिकृत तृतीय-पक्ष डेटा साझा नहीं किया जाता है।</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">6. समाप्ति नीति</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>किसी भी पक्ष द्वारा 30 दिन की लिखित सूचना पर समाप्ति।</li>
          <li>अंतिम निपटान और बकाया राशि के बाद एक्सेस रद्द कर दी जाती है।</li>
          <li>समाप्ति के 30 दिनों के भीतर डेटा सुरक्षित रूप से सौंपा जाता है।</li>
        </ul>
      </section>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Larn2Pay. सर्वाधिकार सुरक्षित।
      </p>
    </>
  ),
};

const TermsAndConditions = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white px-6 py-12 max-w-6xl mx-auto space-y-10">
      {/* Language Switcher */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button
          onClick={() => setLanguage("en")}
          style={{
            marginRight: 8,
            fontWeight: language === "en" ? "bold" : "normal",
            textDecoration: language === "en" ? "underline" : "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("hi")}
          style={{
            fontWeight: language === "hi" ? "bold" : "normal",
            textDecoration: language === "hi" ? "underline" : "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          हिन्दी
        </button>
      </div>
      {termsContent[language]}
    </div>
  );
};

export default TermsAndConditions;
