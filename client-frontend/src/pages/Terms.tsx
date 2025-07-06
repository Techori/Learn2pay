import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/Themetoggle';

const privacyContent = {
  en: (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        <span className="font-bold">
          <span className="text-[#FF7F1A]">LARN</span>
          <span className="text-gray-900 dark:text-white">2PAY Terms and Conditions for Software Platform
          </span>
        </span>
      </h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Purpose of Agreement</h2>
        <p className="mb-2">This section establishes the objectives of the agreement, emphasizing the secure, reliable, and efficient fee collection capabilities of the Larn2Pay platform.</p>
        <ul className="list-disc pl-6">
          <li>Digital Transformation of Fee Collection: The Larn2Pay platform, developed by Rishishwar Industry Private Limited, revolutionizes fee collection by replacing outdated manual processes with a secure, automated, and scalable digital system, ensuring efficiency, accuracy, and accessibility for all stakeholders.</li>
          <li>Commitment to Operational Reliability: Larn2Pay guarantees consistent performance with minimal downtime, leveraging advanced infrastructure to deliver a dependable fee collection system, reducing administrative burdens and enhancing trust in Rishishwar Industry's technology.</li>
          <li>Transparency in Financial Transactions: Larn2Pay ensures all transactions are recorded with precision, providing verifiable, real-time data to institutes, parents, and students, fostering confidence in the platform's integrity and Rishishwar Industry's oversight.</li>
          <li>Accessible Online Payment Portal: Larn2Pay offers a user-friendly online portal supporting secure payment methods like UPI, credit/debit cards, net banking, E-Nach, and E-Mandate, ensuring convenience and robust security for all users.</li>
          <li>Real-Time Financial Insights: The Larn2Pay platform provides real-time reporting tools, enabling institutes to monitor fee collections, track payment statuses, and access actionable financial insights, all managed securely by Rishishwar Industry.</li>
          <li>Automated Fee Schedule Management: Larn2Pay tracks monthly, quarterly, and annual fee schedules, sending timely reminders to parents, ensuring compliance and reducing manual effort, with full control retained by Rishishwar Industry.</li>
          <li>Detection of Payment Discrepancies: Larn2Pay's advanced algorithms identify incomplete or partial payments instantly, enabling institutes to address issues promptly while Rishishwar Industry maintains oversight to ensure system accuracy and reliability.</li>
          <li>Automated Notification System: Larn2Pay sends automated SMS and email reminders to parents about upcoming or overdue payments, streamlining communication and minimizing administrative workload, with templates controlled by Rishishwar Industry for consistency.</li>
          <li>Comprehensive Transaction Records: Larn2Pay maintains detailed, student-specific transaction histories, allowing institutes to track payments, refunds, and dues accurately, with data securely managed by Rishishwar Industry to prevent unauthorized access.</li>
          <li>Seamless Payment Gateway Integration: Larn2Pay integrates with leading payment gateways, ensuring secure, flexible, and reliable transaction processing, with Rishishwar Industry retaining full control over gateway selection and system integration.</li>
          <li>Scalable Platform Architecture: Larn2Pay is designed to scale effortlessly, accommodating growing student bases without additional infrastructure costs to the institute, ensuring cost-efficiency and reliability under Rishishwar Industry's management.</li>
          <li>Custom Feature Development Rights: Rishishwar Industry may develop and deploy custom features for Larn2Pay at its sole discretion, enhancing functionality without requiring institute approval, ensuring continuous improvement and platform superiority.</li>
          <li>Proactive System Upgrades: Rishishwar Industry proactively upgrades Larn2Pay to incorporate cutting-edge technologies, ensuring the platform remains industry-leading, with no additional costs to the institute and full control retained by Rishishwar Industry.</li>
          <li>Exclusive Technology Ownership: All proprietary technology, algorithms, and software components of Larn2Pay remain the sole property of Rishishwar Industry, safeguarding against misuse or unauthorized replication by the institute or third parties.</li>
          <li>Guaranteed Platform Performance: Rishishwar Industry guarantees Larn2Pay's optimal performance, resolving issues promptly at its discretion to ensure uninterrupted service, maintaining stakeholder trust and operational efficiency.</li>
          <li>Comprehensive Stakeholder Training: Rishishwar Industry provides free, comprehensive training for institute staff on Larn2Pay usage, ensuring proficiency, reducing errors, and enhancing adoption, with training formats controlled by Rishishwar Industry.</li>
          <li>Optimized Fee Collection Process: Larn2Pay streamlines fee collection, minimizing administrative overhead and maximizing efficiency, with Rishishwar Industry retaining control over workflows to ensure operational consistency and platform reliability.</li>
          <li>Future Technology Integration: Rishishwar Industry may integrate emerging technologies like AI or blockchain into Larn2Pay to enhance functionality, at no cost to the institute, reinforcing the platform's cutting-edge status.</li>
          <li>Non-Coercive Fee Facilitation: Larn2Pay serves as a technology enabler for fee collection, with no coercive practices, as the institute retains responsibility for initiating and authorizing collections, ensuring compliance with Rishishwar Industry's policies.</li>
          <li>Voluntary Payment Framework: All payments processed through Larn2Pay are voluntary, initiated by the institute and its stakeholders, ensuring no undue pressure from Rishishwar Industry, maintaining fairness and transparency.</li>
          <li>Technology Provider Role: Rishishwar Industry acts solely as the technology provider for Larn2Pay, enabling fee collection without involvement in enforcement, ensuring clarity in roles and protecting Rishishwar Industry from liability.</li>
          <li>Structured Dispute Resolution Process: Larn2Pay includes a robust mechanism for resolving fee-related disputes, providing clear communication and documentation, with Rishishwar Industry overseeing the process to ensure fairness and compliance.</li>
          <li>Legal Support for Disputes: Rishishwar Industry offers legal assistance for fee collection disputes processed through Larn2Pay, ensuring compliance with regulations and protecting the institute's interests, with Rishishwar Industry retaining decision-making authority.</li>
          <li>Stakeholder Trust Assurance: Larn2Pay's secure, reliable, and transparent operations foster trust among institutes, parents, and students, with Rishishwar Industry ensuring consistent performance and data integrity to maintain stakeholder confidence.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Scope of Services</h2>
        <p className="mb-2">This section defines the services provided by Larn2Pay, focusing on its functionalities, accessibility, and operational support, all tailored to enhance institute efficiency.</p>
        <ul className="list-disc pl-6">
          <li>Secure Cloud-Based Platform: Larn2Pay provides a secure, cloud-based platform for seamless fee collection, data management, and reporting, accessible 24/7, with robust security measures managed by Rishishwar Industry to ensure reliability.</li>
          <li>Comprehensive Student Data Management: Larn2Pay securely manages student details, fee structures, and payment histories, ensuring organized, accurate records, with Rishishwar Industry controlling data access to prevent unauthorized use or breaches.</li>
          <li>User-Friendly Portal and Mobile App: Larn2Pay offers a dedicated portal and mobile app for secure, convenient payment access across devices, with interfaces designed by Rishishwar Industry to ensure ease of use and reliability.</li>
          <li>Automated Fee Invoice Generation: Larn2Pay automatically generates fee invoices based on predefined schedules, reducing manual effort and errors, with Rishishwar Industry overseeing the process to ensure accuracy and compliance.</li>
          <li>Multi-Channel Payment Reminders: Larn2Pay sends automated SMS, WhatsApp, and email reminders to parents, enhancing payment compliance, with notification formats and schedules controlled by Rishishwar Industry for consistency.</li>
          <li>Role-Based Staff Access: Larn2Pay provides teachers and staff with role-based access, ensuring data security and confidentiality, with access levels determined and monitored by Rishishwar Industry to prevent unauthorized actions.</li>
          <li>Real-Time Transaction Reporting: Larn2Pay delivers daily transaction reports, offering insights into collections, pending payments, and discrepancies, with data securely managed by Rishishwar Industry to ensure accuracy and transparency.</li>
          <li>Customizable Institute Branding: Larn2Pay supports institute-specific branding, such as logos and color schemes, for a professional user experience, with branding implementation controlled by Rishishwar Industry to maintain platform consistency.</li>
          <li>Secure Payment Gateway Integration: Larn2Pay integrates with trusted payment gateways, ensuring secure and diverse payment options, with Rishishwar Industry managing integrations to guarantee reliability and protect against transaction failures.</li>
          <li>Automated Defaulter Tracking System: Larn2Pay flags overdue payments, enabling systematic follow-up by institutes, with Rishishwar Industry overseeing the mechanism to ensure accuracy and protect platform integrity.</li>
          <li>Flexible Fee Plan Management: Larn2Pay supports the creation and management of annual fee plans, ensuring accurate scheduling, with Rishishwar Industry retaining control over plan configurations to maintain system reliability.</li>
          <li>Course-Specific Fee Customization: Larn2Pay allows institutes to customize fee structures for different courses, with changes logged and approved by Rishishwar Industry to ensure compliance and system stability.</li>
          <li>Live Dashboard for Monitoring: Larn2Pay's real-time dashboard provides live updates on payment statuses and system performance, with Rishishwar Industry ensuring uninterrupted access and data accuracy for institutes.</li>
          <li>Automated Receipt Generation: Larn2Pay generates verifiable challans and receipts for all transactions, ensuring proof of payment, with formats controlled by Rishishwar Industry to maintain consistency and reliability.</li>
          <li>Comprehensive Payment Tracking: Larn2Pay tracks both online and offline payments, providing a unified record of all transactions, with Rishishwar Industry ensuring data integrity and preventing unauthorized modifications.</li>
          <li>Exportable Financial Reports: Larn2Pay offers downloadable reports in Excel or PDF formats, accessible via the admin panel, with Rishishwar Industry controlling report generation to ensure accuracy and security.</li>
          <li>Secure Multi-User Access: Larn2Pay provides role-based access for multiple users, with activity logging to ensure accountability, managed by Rishishwar Industry to prevent unauthorized access and maintain platform security.</li>
          <li>Student Access Profiles: Larn2Pay offers students secure login profiles to view fee details and payment histories, with access controlled by Rishishwar Industry to ensure data privacy and platform reliability.</li>
          <li>Mobile-Optimized Interface: Larn2Pay is fully optimized for mobile devices, ensuring seamless access for parents and students, with Rishishwar Industry maintaining interface consistency and performance across platforms.</li>
          <li>Exclusive Service Provider Role: Larn2Pay is the sole fee collection platform during the agreement, ensuring data consistency and security, with Rishishwar Industry retaining control over platform operations.</li>
          <li>Customizable Notification Templates: Larn2Pay provides customizable notification templates to enhance stakeholder engagement, with Rishishwar Industry controlling template design and deployment to ensure professionalism and consistency.</li>
          <li>Multi-Language Interface Support: Larn2Pay offers multi-language support for broader accessibility, with language options determined by Rishishwar Industry to ensure compatibility and maintain platform performance standards.</li>
          <li>Automated Policy Compliance Checks: Larn2Pay ensures compliance with institute fee policies through automated checks, reducing errors, with Rishishwar Industry overseeing the process to protect platform integrity.</li>
          <li>Dynamic Fee Adjustment Mechanism: Larn2Pay includes a tool for dynamic fee structure adjustments, with all changes logged and approved by Rishishwar Industry to ensure system stability and compliance.</li>
          <li>Parental Feedback Integration: Larn2Pay collects parental feedback to improve services, with Rishishwar Industry managing the process and determining implementation to align with platform objectives and reliability.</li>
          <li>Efficient Batch Transaction Processing: Larn2Pay supports batch processing for large transactions, ensuring efficiency without additional institute effort, with Rishishwar Industry controlling processing protocols to maintain system performance.</li>
          <li>Real-Time Payment Validation: Larn2Pay validates payments in real-time, protecting against invalid transactions, with Rishishwar Industry overseeing the process to ensure security and minimize dispute risks.</li>
          <li>Dedicated Customer Support: Larn2Pay offers customer support from 10 AM to 6 PM, addressing institute and parental queries, with Rishishwar Industry ensuring timely, professional resolution to maintain trust.</li>
          <li>Parental Payment Flexibility: Larn2Pay supports multiple payment frequencies (e.g., monthly, quarterly), enhancing convenience, with Rishishwar Industry controlling configurations to ensure seamless integration and platform reliability.</li>
          <li>Secure Transaction Archiving: Larn2Pay archives all transaction data securely, with restricted access, managed by Rishishwar Industry to ensure long-term data integrity and compliance with regulatory standards.</li>
          <li>Custom Analytics Dashboard: Larn2Pay provides a customizable analytics dashboard for institutes to gain insights into payment trends, with Rishishwar Industry controlling access and features to ensure data security.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Fee Structure</h2>
        <p className="mb-2">This section outlines the financial framework for Larn2Pay, ensuring transparency and protecting Rishishwar Industry's financial interests.</p>
        <ul className="list-disc pl-6">
          <li>Minimum Transaction Fee Structure: Larn2Pay charges a minimum 5% fee per successful transaction to cover platform maintenance, support, and operational costs, ensuring Rishishwar Industry's financial stability and system reliability.</li>
          <li>Maximum Transaction Fee Cap: Larn2Pay caps transaction fees at ₹225 per transaction, balancing affordability for parents with Rishishwar Industry's need to sustain a secure, high-performance platform.</li>
          <li>Technical Service Charge Application: Larn2Pay applies a ₹75 charge per transaction to fund ongoing maintenance, updates, and support, with Rishishwar Industry retaining control over charge implementation to ensure consistency.</li>
          <li>Automated Fee Deduction Process: Larn2Pay automatically deducts transaction fees from payments, streamlining operations, with Rishishwar Industry ensuring secure, transparent deductions to protect against disputes and maintain financial integrity.</li>
          <li>Dynamic Fee Adjustment Policy: Rishishwar Industry may adjust Larn2Pay fees with 15 days' notice based on market conditions, ensuring financial sustainability while maintaining transparency and platform reliability for institutes.</li>
          <li>Fee Retention During Disputes: Larn2Pay may retain transaction fees during disputes until resolution, protecting Rishishwar Industry's financial interests and ensuring operational continuity without liability for unresolved issues.</li>
          <li>No Liability for Tax Errors: Rishishwar Industry is not liable for tax discrepancies caused by incorrect institute data in Larn2Pay, ensuring protection from financial risks due to client errors.</li>
          <li>Discretionary Fee Waivers: Rishishwar Industry may waive Larn2Pay fees as a goodwill gesture, retaining sole discretion to ensure financial control and maintain positive stakeholder relationships without obligation.</li>
          <li>Premium Feature Surcharges: Larn2Pay may apply surcharges for premium features like advanced analytics, optional for institutes, with Rishishwar Industry controlling pricing to ensure platform sustainability and innovation.</li>
          <li>Non-Refundable Service Charges: All Larn2Pay service charges are non-refundable, ensuring Rishishwar Industry's financial stability and protecting against revenue loss due to client-initiated cancellations or disputes.</li>
          <li>Transparent Fee Display: Larn2Pay displays all fees to parents before payment, reducing disputes and enhancing trust, with Rishishwar Industry controlling transparency protocols to ensure clarity and compliance.</li>
          <li>Institute Consent to Deductions: The institute agrees to Larn2Pay's automatic fee deductions, with Rishishwar Industry retaining authority to enforce deductions, ensuring seamless operations and financial protection.</li>
          <li>Applicable Tax Compliance: Larn2Pay adds applicable taxes (e.g., GST) to fees as per regulations, with Rishishwar Industry ensuring compliance to protect against legal or financial liabilities.</li>
          <li>No Setup Fee for Onboarding: Larn2Pay charges no onboarding fee, reducing institute costs, with Rishishwar Industry covering setup expenses to ensure rapid deployment and platform accessibility.</li>
          <li>Refundable Security Deposit Policy: Larn2Pay may require a ₹10,000 refundable deposit, returned upon termination after clearing dues, with Rishishwar Industry controlling terms to safeguard financial interests.</li>
          <li>Annual Maintenance Charge Structure: Larn2Pay may charge a ₹25,000 annual maintenance fee, covering system upkeep, with Rishishwar Industry ensuring cost transparency and platform reliability for institutes.</li>
          <li>Inclusive Server Maintenance Costs: Larn2Pay includes server maintenance in service fees, eliminating additional charges, with Rishishwar Industry managing infrastructure to ensure uninterrupted, secure platform performance.</li>
          <li>Custom Report Fee Policy: Larn2Pay may charge for customized reports, optional for institutes, with Rishishwar Industry determining pricing to balance service offerings and financial sustainability.</li>
          <li>Payment Gateway Charge Allocation: Larn2Pay ensures gateway charges are borne by payers per gateway terms, with Rishishwar Industry absolved of liability for third-party fee disputes.</li>
          <li>Prohibition of Unauthorized Charges: The institute agrees not to impose unapproved charges via Larn2Pay, with Rishishwar Industry retaining authority to enforce compliance and protect platform integrity.</li>
          <li>No Advance Payment Requirement: Larn2Pay requires no advance payments from institutes, reducing financial burden, with Rishishwar Industry ensuring operational continuity through transaction-based revenue models.</li>
          <li>Non-Refundable Overpayments: Larn2Pay does not refund overpayments due to institute errors, protecting Rishishwar Industry's financial interests and ensuring accountability for accurate data submission.</li>
          <li>Transaction Fee Scalability: Larn2Pay may adjust fees based on transaction volume, ensuring scalability, with Rishishwar Industry notifying institutes in advance to maintain transparency and financial control.</li>
          <li>Fee Structure Review Rights: Rishishwar Industry reserves the right to review and modify Larn2Pay's fee structure periodically, ensuring alignment with operational costs and market dynamics, with institutes notified promptly.</li>
          <li>Financial Audit Support: Larn2Pay provides financial data for audits, with Rishishwar Industry controlling access to ensure data security and compliance, protecting against misuse or unauthorized access.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Payment and Settlement</h2>
        <p className="mb-2">This section details the payment and settlement processes for Larn2Pay, ensuring efficiency and protecting Rishishwar Industry's financial interests.</p>
        <ul className="list-disc pl-6">
          <li>Detailed Monthly Settlement Reports: Larn2Pay provides comprehensive monthly reports detailing transactions, collections, and discrepancies, with Rishishwar Industry ensuring accuracy and transparency to support institute financial planning.</li>
          <li>T+7 Settlement Timeline: Larn2Pay settles collected fees within T+7 working days to the institute's account, with Rishishwar Industry ensuring secure, timely transfers to maintain trust and operational efficiency.</li>
          <li>No Liability for Gateway Failures: Rishishwar Industry is not liable for transaction failures due to payment gateway issues in Larn2Pay, protecting against financial risks from third-party system failures.</li>
          <li>Secure NEFT/RTGS Settlements: Larn2Pay processes settlements via NEFT or RTGS, ensuring secure fund transfers, with Rishishwar Industry managing the process to prevent errors and ensure reliability.</li>
          <li>Deduction of Outstanding Dues: Larn2Pay deducts any outstanding dues owed to Rishishwar Industry before settlements, ensuring financial protection and operational continuity, with institutes notified of deductions for transparency.</li>
          <li>Institute Data Accuracy Responsibility: The institute is responsible for providing accurate settlement data to Larn2Pay, absolving Rishishwar Industry of liability for errors caused by incorrect or incomplete information.</li>
          <li>Flexible Settlement Schedule Adjustments: Rishishwar Industry may adjust Larn2Pay's settlement schedules with prior notice, ensuring operational efficiency while maintaining transparency and protecting against financial disruptions.</li>
          <li>Payment Hold for Fraud Verification: Larn2Pay may hold payments for fraud verification, with Rishishwar Industry overseeing the process to ensure platform integrity and protect against financial risks or disputes.</li>
          <li>Automated Settlement Audit System: Larn2Pay conducts automated audits of settlements, ensuring accuracy without institute involvement, with Rishishwar Industry retaining control to maintain data integrity and transparency.</li>
          <li>Priority Processing for High-Volume Clients: Larn2Pay prioritizes payment processing for high-volume institutes, ensuring efficiency, with Rishishwar Industry managing prioritization to optimize platform performance and financial outcomes.</li>
          <li>No Interest on Held Payments: Rishishwar Industry is not liable for interest on payments held during disputes or verifications in Larn2Pay, protecting against financial claims and ensuring operational focus.</li>
          <li>Settlement Confirmation Requirement: The institute must confirm receipt of Larn2Pay settlements within 48 hours, with Rishishwar Industry retaining authority to enforce compliance and ensure accurate financial tracking.</li>
          <li>No Liability for Bank Delays: Rishishwar Industry is not responsible for delays in settlements caused by banking systems, ensuring Larn2Pay's reliability is not compromised by external financial institutions.</li>
          <li>Carry-Forward of Overdue Transactions: Larn2Pay carries forward pending transactions to the next cycle, with Rishishwar Industry managing the process to ensure continuity and protect against financial disputes.</li>
          <li>Valid Receipt Policy: Only receipts generated by Larn2Pay are considered valid, with Rishishwar Industry ensuring their authenticity to prevent fraud and maintain trust in the platform.</li>
          <li>Digital-Only Report Validity: Larn2Pay's financial reports are valid only in digital format, with Rishishwar Industry controlling distribution to ensure efficiency, security, and compliance with platform standards.</li>
          <li>Prohibition of Data Modifications: The institute cannot edit Larn2Pay's transactional data, ensuring record integrity, with Rishishwar Industry enforcing restrictions to protect against unauthorized changes or disputes.</li>
          <li>Payment Suspension in Force Majeure: Larn2Pay may suspend payments during force majeure events, with Rishishwar Industry notifying institutes and managing suspensions to protect platform operations and financial stability.</li>
          <li>No Early Settlement Demands: The institute cannot demand settlements before Larn2Pay's T+7 timeline, with Rishishwar Industry enforcing this policy to ensure orderly financial operations and protect against disruptions.</li>
          <li>Approval for Special Schemes: Discounts or schemes in Larn2Pay require Rishishwar Industry's prior approval, ensuring alignment with platform goals and protecting financial interests from unauthorized modifications.</li>
          <li>Late Payment Penalty Fee: Larn2Pay may impose a ₹500 fee for delayed institute payments, with Rishishwar Industry enforcing penalties to ensure timely compliance and protect financial operations.</li>
          <li>Finality of Dispute Reports: Larn2Pay's financial reports are final in disputes, with Rishishwar Industry ensuring their accuracy and transparency to resolve conflicts and protect platform integrity.</li>
          <li>Secure Settlement Notifications: Larn2Pay notifies institutes of settlement completions via secure channels, with Rishishwar Industry controlling communication protocols to ensure confidentiality and operational efficiency.</li>
          <li>Fraud Detection Protocols: Larn2Pay employs advanced fraud detection to protect transactions, with Rishishwar Industry overseeing protocols to ensure platform security and minimize financial risks or disputes.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Technical Support and Training</h2>
        <p className="mb-2">This section outlines technical support and training for Larn2Pay, ensuring seamless adoption and operation.</p>
        <ul className="list-disc pl-6">
          <li>Comprehensive Onboarding Training: Rishishwar Industry provides free, detailed training for institute staff on Larn2Pay, ensuring proficiency, reducing errors, and enhancing adoption, with training formats controlled for consistency and effectiveness.</li>
          <li>Dedicated Technical Support Team: Larn2Pay offers a dedicated team to address institute queries and resolve issues, with Rishishwar Industry ensuring prompt, professional support to maintain platform reliability and user trust.</li>
          <li>Defined Support Hours: Larn2Pay support is available Monday to Saturday, 10 AM to 6 PM, with Rishishwar Industry ensuring timely responses to maintain operational continuity and stakeholder satisfaction.</li>
          <li>Emergency Helpline Availability: Larn2Pay provides an emergency helpline for critical issues, with Rishishwar Industry ensuring rapid resolution to minimize disruptions and maintain platform reliability for institutes.</li>
          <li>Regular System Update Notifications: Larn2Pay shares weekly and monthly update notifications, with Rishishwar Industry ensuring transparency and maintaining platform functionality to support institute operations without interruption.</li>
          <li>Streamlined Issue Reporting Feature: Larn2Pay's dashboard includes a "Report Issue" feature for efficient issue logging, with Rishishwar Industry managing the process to ensure quick resolution and platform stability.</li>
          <li>Comprehensive Training Materials: Larn2Pay provides PDFs and video tutorials for self-paced learning, with Rishishwar Industry controlling content to ensure accuracy, relevance, and alignment with platform functionalities.</li>
          <li>Access to Training Recordings: Larn2Pay offers recorded training sessions for staff review, with Rishishwar Industry ensuring secure access and content control to maintain consistency and protect platform integrity.</li>
          <li>Secure Login Instructions: Larn2Pay provides detailed login instructions for staff, with Rishishwar Industry ensuring secure access protocols to prevent unauthorized use and maintain platform security standards.</li>
          <li>Proactive Technical Update Alerts: Rishishwar Industry communicates Larn2Pay technical updates via email, ensuring institutes are informed of enhancements, with control over updates to maintain platform reliability and security.</li>
          <li>Quarterly Refresher Training Sessions: Larn2Pay offers quarterly refresher training to keep staff updated, with Rishishwar Industry controlling sessions to ensure alignment with platform updates and operational efficiency.</li>
          <li>Online Support Resource Center: Larn2Pay provides a digital support center with FAQs and resources, managed by Rishishwar Industry to ensure accessibility, accuracy, and alignment with platform objectives.</li>
          <li>Proactive Issue Monitoring System: Larn2Pay proactively monitors and resolves issues before they impact operations, with Rishishwar Industry ensuring minimal disruptions and maintaining the platform's reputation for reliability.</li>
          <li>Optional Premium Support Packages: Larn2Pay may offer premium support packages at Rishishwar Industry's discretion, with pricing and features controlled to balance institute needs and platform sustainability.</li>
          <li>Priority-Based Support Ticketing: Larn2Pay prioritizes support tickets based on internal criteria, with Rishishwar Industry ensuring efficient resolution to maintain operational continuity and protect platform performance.</li>
          <li>Remote Troubleshooting Capability: Larn2Pay supports remote troubleshooting for quick fixes, with Rishishwar Industry managing the process to ensure rapid resolution and maintain platform reliability for institutes.</li>
          <li>Training Feedback Mechanism: Larn2Pay collects training feedback, with Rishishwar Industry determining implementation to improve sessions while ensuring alignment with platform goals and operational efficiency.</li>
          <li>Support Interaction Logging: Larn2Pay logs all support interactions for transparency, with Rishishwar Industry ensuring records protect against disputes and maintain accountability in platform operations.</li>
          <li>AI-Powered Support Automation: Larn2Pay uses AI-powered bots for routine query resolution, reducing costs, with Rishishwar Industry ensuring bot accuracy and alignment with platform support standards.</li>
          <li>Support Hour Expansion Rights: Rishishwar Industry may expand Larn2Pay's support hours at its discretion, ensuring flexibility to meet institute needs while maintaining control over operational resources.</li>
          <li>Sandbox Testing Environment: Larn2Pay provides a sandbox for demo transactions, ensuring no impact on live data, with Rishishwar Industry controlling access to maintain platform security and reliability.</li>
          <li>Customer Support SLA Commitment: Larn2Pay resolves issues within 48 hours per SLA, with Rishishwar Industry ensuring compliance to maintain trust and operational efficiency for institutes.</li>
          <li>Critical Issue Prioritization: Larn2Pay prioritizes critical issues for rapid resolution, with Rishishwar Industry managing the process to minimize disruptions and uphold platform reliability standards.</li>
          <li>Multi-Channel Support Access: Larn2Pay offers dedicated email and WhatsApp support channels, with Rishishwar Industry ensuring accessibility and security to maintain stakeholder trust and platform efficiency.</li>
          <li>Support Activity Audit Trails: Larn2Pay records support activities for accountability, with Rishishwar Industry ensuring logs are secure and protect against disputes, maintaining platform transparency and reliability.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Data Security and Confidentiality</h2>
        <p className="mb-2">This section details Larn2Pay's robust measures to ensure data security and confidentiality.</p>
        <ul className="list-disc pl-6">
          <li>Encrypted Indian Server Hosting: Larn2Pay hosts data on encrypted servers in India, complying with local regulations, with Rishishwar Industry ensuring robust security to protect against unauthorized access or breaches.</li>
          <li>Strict Authorized Access Controls: Larn2Pay restricts data access to authorized personnel only, with Rishishwar Industry implementing stringent controls to ensure confidentiality and protect platform data from misuse.</li>
          <li>No Third-Party Data Sharing: Larn2Pay does not share institute data with third parties unless legally required, with Rishishwar Industry ensuring compliance to protect confidentiality and maintain stakeholder trust.</li>
          <li>Data Erasure Post-Termination: Larn2Pay erases institute data within 30 days of termination, with Rishishwar Industry controlling the process to ensure compliance and protect against unauthorized data retention.</li>
          <li>OTP-Based Secure Authentication: Larn2Pay uses OTP-based login for enhanced security, with Rishishwar Industry managing authentication protocols to prevent unauthorized access and ensure platform reliability.</li>
          <li>Comprehensive Activity Logging: Larn2Pay logs all user activities for accountability, with Rishishwar Industry ensuring secure storage and access control to protect against disputes and maintain data integrity.</li>
          <li>Secure Data Export Capabilities: Larn2Pay allows institutes to export data in standard formats, with Rishishwar Industry controlling access to ensure security and compliance with platform data protection standards.</li>
          <li>Proprietary Encryption Standards: Larn2Pay employs proprietary encryption methods, with Rishishwar Industry ensuring advanced security to protect data from breaches and maintain platform reliability and trust.</li>
          <li>Detailed Data Access Audit Trails: Larn2Pay maintains audit trails for data access, with Rishishwar Industry ensuring transparency and accountability to protect against unauthorized use and potential disputes.</li>
          <li>No Liability for Client Breaches: Rishishwar Industry is not liable for data breaches caused by institute negligence in Larn2Pay, ensuring protection from risks due to client errors or mismanagement.</li>
          <li>Data Retention Policy Control: Rishishwar Industry controls Larn2Pay's data retention policies, ensuring compliance with regulations and protecting platform data from unauthorized access or prolonged retention risks.</li>
          <li>Secure Data Archiving System: Larn2Pay archives data securely with restricted access, managed by Rishishwar Industry to ensure long-term integrity and compliance with data protection standards and regulations.</li>
          <li>Anonymized Data Usage Rights: Rishishwar Industry may use anonymized Larn2Pay data for platform improvements, without institute consent, ensuring innovation while protecting stakeholder privacy and platform security.</li>
          <li>Advanced Breach Mitigation Protocols: Larn2Pay employs advanced protocols to minimize data breach impacts, with Rishishwar Industry ensuring rapid response and recovery to maintain platform trust and reliability.</li>
          <li>Mandatory Periodic Security Audits: Larn2Pay undergoes regular security audits, with Rishishwar Industry ensuring platform robustness and compliance to protect against vulnerabilities and maintain stakeholder confidence.</li>
          <li>Encrypted SSL Data Transmission: Larn2Pay uses SSL connections for secure data transmission, with Rishishwar Industry ensuring protection against interception to maintain confidentiality and platform reliability.</li>
          <li>Role-Based Access Permissions: Larn2Pay restricts users to relevant data and functionalities, with Rishishwar Industry managing permissions to ensure security and prevent unauthorized access or misuse.</li>
          <li>Prompt Breach Notification Process: Larn2Pay notifies institutes promptly of data breaches, with Rishishwar Industry managing communications to ensure transparency, compliance, and rapid resolution to maintain trust.</li>
          <li>Enforced Strong Password Policy: Larn2Pay mandates complex passwords for all users, with Rishishwar Industry ensuring compliance to enhance security and protect against unauthorized access or platform vulnerabilities.</li>
          <li>Transparent Data Policy Communication: Rishishwar Industry explains Larn2Pay's data protection policies to institutes, ensuring clarity and compliance, with policies designed to protect platform integrity and stakeholder trust.</li>
          <li>Global Data Protection Compliance: Larn2Pay adheres to GDPR and other global standards, with Rishishwar Industry ensuring compliance to protect against legal risks and maintain platform reliability internationally.</li>
          <li>Mandatory Employee Data Training: Larn2Pay staff access data only after mandatory data protection training, with Rishishwar Industry ensuring compliance to protect against internal breaches and maintain trust.</li>
          <li>Institute Data Ownership Assurance: The institute retains full ownership of Larn2Pay data, with Rishishwar Industry acting as a processor, ensuring compliance and protecting against unauthorized data claims.</li>
          <li>Regular Data Backup Protocols: Larn2Pay implements regular data backups, with Rishishwar Industry ensuring secure storage and recovery capabilities to protect against data loss and maintain platform reliability.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Service Level Agreement (SLA)</h2>
        <p className="mb-2">This section defines Larn2Pay's performance commitments, ensuring reliability and efficiency.</p>
        <ul className="list-disc pl-6">
          <li>High System Uptime Guarantee: Larn2Pay maintains 99.5% monthly uptime, ensuring reliable access, with Rishishwar Industry managing infrastructure to minimize disruptions and uphold platform performance standards.</li>
          <li>Prompt Query Response Commitment: Larn2Pay addresses general queries within 24 hours, with Rishishwar Industry ensuring timely responses to maintain institute satisfaction and operational efficiency across platform interactions.</li>
          <li>Rapid Critical Issue Resolution: Larn2Pay resolves critical issues within 4 hours, with Rishishwar Industry prioritizing rapid fixes to minimize disruptions and maintain the platform's reputation for reliability.</li>
          <li>Uninterrupted Dashboard Functionality: Larn2Pay ensures the dashboard remains fully functional for real-time access, with Rishishwar Industry managing performance to support institute operations and maintain data accuracy.</li>
          <li>Mobile App Performance Standards: Larn2Pay's mobile app maintains a 98% performance SLA, with Rishishwar Industry ensuring reliability and accessibility to support seamless stakeholder interactions and platform trust.</li>
          <li>Advance Downtime Notifications: Larn2Pay notifies institutes of planned maintenance 48 hours in advance, with Rishishwar Industry ensuring transparency to minimize disruptions and maintain operational trust.</li>
          <li>Detailed Downtime Reporting: Larn2Pay provides comprehensive downtime reports, with Rishishwar Industry ensuring transparency and documentation to address institute concerns and maintain platform reliability standards.</li>
          <li>Severity-Based Error Classification: Larn2Pay classifies errors by severity for prioritized resolution, with Rishishwar Industry managing the process to ensure efficiency and protect platform performance and stakeholder trust.</li>
          <li>Fee Waivers for SLA Breaches: Larn2Pay may waive fees for unresolved critical issues, with Rishishwar Industry retaining discretion to ensure financial protection while addressing institute concerns fairly.</li>
          <li>Transparent SLA Violation Reporting: Larn2Pay reports SLA violations with corrective actions, with Rishishwar Industry ensuring transparency and accountability to maintain trust and uphold platform performance standards.</li>
          <li>Monthly SLA Performance Reports: Larn2Pay provides monthly reports detailing uptime and resolution metrics, with Rishishwar Industry ensuring accuracy to support institute planning and maintain platform reliability.</li>
          <li>Regular SLA Performance Analysis: Larn2Pay conducts regular SLA analyses to improve service quality, with Rishishwar Industry implementing enhancements to ensure continuous platform improvement and stakeholder satisfaction.</li>
          <li>Quarterly SLA Review Meetings: Larn2Pay holds quarterly SLA review meetings with institutes, with Rishishwar Industry managing discussions to address performance and plan enhancements for platform reliability.</li>
          <li>SLA Customization Flexibility: Rishishwar Industry may customize Larn2Pay's SLA terms, ensuring flexibility to meet operational needs while maintaining control over performance standards and platform reliability.</li>
          <li>No Liability for External Disruptions: Rishishwar Industry is not liable for SLA violations caused by external factors, ensuring Larn2Pay's reliability is not compromised by third-party issues or disruptions.</li>
          <li>Comprehensive SLA Compliance Reports: Larn2Pay provides detailed SLA compliance reports, with Rishishwar Industry ensuring transparency and accountability to maintain institute trust and platform performance standards.</li>
          <li>Beta Feature SLA Exemption: Larn2Pay's SLA does not apply to beta features, allowing Rishishwar Industry to innovate freely while protecting against liability for experimental functionality issues.</li>
          <li>Institute Acknowledgment of SLA Limits: The institute acknowledges Larn2Pay's operational constraints on SLAs, with Rishishwar Industry ensuring clarity to protect against unrealistic expectations and maintain platform trust.</li>
          <li>SLA Metrics Definition Control: Rishishwar Industry defines Larn2Pay's SLA metrics, ensuring alignment with platform capabilities and protecting against disputes over performance expectations or compliance issues.</li>
          <li>Discretionary SLA Review Initiation: Rishishwar Industry may initiate Larn2Pay SLA reviews at its discretion, ensuring proactive performance management and maintaining platform reliability and institute satisfaction.</li>
          <li>No Penalties for Minor SLA Breaches: Larn2Pay incurs no penalties for minor SLA breaches, with Rishishwar Industry ensuring fairness while protecting against financial liabilities and maintaining platform trust.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Error Resolution Process</h2>
        <p className="mb-2">This section outlines Larn2Pay's procedures for addressing platform issues, ensuring rapid resolution.</p>
        <ul className="list-disc pl-6">
          <li>Efficient Error Reporting System: Larn2Pay's dashboard includes a "Report Issue" feature for streamlined error logging, with Rishishwar Industry ensuring quick resolution to maintain platform reliability and institute trust.</li>
          <li>Unique Ticket Assignment Process: Larn2Pay assigns unique ticket numbers to each reported issue, with Rishishwar Industry ensuring tracking and accountability to resolve problems efficiently and maintain platform performance.</li>
          <li>Priority-Based Issue Resolution: Larn2Pay resolves issues based on SLA priorities, with Rishishwar Industry managing the process to ensure rapid fixes and minimize disruptions to institute operations.</li>
          <li>Rapid Critical Error Response: Larn2Pay responds to critical errors within 2 hours, with Rishishwar Industry ensuring swift action to maintain platform reliability and protect stakeholder confidence.</li>
          <li>Non-Critical Issue Resolution Timeline: Larn2Pay resolves non-critical issues within 48 hours, with Rishishwar Industry managing timelines to ensure efficiency and maintain trust in platform performance.</li>
          <li>Regular Resolution Update Notifications: Larn2Pay provides issue resolution updates via email or WhatsApp, with Rishishwar Industry ensuring transparent communication to keep institutes informed and maintain platform trust.</li>
          <li>Institute Confirmation of Resolutions: The institute must confirm Larn2Pay issue resolutions for closure, with Rishishwar Industry enforcing compliance to ensure accountability and protect against unresolved disputes.</li>
          <li>Detailed Resolution Tracking System: Larn2Pay documents resolution processes for accountability, with Rishishwar Industry ensuring secure records to protect against disputes and maintain platform transparency.</li>
          <li>Monthly Error Report Summaries: Larn2Pay provides monthly reports on error frequency and resolution times, with Rishishwar Industry ensuring accuracy to support institute planning and maintain platform reliability.</li>
          <li>Historical Issue Logging System: Larn2Pay logs past issues for trend analysis, with Rishishwar Industry ensuring secure storage and access control to improve platform performance and prevent recurrence.</li>
          <li>Internal Error Resolution Prioritization: Rishishwar Industry prioritizes Larn2Pay issue resolutions based on internal assessments, ensuring efficiency and protecting platform performance while addressing institute needs promptly.</li>
          <li>No Liability for Client-Induced Errors: Rishishwar Industry is not responsible for errors caused by institute actions in Larn2Pay, protecting against liability and ensuring accountability for accurate platform usage.</li>
          <li>Automated Error Detection Tools: Larn2Pay uses automated tools to proactively identify and resolve issues, with Rishishwar Industry ensuring minimal disruptions and maintaining the platform's reputation for reliability.</li>
          <li>Flexible Resolution Timelines: Larn2Pay may adjust resolution timelines based on issue complexity, with Rishishwar Industry ensuring transparency and efficiency to maintain platform performance and institute trust.</li>
          <li>Resolution Feedback Collection: Larn2Pay collects institute feedback on resolutions, with Rishishwar Industry determining implementation to improve processes while ensuring alignment with platform goals and reliability.</li>
          <li>Secure Resolution Audit Trails: Larn2Pay logs resolution activities for transparency, with Rishishwar Industry ensuring secure records to protect against disputes and maintain accountability in platform operations.</li>
          <li>No Compensation for Minor Errors: Larn2Pay does not compensate for minor errors, with Rishishwar Industry ensuring fairness while protecting against financial liabilities and maintaining platform trust.</li>
          <li>Streamlined Error Reporting Process: Rishishwar Industry may streamline Larn2Pay's error reporting processes, ensuring efficiency and protecting platform performance while addressing institute needs promptly and effectively.</li>
          <li>Proactive Error Prevention Measures: Larn2Pay implements proactive measures to prevent errors, with Rishishwar Industry ensuring system robustness to maintain reliability and protect against operational disruptions.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Reporting and Auditing Provisions</h2>
        <p className="mb-2">This section details Larn2Pay's reporting and auditing mechanisms, ensuring transparency and compliance.</p>
        <ul className="list-disc pl-6">
          <li>Comprehensive Monthly Transaction Reports: Larn2Pay provides detailed monthly reports summarizing transactions and discrepancies, with Rishishwar Industry ensuring accuracy to support institute financial planning and maintain platform trust.</li>
          <li>Flexible Transaction History Formats: Larn2Pay offers transaction histories in Excel or PDF, with Rishishwar Industry controlling formats to ensure accessibility, security, and alignment with institute reporting needs.</li>
          <li>Institute Audit Request Process: Larn2Pay allows institutes to request audits using system logs, with Rishishwar Industry managing access to ensure security and compliance with platform standards.</li>
          <li>Timely Audit Report Delivery: Larn2Pay delivers audit reports within 7 working days, with Rishishwar Industry ensuring accuracy and transparency to support institute oversight and maintain platform reliability.</li>
          <li>Internal Audit Sufficiency: Larn2Pay's internal logging and encryption eliminate third-party audit needs, with Rishishwar Industry ensuring robust systems to protect data integrity and maintain stakeholder trust.</li>
          <li>Detailed Login Activity Reports: Larn2Pay provides reports on user access for accountability, with Rishishwar Industry ensuring secure storage and transparency to protect against disputes and maintain platform reliability.</li>
          <li>Transparent Fee Details Access: Larn2Pay displays fee details on the platform, with Rishishwar Industry ensuring accessibility and accuracy to reduce disputes and maintain stakeholder confidence in operations.</li>
          <li>Live Reporting Dashboard Access: Larn2Pay's real-time dashboard provides insights into collections and transactions, with Rishishwar Industry ensuring uninterrupted access and data accuracy to support institute operations.</li>
          <li>Customizable MIS Report Options: Larn2Pay offers tailored MIS reports to meet institute needs, with Rishishwar Industry controlling customization to ensure data security and alignment with platform standards.</li>
          <li>Read-Only Audit Database Access: Larn2Pay provides read-only audit access, with Rishishwar Industry ensuring security and preventing unauthorized modifications to maintain data integrity and platform reliability.</li>
          <li>Comprehensive User Activity Recording: Larn2Pay logs all user activities for transparency, with Rishishwar Industry ensuring secure storage and access control to protect against disputes and maintain accountability.</li>
          <li>Secure Communication Record Storage: Larn2Pay saves SMS and WhatsApp reports for auditing, with Rishishwar Industry ensuring secure storage to support compliance and protect against disputes or misuse.</li>
          <li>Detailed Collection Report Access: Larn2Pay's dashboard provides reports on collections, pending, and failed transactions, with Rishishwar Industry ensuring accuracy and accessibility to support institute financial oversight.</li>
          <li>Institute Choice of Report Formats: Larn2Pay allows institutes to choose report formats, with Rishishwar Industry controlling options to ensure compatibility, security, and alignment with platform reporting standards.</li>
          <li>Automated Report Email Delivery: Larn2Pay emails reports on a schedule, with Rishishwar Industry ensuring secure, timely delivery to support institute planning and maintain operational efficiency and trust.</li>
          <li>One-Year Log Retention Policy: Larn2Pay retains logs for one year for compliance, with Rishishwar Industry controlling retention to ensure data security and protect against unauthorized access or misuse.</li>
          <li>Password-Protected Data Exports: Larn2Pay secures data exports with passwords, with Rishishwar Industry ensuring protection against unauthorized access to maintain data integrity and platform reliability.</li>
          <li>Quarterly Report Review Meetings: Larn2Pay holds quarterly review meetings to address discrepancies, with Rishishwar Industry managing discussions to improve reporting and maintain platform transparency and trust.</li>
          <li>Audit Findings Implementation Process: Larn2Pay implements audit findings to enhance systems, with Rishishwar Industry controlling improvements to ensure alignment with platform goals and operational reliability.</li>
          <li>Institute Audit Participation Rights: Larn2Pay allows institute representatives to attend internal audits, with Rishishwar Industry controlling access to ensure security and maintain platform transparency and accountability.</li>
          <li>Proprietary Reporting Tool Usage: Larn2Pay uses proprietary reporting tools for accuracy, with Rishishwar Industry ensuring robust systems to protect data integrity and maintain platform reliability for institutes.</li>
          <li>Custom Report Fee Structure: Larn2Pay may charge for customized reports, with Rishishwar Industry determining pricing to balance institute needs and ensure financial sustainability for platform operations.</li>
          <li>No Liability for Report Misinterpretation: Rishishwar Industry is not liable for institute misinterpretation of Larn2Pay reports, protecting against disputes and ensuring accountability for accurate data usage.</li>
          <li>Automated Report Scheduling Control: Rishishwar Industry controls Larn2Pay's report schedules, ensuring efficiency and alignment with platform goals to support institute planning and maintain operational reliability.</li>
          <li>Restricted Access to Sensitive Reports: Larn2Pay restricts sensitive reports to authorized personnel, with Rishishwar Industry ensuring security to protect against unauthorized access and maintain platform trust.</li>
          <li>Audit Frequency Determination Rights: Rishishwar Industry determines Larn2Pay's audit frequency, ensuring compliance and protecting platform data integrity while addressing institute needs efficiently and transparently.</li>
          <li>Two-Year Report Retention Policy: Larn2Pay retains reports for two years for compliance, with Rishishwar Industry controlling retention to ensure data security and protect against unauthorized access or misuse.</li>
          <li>No Third-Party Report Sharing: Larn2Pay does not share reports with third parties, with Rishishwar Industry ensuring confidentiality to protect institute data and maintain platform trust and compliance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. Statutory Authorization and Delegation</h2>
        <p className="mb-2">This section outlines Rishishwar Industry's authorization to collect fees via Larn2Pay.</p>
        <ul className="list-disc pl-6">
          <li>Institute Appointment of Larn2Pay: [Client Brand Name] appoints Rishishwar Industry as its exclusive representative to collect student fees via Larn2Pay, ensuring seamless, secure operations under Rishishwar Industry's control to maintain platform reliability.</li>
          <li>Authorization Validity Period: Larn2Pay's authorization remains valid for the agreement's duration, ensuring uninterrupted fee collection, with Rishishwar Industry managing terms to protect operational continuity and platform integrity.</li>
          <li>Authorized Digital Payment Methods: Larn2Pay is authorized to collect fees via UPI, cards, net banking, E-Nach, and E-Mandate, with Rishishwar Industry ensuring secure, reliable processing to protect stakeholder interests.</li>
          <li>Charges on Successful Transactions Only: Larn2Pay charges fees only on successful transactions, ensuring transparency, with Rishishwar Industry controlling fee structures to maintain financial stability and protect against disputes.</li>
          <li>Non-Coercive Collection Policy: Larn2Pay does not engage in coercive collection or set payment targets, with Rishishwar Industry ensuring compliance to maintain fairness and protect platform reputation.</li>
          <li>Mandatory Institute Portal Usage: The institute ensures all stakeholders use Larn2Pay exclusively for fee collection, with Rishishwar Industry enforcing compliance to maintain data consistency and platform security.</li>
          <li>Transaction Fee Authorization Rights: Larn2Pay may charge a minimum 5% and maximum ₹225 per transaction, with Rishishwar Industry retaining authority to ensure financial sustainability and platform reliability.</li>
          <li>Exclusive Authorization Process Control: Rishishwar Industry controls Larn2Pay's authorization process, ensuring streamlined operations and protecting against unauthorized modifications to maintain platform efficiency and stakeholder trust.</li>
          <li>No Institute Modification of Terms: The institute cannot modify Larn2Pay's authorization terms without Rishishwar Industry's consent, ensuring control and protecting against disruptions to platform operations or agreements.</li>
          <li>Authorization Extension Flexibility: Rishishwar Industry may extend Larn2Pay's authorization period at its discretion, ensuring operational continuity and protecting platform interests while maintaining institute compliance and trust.</li>
          <li>No Liability for Misuse Disputes: Rishishwar Industry is not liable for disputes arising from institute misuse of Larn2Pay's authorization, protecting against financial or legal risks due to client errors.</li>
          <li>Automated Authorization Audit System: Larn2Pay conducts automated audits of authorization compliance, with Rishishwar Industry ensuring accuracy without institute involvement to maintain platform integrity and transparency.</li>
          <li>Detailed Authorization Documentation: Larn2Pay documents authorization activities for legal protection, with Rishishwar Industry ensuring secure records to protect against disputes and maintain platform reliability and trust.</li>
          <li>Institute Acknowledgment of Role: The institute acknowledges Rishishwar Industry's role in Larn2Pay's fee-related communications, ensuring clarity and compliance, with Rishishwar Industry controlling interactions to maintain platform standards.</li>
          <li>Prohibition of Third-Party Authorization: The institute cannot delegate Larn2Pay's fee collection to third parties without Rishishwar Industry's approval, ensuring control and protecting platform data and operational integrity.</li>
          <li>Secure Authorization Communication: Larn2Pay communicates authorization details securely, with Rishishwar Industry controlling channels to ensure confidentiality and protect against unauthorized access or misuse of platform data.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">11. Termination Clauses</h2>
        <p className="mb-2">This section outlines conditions and procedures for terminating the Larn2Pay agreement.</p>
        <ul className="list-disc pl-6">
          <li>Written Notice Termination Process: Either party may terminate the Larn2Pay agreement with 30 days' written notice, clearing all dues, with Rishishwar Industry controlling the process to ensure orderly closure and platform protection.</li>
          <li>Immediate Termination for Breaches: Larn2Pay allows immediate termination for agreement breaches, with Rishishwar Industry enforcing terms to protect platform integrity and ensure compliance from institutes.</li>
          <li>Institute Liability Until Termination: The institute remains liable for all Larn2Pay obligations until termination, with Rishishwar Industry ensuring accountability to protect financial and operational interests during the agreement period.</li>
          <li>Final Settlement Within 15 Days: Larn2Pay completes final settlements within 15 days of termination, with Rishishwar Industry ensuring secure, timely transfers to protect financial interests and maintain transparency.</li>
          <li>Software Access Termination Rights: Rishishwar Industry may terminate Larn2Pay access upon agreement closure, ensuring platform protection and preventing unauthorized use by institutes or third parties post-termination.</li>
          <li>Secure Data Handover Process: Larn2Pay hands over institute data within 30 days of termination, with Rishishwar Industry controlling the process to ensure security, compliance, and protection against unauthorized access.</li>
          <li>Written Receipt for Data Delivery: Larn2Pay requires a written receipt for data delivery post-termination, with Rishishwar Industry ensuring accountability to protect against disputes and maintain platform transparency.</li>
          <li>Fee Clearance for Data Release: Larn2Pay releases data only after clearing outstanding fees, with Rishishwar Industry enforcing compliance to protect financial interests and ensure orderly termination processes.</li>
          <li>No Re-Service Without Dues Clearance: Larn2Pay services cannot resume post-termination without clearing dues, with Rishishwar Industry enforcing terms to protect financial stability and maintain platform integrity.</li>
          <li>Court-Guided Termination Disputes: Larn2Pay disputes follow court guidelines for termination, with Rishishwar Industry ensuring compliance to protect against legal risks and maintain platform reputation and reliability.</li>
          <li>Post-Termination Confidentiality Obligations: Larn2Pay's confidentiality obligations persist after termination, with Rishishwar Industry ensuring compliance to protect data integrity and maintain stakeholder trust in platform operations.</li>
          <li>Prohibition of Brand or System Use: The institute cannot use Larn2Pay's brand or system post-termination, with Rishishwar Industry enforcing restrictions to protect intellectual property and platform integrity.</li>
          <li>Termination Rights Protection: Larn2Pay's termination process protects Rishishwar Industry's rights, ensuring control over platform assets and preventing institute actions that could compromise operational or financial interests.</li>
          <li>Pre-Termination Review Meeting: Larn2Pay holds a review meeting 30 days prior to termination, with Rishishwar Industry managing discussions to ensure orderly closure and protect platform interests.</li>
          <li>Termination of User Logins: Larn2Pay terminates all user logins upon agreement closure, with Rishishwar Industry ensuring security to prevent unauthorized access and protect platform data integrity.</li>
          <li>Cessation of Transaction Processing: Larn2Pay stops all transactions upon termination, with Rishishwar Industry ensuring orderly cessation to protect financial operations and maintain platform reliability and trust.</li>
          <li>Retention of Platform IP Rights: Rishishwar Industry retains all Larn2Pay platform and IP rights post-termination, ensuring protection against unauthorized use and maintaining control over proprietary technology.</li>
          <li>No Penalties for Non-Mistake Termination: Larn2Pay incurs no penalties for termination not due to misconduct, with Rishishwar Industry ensuring fairness while protecting against financial liabilities and disputes.</li>
          <li>Nullification of Clauses Post-Termination: Larn2Pay clauses are declared null in writing post-termination, with Rishishwar Industry controlling documentation to ensure clarity, compliance, and protection of platform interests.</li>
          <li>Premature Termination Fee Policy: Larn2Pay may impose a fee for premature termination, with Rishishwar Industry determining charges to protect financial stability and ensure orderly platform operations.</li>
          <li>No Post-Termination Liability: Rishishwar Industry is not liable for issues post-Larn2Pay termination, protecting against claims and ensuring focus on platform reliability during the active agreement period.</li>
          <li>Termination Process Control Rights: Rishishwar Industry controls Larn2Pay's termination process, ensuring orderly closure, protecting platform assets, and maintaining compliance with financial and operational standards.</li>
          <li>Retention of Transaction Logs: Larn2Pay retains transaction logs post-termination for compliance, with Rishishwar Industry ensuring secure storage to protect against disputes and maintain platform transparency.</li>
          <li>No Post-Termination Support Obligation: Rishishwar Industry is not obligated to provide Larn2Pay support post-termination, protecting resources and ensuring focus on active agreements and platform reliability.</li>
          <li>Termination Notification Channels: Rishishwar Industry selects Larn2Pay's termination communication channels, ensuring secure, transparent notifications to protect platform operations and maintain institute trust during closure.</li>
          <li>Data Deletion Timeline Control: Rishishwar Industry determines Larn2Pay's data deletion timelines post-termination, ensuring compliance and protecting against unauthorized data retention or access by institutes or third parties.</li>
          <li>No Reinstatement Without Approval: Larn2Pay services cannot resume post-termination without Rishishwar Industry's approval, ensuring control and protecting platform integrity from unauthorized re-engagement attempts.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">12. Force Majeure</h2>
        <p className="mb-2">This section addresses disruptions to Larn2Pay due to uncontrollable events.</p>
        <ul className="list-disc pl-6">
          <li>Natural Disaster Exemptions: Larn2Pay operations may be suspended for natural disasters like earthquakes or floods, with Rishishwar Industry ensuring minimal disruptions and prioritizing platform recovery and reliability.</li>
          <li>Exemption for Civil Disruptions: Larn2Pay is not liable for delays due to riots, war, strikes, or lockdowns, with Rishishwar Industry managing suspensions to protect platform operations and stakeholder trust.</li>
          <li>Uncontrollable Event Protections: Neither party is liable for Larn2Pay delays due to force majeure, with Rishishwar Industry ensuring clear communication to maintain transparency and protect platform reliability.</li>
          <li>No Liability for Service Delays: Rishishwar Industry is not responsible for Larn2Pay delays during force majeure, ensuring protection from liability while prioritizing platform recovery and operational continuity.</li>
          <li>SLA Exemption During Force Majeure: Larn2Pay's SLAs do not apply during force majeure events, with Rishishwar Industry ensuring flexibility to protect platform operations and maintain stakeholder confidence.</li>
          <li>Prompt Force Majeure Notifications: Larn2Pay notifies institutes of force majeure impacts and timelines, with Rishishwar Industry controlling communications to ensure transparency and maintain trust in platform operations.</li>
          <li>Prioritized Service Restoration: Larn2Pay prioritizes service restoration post-force majeure, with Rishishwar Industry managing recovery to ensure rapid return to normal operations and maintain platform reliability.</li>
          <li>No Penalties During Force Majeure: Rishishwar Industry faces no penalties for Larn2Pay disruptions during force majeure, protecting against claims and ensuring focus on platform recovery and operational stability.</li>
          <li>Extended Force Majeure Flexibility: Larn2Pay's force majeure period may extend beyond 60 days, with Rishishwar Industry ensuring flexibility to protect platform operations and maintain institute trust during prolonged disruptions.</li>
          <li>No Compensation for Delays: Rishishwar Industry is not obligated to compensate for Larn2Pay delays during force majeure, protecting financial interests while ensuring focus on platform recovery and reliability.</li>
          <li>Secure Communication Channels: Rishishwar Industry determines Larn2Pay's force majeure notification channels, ensuring secure, transparent communication to protect platform operations and maintain institute trust during disruptions.</li>
          <li>System Protection Prioritization: Larn2Pay prioritizes system protection over service continuity during force majeure, with Rishishwar Industry ensuring robust measures to safeguard platform data and operational integrity.</li>
          <li>Institute Cooperation Requirement: The institute must cooperate with Larn2Pay during force majeure recovery, with Rishishwar Industry enforcing compliance to ensure efficient restoration and protect platform operations.</li>
          <li>Force Majeure Event Documentation: Larn2Pay documents force majeure events and actions, with Rishishwar Industry ensuring transparency to protect against disputes and maintain accountability in platform operations.</li>
          <li>No Data Loss Liability: Rishishwar Industry is not liable for Larn2Pay data loss during force majeure, provided backups exist, ensuring protection from claims and maintaining platform reliability through recovery.</li>
          <li>Termination for Prolonged Disruptions: Larn2Pay may terminate if force majeure exceeds 60 days, with Rishishwar Industry controlling the process to protect platform interests and ensure orderly closure.</li>
          <li>System Security During Disruptions: Larn2Pay ensures system security during force majeure, with Rishishwar Industry implementing measures to protect data and maintain platform reliability during recovery efforts.</li>
          <li>Restoration Plan Development: Larn2Pay develops restoration plans incorporating institute suggestions, with Rishishwar Industry controlling implementation to ensure alignment with platform goals and operational reliability.</li>
          <li>Backup-Based System Restart: Larn2Pay restarts from backups if systems are destroyed, with Rishishwar Industry ensuring secure recovery to protect data integrity and maintain platform reliability.</li>
          <li>Payment Suspension During Disruptions: Larn2Pay may suspend payments during force majeure, with Rishishwar Industry notifying institutes to ensure transparency and protect financial operations during disruptions.</li>
          <li>Institute Time Extension Requests: The institute may request additional compliance time during Larn2Pay disruptions, with Rishishwar Industry controlling approvals to ensure fairness and protect platform operations.</li>
          <li>Employee Safety Prioritization: Rishishwar Industry prioritizes employee safety during Larn2Pay force majeure events, ensuring compliance with regulations and protecting platform operations from unnecessary risks or disruptions.</li>
          <li>Government Directive Compliance: Larn2Pay complies with government directives during force majeure, with Rishishwar Industry ensuring adherence to protect platform operations and maintain legal and operational integrity.</li>
          <li>Automatic Termination for Permanent Disruptions: Larn2Pay may automatically terminate for permanent force majeure, with Rishishwar Industry controlling the process to protect platform interests and ensure orderly closure.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">13. Legal Safeguards</h2>
        <p className="mb-2">This section ensures Rishishwar Industry's legal protection for Larn2Pay operations.</p>
        <ul className="list-disc pl-6">
          <li>Institute Indemnity for Negligence: The institute indemnifies Rishishwar Industry against claims arising from institute negligence in Larn2Pay usage, protecting against legal risks and ensuring accountability for client actions.</li>
          <li>No Liability for External Lawsuits: Rishishwar Industry is not liable for third-party lawsuits against the institute related to Larn2Pay, ensuring protection from external legal risks and maintaining platform focus.</li>
          <li>Proprietary UI Protection Rights: Larn2Pay's user interface is proprietary, with Rishishwar Industry preventing institute replication to protect intellectual property and maintain platform uniqueness and operational integrity.</li>
          <li>Institute Legal Compliance Requirement: The institute must comply with applicable laws in Larn2Pay usage, absolving Rishishwar Industry of liability for client non-compliance and protecting against legal risks.</li>
          <li>No Claims for Update Disruptions: The institute cannot claim compensation for disruptions caused by Larn2Pay updates, with Rishishwar Industry ensuring protection from liability while maintaining platform improvement rights.</li>
          <li>Legal Fee Reimbursement Policy: The institute reimburses Rishishwar Industry for legal fees due to client disputes in Larn2Pay, ensuring financial protection and accountability for institute actions or errors.</li>
          <li>Binding Arbitration for Disputes: Larn2Pay disputes are resolved via arbitration in Gwalior, Madhya Pradesh, with Rishishwar Industry ensuring compliance to protect against prolonged legal conflicts and maintain platform trust.</li>
          <li>Finality of Dispute Reports: Larn2Pay's reports are final in legal disputes, with Rishishwar Industry ensuring accuracy and transparency to resolve conflicts and protect platform integrity and stakeholder trust.</li>
          <li>Legal Compliance Monitoring System: Larn2Pay monitors institute compliance with legal requirements, with Rishishwar Industry overseeing processes to ensure adherence and protect against regulatory risks or disputes.</li>
          <li>No Liability for Third-Party Actions: Rishishwar Industry is not liable for third-party actions affecting Larn2Pay, ensuring protection from external risks and maintaining focus on platform reliability and operations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">14. Platform Enhancements and Innovation</h2>
        <p className="mb-2">This section covers Larn2Pay's improvement and innovation rights, ensuring continuous advancement.</p>
        <ul className="list-disc pl-6">
          <li>Proprietary Feature Development Rights: Rishishwar Industry retains exclusive rights to develop and deploy new Larn2Pay features, ensuring innovation and protecting platform competitiveness without requiring institute approval.</li>
          <li>Controlled Beta Feature Testing: Larn2Pay may test beta features with select institutes, with Rishishwar Industry controlling deployment to ensure stability and protect platform performance during innovation phases.</li>
          <li>AI Integration for Functionality: Rishishwar Industry may integrate AI tools into Larn2Pay to enhance functionality, at no cost to institutes, ensuring cutting-edge performance and maintaining platform reliability.</li>
          <li>No Institute Ownership of Enhancements: Larn2Pay enhancements remain Rishishwar Industry's property, protecting intellectual property and ensuring institutes cannot claim ownership or replicate platform features or technology.</li>
          <li>Discretionary Feedback Utilization: Larn2Pay collects institute feedback for improvements, with Rishishwar Industry determining implementation to ensure alignment with platform goals and maintaining operational reliability and efficiency.</li>
          <li>Secure Innovation Testing Environment: Larn2Pay provides a testing environment for feature trials, with Rishishwar Industry controlling access to ensure security and protect live data from experimental disruptions.</li>
          <li>No Liability for Experimental Features: Rishishwar Industry is not liable for issues from Larn2Pay's experimental features, protecting against claims while ensuring freedom to innovate and enhance platform capabilities.</li>
          <li>Controlled Feature Rollout Schedules: Rishishwar Industry controls Larn2Pay's feature rollout schedules, ensuring orderly deployment, protecting platform stability, and maintaining institute trust through seamless integration of enhancements.</li>
          <li>Innovation-Driven Platform Upgrades: Larn2Pay undergoes regular upgrades to maintain industry leadership, with Rishishwar Industry ensuring enhancements protect platform reliability and deliver value without institute costs.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">15. Client Obligations</h2>
        <p className="mb-2">This section outlines the institute's responsibilities to support Larn2Pay operations.</p>
        <ul className="list-disc pl-6">
          <li>Timely Data Update Requirement: The institute must provide timely student and fee data updates to Larn2Pay, with Rishishwar Industry ensuring compliance to maintain platform accuracy and operational efficiency.</li>
          <li>Adherence to Communication Protocols: The institute must follow Larn2Pay's communication protocols, with Rishishwar Industry enforcing compliance to ensure consistency, transparency, and protection of platform operations and reputation.</li>
          <li>Exclusive Platform Usage: The institute must use Larn2Pay exclusively for fee collection, with Rishishwar Industry enforcing restrictions to protect data consistency and maintain platform security and reliability.</li>
          <li>Mandatory Staff Training Compliance: The institute must ensure staff complete Larn2Pay training, with Rishishwar Industry controlling programs to ensure proficiency and protect platform operations from user errors.</li>
          <li>Support for Dispute Resolution: The institute must assist in resolving parental disputes in Larn2Pay, with Rishishwar Industry overseeing processes to ensure fairness and protect platform integrity and reputation.</li>
          <li>Prohibition of Public Criticism: The institute must refrain from publicly criticizing Larn2Pay, with Rishishwar Industry enforcing restrictions to protect platform reputation and maintain stakeholder trust and confidence.</li>
          <li>Data Accuracy Guarantee Obligation: The institute guarantees data accuracy in Larn2Pay, absolving Rishishwar Industry of liability for errors and ensuring accountability for maintaining platform reliability and trust.</li>
          <li>Mandatory Platform Promotion: The institute must promote Larn2Pay to parents and students, with Rishishwar Industry ensuring compliance to enhance adoption and maintain platform visibility and operational success.</li>
          <li>Compliance with Usage Guidelines: The institute must adhere to Larn2Pay's usage guidelines, with Rishishwar Industry enforcing compliance to protect platform functionality and prevent misuse or operational disruptions.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">16. Financial Safeguards</h2>
        <p className="mb-2">This section ensures Rishishwar Industry's financial stability for Larn2Pay operations.</p>
        <ul className="list-disc pl-6">
          <li>Revenue Retention for Operations: Rishishwar Industry may retain Larn2Pay fees as a reserve for operational costs, ensuring financial stability and protecting platform reliability without institute approval or liability.</li>
          <li>No Liability for Currency Fluctuations: Rishishwar Industry is not liable for losses from currency fluctuations in Larn2Pay transactions, protecting against financial risks and ensuring focus on platform reliability and operations.</li>
          <li>Prioritization of High-Value Transactions: Larn2Pay prioritizes high-value transactions for revenue optimization, with Rishishwar Industry managing prioritization to ensure financial stability and protect platform operational efficiency.</li>
          <li>Mandatory Audit Cooperation: The institute must cooperate with Larn2Pay financial audits, with Rishishwar Industry controlling processes to ensure compliance, protect data integrity, and maintain platform transparency.</li>
          <li>Non-Refundable Overpayment Policy: Larn2Pay does not refund overpayments due to institute errors, with Rishishwar Industry ensuring financial protection and accountability for accurate data submission and platform usage.</li>
          <li>Flexible Transaction Fee Adjustments: Larn2Pay may adjust fees based on transaction volume, with Rishishwar Industry notifying institutes to ensure transparency, scalability, and protection of financial interests.</li>
          <li>Institute Liability for Fraud: The institute is liable for fraudulent payments via Larn2Pay due to its data, with Rishishwar Industry protected from financial risks and ensuring platform integrity and trust.</li>
          <li>Financial Reporting Control Rights: Rishishwar Industry controls Larn2Pay's financial report formats and delivery, ensuring accuracy, security, and alignment with platform goals to support institute planning and trust.</li>
          <li>Secure Financial Data Storage: Larn2Pay stores financial data securely, with Rishishwar Industry ensuring restricted access to protect against unauthorized use and maintain platform reliability and compliance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">17. Intellectual Property Protection</h2>
        <p className="mb-2">This section protects Rishishwar Industry's intellectual property rights for Larn2Pay.</p>
        <ul className="list-disc pl-6">
          <li>Exclusive IP Ownership Rights: All Larn2Pay software, designs, and algorithms are exclusively owned by Rishishwar Industry, protecting against unauthorized use and maintaining platform uniqueness and integrity.</li>
          <li>Prohibition of Platform Replication: The institute cannot replicate or reverse-engineer Larn2Pay, with Rishishwar Industry enforcing restrictions to protect intellectual property and maintain platform competitiveness and reliability.</li>
          <li>Branding Control Authority: Rishishwar Industry controls Larn2Pay's branding, even when customized, ensuring consistency and protecting platform identity from misuse or unauthorized modifications by institutes or third parties.</li>
          <li>No Source Code Access Rights: The institute has no access to Larn2Pay's source code, with Rishishwar Industry ensuring protection of proprietary technology and maintaining platform security and operational integrity.</li>
          <li>Institute Liability for IP Infringement: The institute is liable for any IP infringements caused in Larn2Pay, with Rishishwar Industry protected from legal risks and ensuring accountability for client actions.</li>
          <li>Proprietary Reporting Algorithm Protection: Larn2Pay's reporting algorithms are proprietary, with Rishishwar Industry ensuring protection against replication to maintain platform uniqueness and operational reliability for institutes.</li>
          <li>Third-Party IP Integration Approval: Third-party IP integration into Larn2Pay requires Rishishwar Industry's approval, ensuring control and protecting platform integrity from unauthorized or incompatible technologies.</li>
          <li>Post-Termination IP Protection: Larn2Pay's IP protections persist after termination, with Rishishwar Industry enforcing restrictions to prevent unauthorized use and maintain platform competitiveness and operational integrity.</li>
          <li>Secure IP Development Processes: Rishishwar Industry ensures Larn2Pay's development processes are secure, protecting intellectual property.</li>
             </ul>
      </section>
      </div>
  ),
  hi:(
     <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        <span className="font-bold">
          <span className="text-[#FF7F1A]">लर्न</span>
          <span className="text-gray-900 dark:text-white">2पे सॉफ्टवेयर प्लेटफॉर्म के लिए नियम और शर्तें
          </span>
        </span>
      </h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. समझौते का उद्देश्य</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay प्लेटफॉर्म के माध्यम से शुल्क संग्रहण की कुशल, सुरक्षित और पारदर्शी प्रक्रिया को सुनिश्चित करने के उद्देश्यों को रेखांकित करता है।</p>
        <ul className="list-disc pr-6">
          <li>शुल्क संग्रहण का डिजिटलीकरण: Larn2Pay, Rishishwar Industry Private Limited द्वारा विकसित, मैनुअल प्रक्रियाओं को सुरक्षित, स्वचालित और स्केलेबल डिजिटल सिस्टम से बदलता है, जो सभी हितधारकों के लिए दक्षता, सटीकता और सुगमता सुनिश्चित करता है।</li>
          <li>संचालन की विश्वसनीयता की प्रतिबद्धता: Larn2Pay न्यूनतम डाउनटाइम के साथ निरंतर प्रदर्शन की गारंटी देता है, उन्नत तकनीक का उपयोग करके प्रशासनिक बोझ को कम करता है और Rishishwar Industry की विश्वसनीयता को बढ़ाता है।</li>
          <li>वित्तीय लेनदेन में पारदर्शिता: Larn2Pay सभी लेनदेन को सटीकता के साथ रिकॉर्ड करता है, वास्तविक समय में सत्यापनीय डेटा प्रदान करता है, जो संस्थानों, अभिभावकों और छात्रों में विश्वास को बढ़ाता है।</li>
          <li>सुलभ ऑनलाइन भुगतान पोर्टल: Larn2Pay एक उपयोगकर्ता-अनुकूल पोर्टल प्रदान करता है, जो UPI, क्रेडिट/डेबिट कार्ड, नेट बैंकिंग, E-Nach और E-Mandate जैसे सुरक्षित भुगतान विकल्पों का समर्थन करता है।</li>
          <li>वास्तविक समय में वित्तीय जानकारी: Larn2Pay वास्तविक समय में शुल्क संग्रह, भुगतान स्थिति और वित्तीय जानकारी के लिए उपकरण प्रदान करता है, जो Rishishwar Industry द्वारा सुरक्षित रूप से प्रबंधित किया जाता है।</li>
          <li>स्वचालित शुल्क अनुसूची प्रबंधन: Larn2Pay मासिक, त्रैमासिक और वार्षिक शुल्क अनुसूचियों को ट्रैक करता है, समय पर रिमाइंडर भेजता है, जिससे मैनुअल प्रयास कम होता है और Rishishwar Industry控制 करता है।</li>
          <li>भुगतान असंगतियों का पता लगाना: Larn2Pay के उन्नत एल्गोरिदम तुरंत अपूर्ण भुगतानों का पता लगाते हैं, जिससे संस्थानों को त्वरित कार्रवाई करने में मदद मिलती है, और Rishishwar Industry सिस्टम की सटीकता सुनिश्चित करता है।</li>
          <li>स्वचालित अधिसूचना प्रणाली: Larn2Pay अभिभावकों को आगामी या विलंबित भुगतानों के लिए SMS और ईमेल रिमाइंडर भेजता है, जिससे प्रशासनिक कार्यभार कम होता है और Rishishwar Industry टेम्पलेट्स को नियंत्रित करता है।</li>
          <li>विस्तृत लेनदेन रिकॉर्ड: Larn2Pay छात्र-विशिष्ट लेनदेन इतिहास को बनाए रखता है, जिससे संस्थान भुगतान, रिफंड और बकाया को ट्रैक कर सकते हैं, और Rishishwar Industry डेटा की सुरक्षा सुनिश्चित करता है।</li>
          <li>सुरक्षित भुगतान गेटवे एकीकरण: Larn2Pay प्रमुख भुगतान गेटवेज के साथ एकीकृत है, जो सुरक्षित और लचीले लेनदेन की सुविधा देता है, और Rishishwar Industry गेटवे चयन और एकीकरण को नियंत्रित करता है।</li>
          <li>स्केलेबल प्लेटफॉर्म संरचना: Larn2Pay बिना अतिरिक्त लागत के बढ़ते छात्र आधार को समायोजित करता है, जिससे लागत-दक्षता सुनिश्चित होती है और Rishishwar Industry प्रबंधन को नियंत्रित करता है।</li>
          <li>कस्टम सुविधा विकास का अधिकार: Rishishwar Industry अपने विवेक से Larn2Pay के लिए कस्टम सुविधाएँ विकसित और तैनात कर सकता है, जिससे कार्यक्षमता बढ़ती है और प्लेटफॉर्म की श्रेष्ठता सुनिश्चित होती है।</li>
          <li>प्रोएक्टिव सिस्टम अपग्रेड: Rishishwar Industry Larn2Pay को उन्नत तकनीकों के साथ अपग्रेड करता है, जिससे प्लेटफॉर्म अग्रणी बना रहता है, और संस्थानों को कोई अतिरिक्त लागत नहीं उठानी पड़ती।</li>
          <li>विशिष्ट प्रौद्योगिकी स्वामित्व: Larn2Pay की सभी प्रौद्योगिकी, एल्गोरिदम और सॉफ्टवेयर Rishishwar Industry की एकमात्र संपत्ति है, जो संस्थानों या तृतीय पक्षों द्वारा दुरुपयोग को रोकता है।</li>
          <li>प्लेटफॉर्म प्रदर्शन की गारंटी: Rishishwar Industry Larn2Pay के इष्टतम प्रदर्शन की गारंटी देता है, समस्याओं का त्वरित समाधान करता है, जिससे निर्बाध सेवा और हितधारकों का विश्वास सुनिश्चित होता है।</li>
          <li>हितधारक प्रशिक्षण सहायता: Rishishwar Industry संस्थान के कर्मचारियों के लिए Larn2Pay के उपयोग पर मुफ्त प्रशिक्षण प्रदान करता है, जिससे त्रुटियाँ कम होती हैं और प्लेटफॉर्म की दक्षता बढ़ती है।</li>
          <li>शुल्क संग्रहण प्रक्रिया का अनुकूलन: Larn2Pay शुल्क संग्रहण को सरल बनाता है, प्रशासनिक कार्यभार को कम करता है, और Rishishwar Industry कार्यप्रवाह पर नियंत्रण रखता है, जिससे प्लेटफॉर्म की विश्वसनीयता बनी रहती है।</li>
          <li>भविष्य की प्रौद्योगिकी का एकीकरण: Rishishwar Industry Larn2Pay में AI या ब्लॉकचेन जैसी प्रौद्योगिकियों को एकीकृत कर सकता है, जिससे कार्यक्षमता बढ़ती है और संस्थानों को कोई लागत नहीं उठानी पड़ती।</li>
          <li>गैर-जबरन शुल्क संग्रहण: Larn2Pay शुल्क संग्रहण के लिए प्रौद्योगिकी सुविधा प्रदान करता है, बिना जबरन प्रथाओं के, क्योंकि संस्थान संग्रहण शुरू करने और प्राधिकरण देने के लिए जिम्मेदार हैं।</li>
          <li>स्वैच्छिक भुगतान ढांचा: Larn2Pay के माध्यम से सभी भुगतान स्वैच्छिक हैं, जो संस्थान और हितधारकों द्वारा शुरू किए जाते हैं, जिससे Rishishwar Industry पर कोई दबाव नहीं पड़ता और पारदर्शिता बनी रहती है।</li>
          <li>प्रौद्योगिकी प्रदाता की भूमिका: Rishishwar Industry केवल Larn2Pay के लिए प्रौद्योगिकी प्रदाता के रूप में कार्य करता है, प्रवर्तन में शामिल नहीं होता, जिससे भूमिकाओं की स्पष्टता और दायित्व से सुरक्षा सुनिश्चित होती है।</li>
          <li>शुल्क विवाद समाधान प्रक्रिया: Larn2Pay में शुल्क-संबंधी विवादों के लिए एक संरचित प्रक्रिया है, जो स्पष्ट संचार और दस्तावेजीकरण प्रदान करती है, और Rishishwar Industry निष्पक्षता सुनिश्चित करता है।</li>
          <li>विवादों के लिए कानूनी सहायता: Rishishwar Industry Larn2Pay के माध्यम से शुल्क विवादों के लिए कानूनी सहायता प्रदान करता है, जिससे नियामक अनुपालन और संस्थान के हितों की रक्षा होती है।</li>
          <li>हितधारक विश्वास का आश्वासन: Larn2Pay की सुरक्षित, विश्वसनीय और पारदर्शी प्रक्रियाएँ संस्थानों, अभिभावकों और छात्रों में विश्वास को बढ़ाती हैं, और Rishishwar Industry डेटा की अखंडता सुनिश्चित करता है।</li>
          <li>उपयोगकर्ता अनुभव अनुकूलन: Larn2Pay नियमित रूप से उपयोगकर्ता इंटरफेस को अपडेट करता है ताकि नेविगेशन सरल और सहज हो, और Rishishwar Industry उपयोगकर्ता प्रतिक्रिया के आधार पर सुधार लागू करता है।</li>
          <li>नियामक अनुपालन सुनिश्चित करना: Larn2Pay भारत के वित्तीय और डेटा संरक्षण नियमों का पालन करता है, और Rishishwar Industry अनुपालन की निगरानी करता है, जिससे कानूनी जोखिम कम होते हैं।</li>
          <li>कम लागत वाला समाधान: Larn2Pay लागत-प्रभावी शुल्क संग्रह समाधान प्रदान करता है, जिससे छोटे और मध्यम आकार के संस्थानों को डिजिटल भुगतान प्रणाली अपनाने में मदद मिलती है।</li>
          <li>हितधारक संचार सुधार: Larn2Pay अभिभावकों और संस्थानों के बीच संचार को बेहतर बनाता है, और Rishishwar Industry संदेश टेम्पलेट्स को अनुकूलित करता है ताकि स्पष्टता और व्यावसायिकता सुनिश्चित हो।</li>
          <li>पर्यावरण-अनुकूल दृष्टिकोण: Larn2Pay पेपरलेस शुल्क संग्रह को बढ़ावा देता है, जिससे पर्यावरणीय प्रभाव कम होता है, और Rishishwar Industry डिजिटल रिकॉर्ड प्रबंधन को लागू करता है।</li>
          <li>अनुकूलन योग्य शुल्क छूट नीतियाँ: Larn2Pay संस्थानों को विशिष्ट मामलों में शुल्क छूट प्रदान करने की अनुमति देता है, और Rishishwar Industry अनुमोदन प्रक्रिया को नियंत्रित करता है।</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. सेवाओं का दायरा</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay की सेवाओं को परिभाषित करता है, जिसमें इसकी कार्यक्षमताएँ, पहुँच और संचालन सहायता शामिल है, जो संस्थान की दक्षता को बढ़ाने के लिए हैं।</p>
        <ul className="list-disc pr-6">
          <li>सुरक्षित क्लाउड-आधारित प्लेटफॉर्म: Larn2Pay एक सुरक्षित, क्लाउड-आधारित प्लेटफॉर्म प्रदान करता है, जो शुल्क संग्रह, डेटा प्रबंधन और रिपोर्टिंग के लिए 24/7 सुलभ है, और Rishishwar Industry विश्वसनीयता सुनिश्चित करता है।</li>
          <li>विस्तृत छात्र डेटा प्रबंधन: Larn2Pay छात्र विवरण, शुल्क संरचनाएँ और भुगतान इतिहास को सुरक्षित रूप से प्रबंधित करता है, और Rishishwar Industry डेटा की गोपनीयता और अखंडता को सुनिश्चित करता है।</li>
          <li>उपयोगकर्ता-अनुकूल पोर्टल और ऐप: Larn2Pay एक समर्पित पोर्टल और मोबाइल ऐप प्रदान करता है, जो सभी डिवाइसों पर सुरक्षित भुगतान की सुविधा देता है, और Rishishwar Industry उपयोगिता सुनिश्चित करता है।</li>
          <li>स्वचालित शुल्क चालान निर्माण: Larn2Pay पूर्वनिर्धारित अनुसूचियों के आधार पर स्वचालित रूप से शुल्क चालान बनाता है, जिससे मैनुअल त्रुटियाँ कम होती हैं, और Rishishwar Industry सटीकता सुनिश्चित करता है।</li>
          <li>मल्टी-चैनल भुगतान रिमाइंडर: Larn2Pay अभिभावकों को SMS, WhatsApp और ईमेल रिमाइंडर भेजता है, जिससे अनुपालन बढ़ता है, और Rishishwar Industry अधिसूचनाओं को नियंत्रित करता है।</li>
          <li>भूमिका-आधारित कर्मचारी पहुँच: Larn2Pay शिक्षकों और कर्मचारियों को भूमिका-आधारित Stuart, and Rishishwar Industry अनधिकृत उपयोग को रोकता है।</li>
          <li>वास्तविक समय में लेनदेन रिपोर्टिंग: Larn2Pay दैनिक लेनदेन रिपोर्ट प्रदान करता है, जो संग्रह और असंगतियों की जानकारी देता है, और Rishishwar Industry डेटा की सटीकता सुनिश्चित करता है।</li>
          <li>संस्थान-विशिष्ट ब्रांडिंग: Larn2Pay संस्थान-विशिष्ट ब्रांडिंग का समर्थन करता है, जैसे लोगो और रंग, और Rishishwar Industry प्लेटफॉर्म की एकरूपता और व्यावसायिकता सुनिश्चित करता है।</li>
          <li>सुरक्षित भुगतान गेटवे एकीकरण: Larn2Pay विश्वसनीय गेटवेज के साथ एकीकृत है, जो सुरक्षित भुगतान सुनिश्चित करता है, और Rishishwar Industry विफलताओं से बचाव के लिए प्रबंधन करता है।</li>
          <li>स्वचालित डिफॉल्टर ट्रैकिंग: Larn2Pay विलंबित भुगतानों को चिह्नित करता है, जिससे व्यवस्थित अनुवर्तन संभव होता है, और Rishishwar Industry सटीकता और प्लेटफॉर्म की अखंडता सुनिश्चित करता है।</li>
          <li>लचीला शुल्क योजना प्रबंधन: Larn2Pay वार्षिक शुल्क योजनाओं के प्रबंधन का समर्थन करता है, और Rishishwar Industry कॉन्फिगरेशन को नियंत्रित करता है, जिससे सिस्टम की विश्वसनीयता बनी रहती है।</li>
          <li>पाठ्यक्रम-विशिष्ट शुल्क अनुकूलन: Larn2Pay विभिन्न पाठ्यक्रमों के लिए शुल्क संरचनाओं को अनुकूलित करने की अनुमति देता है, और Rishishwar Industry परिवर्तनों को मंजूरी देता है, जिससे स्थिरता सुनिश्चित होती है।</li>
          <li>वास्तविक समय डैशबोर्ड निगरानी: Larn2Pay का डैशबोर्ड भुगतान स्थिति और सिस्टम प्रदर्शन पर वास्तविक समय अपडेट प्रदान करता है, और Rishishwar Industry डेटा सटीकता सुनिश्चित करता है।</li>
          <li>स्वचालित रसीद निर्माण: Larn2Pay सभी लेनदेन के लिए सत्यापनीय चालान और रसीद बनाता है, और Rishishwar Industry प्रारूपों को नियंत्रित करता है, जिससे विश्वसनीयता बनी रहती है।</li>
          <li>ऑनलाइन और ऑफलाइन भुगतान ट्रैकिंग: Larn2Pay ऑनलाइन और ऑफलाइन भुगतानों को ट्रैक करता है, और Rishishwar Industry डेटा अखंडता सुनिश्चित करता है, जिससे अनधिकृत परिवर्तन रोक जाते हैं।</li>
          <li>निर्यात योग्य वित्तीय रिपोर्ट: Larn2Pay Excel या PDF में डाउनलोड योग्य रिपोर्ट प्रदान करता है, और Rishishwar Industry रिपोर्ट निर्माण को नियंत्रित करता है, जिससे सटीकता और सुरक्षा सुनिश्चित होती है।</li>
          <li>सुरक्षित मल्टी-यूजर पहुँच: Larn2Pay भूमिका-आधारित पहुँच प्रदान करता है, जिसमें गतिविधि लॉगिंग होती है, और Rishishwar Industry अनधिकृत पहुँच को रोकता है, जिससे प्लेटफॉर्म की सुरक्षा बनी रहती है।</li>
          <li>छात्र लॉगिन प्रोफाइल: Larn2Pay छात्रों को शुल्क विवरण और भुगतान इतिहास देखने के लिए सुरक्षित प्रोफाइल प्रदान करता है, और Rishishwar Industry डेटा गोपनीयता सुनिश्चित करता है।</li>
          <li>मोबाइल-अनुकूलित इंटरफेस: Larn2Pay मोबाइल उपकरणों के लिए अनुकूलित है, जिससे सुलभता सुनिश्चित होती है, और Rishishwar Industry इंटरफेस की स्थिरता और प्रदर्शन को बनाए रखता है।</li>
          <li>विशिष्ट सेवा प्रदाता भूमिका: Larn2Pay समझौते के दौरान एकमात्र शुल्क संग्रह प्लेटफॉर्म है, और Rishishwar Industry डेटा एकरूपता और प्लेटफॉर्म की सुरक्षा को सुनिश्चित करता है।</li>
          <li>अनुकूलन योग्य अधिसूचना टेम्पलेट्स: Larn2Pay हितधारक सहभागिता के लिए अनुकूलन योग्य टेम्पलेट्स प्रदान करता है, और Rishishwar Industry डिज़ाइन और तैनाती को नियंत्रित करता है, जिससे व्यावसायिकता सुनिश्चित होती है।</li>
          <li>बहु-भाषा इंटरफेस समर्थन: Larn2Pay व्यापक सुलभता के लिए बहु-भाषा समर्थन प्रदान करता है, और Rishishwar Industry भाषा विकल्पों को नियंत्रित करता है, जिससे प्लेटफॉर्म का प्रदर्शन बना रहता है।</li>
          <li>स्वचालित नीति अनुपालन जाँच: Larn2Pay संस्थान की शुल्क नीतियों का अनुपालन सुनिश्चित करता है, और Rishishwar Industry प्रक्रिया को नियंत्रित करता है, जिससे त्रुटियाँ और दायित्व कम होते हैं।</li>
          <li>गतिशील शुल्क समायोजन उपकरण: Larn2Pay शुल्क संरचनाओं को समायोजित करने के लिए उपकरण प्रदान करता है, और Rishishwar Industry परिवर्तनों को लॉग और मंजूरी देता है, जिससे स्थिरता सुनिश्चित होती है।</li>
          <li>अभिभावक प्रतिक्रिया संग्रह: Larn2Pay सेवाओं को बेहतर बनाने के लिए अभिभावक प्रतिक्रिया एकत्र करता है, और Rishishwar Industry प्रक्रिया को प्रबंधित करता है, जिससे प्लेटफॉर्म के उद्देश्य पर फोकस होता है।</li>
          <li>कुशल बैच लेनदेन प्रसंस्करण: Larn2Pay बड़े लेनदेन के लिए बैच प्रसंस्करण का समर्थन करता है, और Rishishwar Industry प्रोटोकॉल को नियंत्रित करता है, जिससे सिस्टम प्रदर्शन बना रहता है।</li>
          <li>वास्तविक समय में भुगतान सत्यापन: Larn2Pay भुगतानों को वास्तविक समय में सत्यापित करता है, जिससे अमान्य लेनदेन से बचाव होता है, और Rishishwar Industry विवादों को कम करता है।</li>
          <li>समर्पित ग्राहक सहायता: Larn2Pay सुबह 10 बजे से शाम 6 बजे तक सहायता प्रदान करता है, और Rishishwar Industry समय पर, पेशेवर समाधान सुनिश्चित करता है, जिससे विश्वास बना रहता है।</li>
          <li>अभिभावक भुगतान लचीलापन: Larn2Pay मासिक, त्रैमासिक भुगतान आवृत्तियों का समर्थन करता है, और Rishishwar Industry कॉन्फिगरेशन को नियंत्रित करता है, जिससे प्लेटफॉर्म की विश्वसनीयता सुनिश्चित होती है।</li>
          <li>सुरक्षित लेनदेन संग्रहण: Larn2Pay लेनदेन डेटा को सुरक्षित रूप से संग्रहीत करता है, और Rishishwar Industry प्रतिबंधित पहुँच सुनिश्चित करता है, जिससे डेटा अखंडता और नियामक अनुपालन बना रहता है।</li>
          <li>अनुकूलन योग्य विश्लेषण डैशबोर्ड: Larn2Pay भुगतान रुझानों के लिए अनुकूलन योग्य डैशबोर्ड प्रदान करता है, और Rishishwar Industry पहुँच और सुविधाओं को नियंत्रित करता है, जिससे डेटा सुरक्षा सुनिश्चित होती है।</li>
          <li>ऑफलाइन भुगतान एकीकरण: Larn2Pay ऑफलाइन भुगतानों को डिजिटल रिकॉर्ड के साथ एकीकृत करता है, और Rishishwar Industry डेटा सटीकता को सुनिश्चित करता है, जिससे व्यापक शुल्क ट्रैकिंग संभव होती है।</li>
          <li>छात्रवृत्ति प्रबंधन उपकरण: Larn2Pay छात्रवृत्ति और छूट योजनाओं को प्रबंधित करने के लिए उपकरण प्रदान करता है, और Rishishwar Industry प्रक्रिया को नियंत्रित करता है, जिससे नीति अनुपालन सुनिश्चित होता है।</li>
          <li>स्मार्ट रिमाइंडर समयबद्धता: Larn2Pay भुगतान देय तारीखों से पहले स्मार्ट रिमाइंडर भेजता है, और Rishishwar Industry समय और सामग्री को अनुकूलित करता है, जिससे उपयोगकर्ता अनुभव बेहतर होता है।</li>
          <li>कैशलेस लेनदेन प्रोत्साहन: Larn2Pay डिजिटल भुगतानों को प्रोत्साहित करता है, जिससे नकद प्रबंधन की जटिलताएँ कम होती हैं, और Rishishwar Industry प्रक्रिया को सुव्यवस्थित करता है।</li>
          <li>मल्टी-लोकेशन समर्थन: Larn2Pay कई परिसरों वाले संस्थानों के लिए एकीकृत शुल्क प्रबंधन प्रदान करता है, और Rishishwar Industry डेटा एकरूपता सुनिश्चित करता है।</li>
          <li>अभिभावक पोर्टल सुलभता: Larn2Pay अभिभावकों के लिए एक समर्पित पोर्टल प्रदान करता है, जिससे वे भुगतान स्थिति और रसीदें देख सकते हैं, और Rishishwar Industry गोपनीयता सुनिश्चित करता है।</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. शुल्क संरचना</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay के लिए वित्तीय ढांचे को रेखांकित करता है, जो पारदर्शिता सुनिश्चित करता है और Rishishwar Industry के वित्तीय हितों की रक्षा करता है।</p>
        <ul className="list-disc pr-6">
          <li>न्यूनतम लेनदेन शुल्क संरचना: Larn2Pay प्रत्येक सफल लेनदेन पर न्यूनतम 5% शुल्क लेता है, जो प्लेटफॉर्म के रखरखाव और संचालन को समर्थन देता है, और Rishishwar Industry वित्तीय स्थिरता सुनिश्चित करता है।</li>
          <li>अधिकतम लेनदेन शुल्क सीमा: Larn2Pay लेनदेन शुल्क को ₹225 पर सीमित करता है, जिससे अभिभावकों के लिए वहनीयता और Rishishwar Industry की प्लेटफॉर्म विश्वसनीयता सुनिश्चित होती है।</li>
          <li>तकनीकी सेवा शुल्क लागू करना: Larn2Pay प्रत्येक लेनदेन पर ₹75 शुल्क लागू करता है, जो रखरखाव और समर्थन के लिए है, और Rishishwar Industry कार्यान्वयन को नियंत्रित करता है।</li>
          <li>स्वचालित शुल्क कटौती प्रक्रिया: Larn2Pay भुगतानों से शुल्क स्वचालित रूप से काटता है, और Rishishwar Industry सुरक्षित, पारदर्शी कटौतियों को सुनिश्चित करता है, जिससे वित्तीय अखंडता बनी रहती है।</li>
          <li>गतिशील शुल्क समायोजन नीति: Rishishwar Industry बाजार स्थितियों के आधार पर Larn2Pay शुल्क को 15 दिन की सूचना के साथ समायोजित कर सकता है, जिससे वित्तीय स्थिरता सुनिश्चित होती है।</li>
          <li>विवादों के दौरान शुल्क प्रतिधारण: Larn2Pay विवादों के दौरान शुल्क प्रतिधारित कर सकता है, और Rishishwar Industry वित्तीय हितों की रक्षा करता है, जिससे संचालन निरंतरता बनी रहती है।</li>
          <li>कर त्रुटियों के लिए कोई दायित्व नहीं: Rishishwar Industry संस्थान के गलत डेटा के कारण होने वाली कर त्रुटियों के लिए उत्तरदायी नहीं है, जिससे Larn2Pay में वित्तीय जोखिमों से सुरक्षा मिलती है।</li>
          <li>विवेकाधीन शुल्क माफी: Rishishwar Industry Larn2Pay शुल्क को सद्भावना के रूप में माफ कर सकता है, जिससे वित्तीय नियंत्रण बना रहता है और हितधारकों के साथ सकारात्मक संबंध बनाए रखे जाते हैं।</li>
          <li>प्रीमियम सुविधाओं के लिए अधिशुल्क: Larn2Pay उन्नत विश्लेषण जैसी प्रीमियम सुविधाओं के लिए अधिशुल्क लागू कर सकता है, और Rishishwar Industry मूल्य निर्धारण को नियंत्रित करता है।</li>
          <li>गैर-वापसी योग्य सेवा शुल्क: Larn2Pay के सभी सेवा शुल्क गैर-वापसी योग्य हैं, जिससे Rishishwar Industry की वित्तीय स्थिरता सुनिश्चित होती है और राजस्व हानि से बचाव होता है।</li>
          <li>पारदर्शी शुल्क प्रदर्शन: Larn2Pay भुगतान से पहले अभिभावकों को शुल्क प्रदर्शित करता है, जिससे विवाद कम होते हैं, और Rishishwar Industry पारदर्शिता सुनिश्चित करता है।</li>
          <li>संस्थान की कटौती सहमति: संस्थान Larn2Pay की स्वचालित शुल्क कटौतियों से सहमत है, और Rishishwar Industry कटौतियों को लागू करने का अधिकार रखता है, जिससे संचालन सुचारू रहता है।</li>
          <li>लागू कर अनुपालन: Larn2Pay नियामक के अनुसार शुल्क में GST जैसे कर जोड़ता है, और Rishishwar Industry अनुपालन सुनिश्चित करता है, जिससे कानूनी जोखिमों से बचाव होता है।</li>
          <li>कोई सेटअप शुल्क नहीं: Larn2Pay में शामिल होने के लिए कोई शुल्क नहीं है, जिससे संस्थानों की लागत कम होती है, और Rishishwar Industry त्वरित तैनाती सुनिश्चित करता है।</li>
          <li>वापसी योग्य सुरक्षा जमा नीति: Larn2Pay ₹10,000 की वापसी योग्य जमा राशि मांग सकता है, जो बकाया चुकाने के बाद समाप्ति पर वापस की जाती है, और Rishishwar Industry शर्तों को नियंत्रित करता है।</li>
          <li>वार्षिक रखरखाव शुल्क संरचना: Larn2Pay ₹25,000 वार्षिक रखरखाव शुल्क ले सकता है, और Rishishwar Industry लागत पारदर्शिता और प्लेटफॉर्म की विश्वसनीयता सुनिश्चित करता है।</li>
          <li>सर्वर रखरखाव लागत शामिल: Larn2Pay में सर्वर रखरखाव लागत सेवा शुल्क में शामिल है, और Rishishwar Industry बुनियादी ढांचे को प्रबंधित करता है, जिससे निर्बाध प्रदर्शन सुनिश्चित होता है।</li>
          <li>कस्टम रिपोर्ट शुल्क नीति: Larn2Pay कस्टमाइज़्ड रिपोर्ट के लिए शुल्क ले सकता है, और Rishishwar Industry मूल्य निर्धारण को नियंत्रित करता है, जिससे वित्तीय स्थिरता सुनिश्चित होती है।</li>
          <li>भुगतान गेटवे शुल्क आवंटन: Larn2Pay में गेटवे शुल्क भुगतानकर्ता द्वारा वहन किए जाते हैं, और Rishishwar Industry तृतीय-पक्ष शुल्क विवादों से दायित्व मुक्त रहता है।</li>
          <li>अनधिकृत शुल्क का निषेध: संस्थान Larn2Pay के माध्यम से अनधिकृत शुल्क नहीं लगा सकता, और Rishishwar Industry अनुपालन लागू करता है, जिससे प्लेटफॉर्म की अखंडता बनी रहती है।</li>
          <li>कोई अग्रिम भुगतान आवश्यकता नहीं: Larn2Pay संस्थानों से अग्रिम भुगतान की मांग नहीं करता, और Rishishwar Industry लेनदेन-आधारित राजस्व मॉडल के माध्यम से संचालन सुनिश्चित करता है।</li>
          <li>अधिक भुगतान की गैर-वापसी: Larn2Pay संस्थान की त्रुटियों के कारण अधिक भुगतान की वापसी नहीं करता, और Rishishwar Industry वित्तीय हितों की रक्षा करता है।</li>
          <li>लेनदेन शुल्क लचीलापन: Larn2Pay लेनदेन मात्रा के आधार पर शुल्क समायोजित कर सकता है, और Rishishwar Industry पारदर्शिता और वित्तीय नियंत्रण सुनिश्चित करता है।</li>
          <li>शुल्क संरचना समीक्षा अधिकार: Rishishwar Industry Larn2Pay की शुल्क संरचना की समय-समय पर समीक्षा कर सकता है, जिससे संचालन लागत और बाजार गतिशीलता के साथ संरेखण सुनिश्चित होता है।</li>
          <li>वित्तीय ऑडिट सहायता: Larn2Pay ऑडिट के लिए वित्तीय डेटा प्रदान करता है, और Rishishwar Industry पहुँच को नियंत्रित करता है, जिससे डेटा सुरक्षा और अनुपालन सुनिश्चित होता है।</li>
          <li>शुल्क छूट के लिए अनुमोदन प्रक्रिया: Larn2Pay में शुल्क छूट के लिए Rishishwar Industry की पूर्व सहमति आवश्यक है, जिससे वित्तीय नीतियों के साथ संरेखण सुनिश्चित होता है।</li>
          <li>सदस्यता-आधारित प्रीमियम शुल्क: Larn2Pay प्रीमियम सुविधाओं के लिए वैकल्पिक सदस्यता शुल्क प्रदान करता है, और Rishishwar Industry मूल्य निर्धारण को नियंत्रित करता है।</li>
          <li>बैच शुल्क छूट नीति: Larn2Pay थोक भुगतानों पर छूट प्रदान कर सकता है, और Rishishwar Industry छूट की शर्तों को नियंत्रित करता है, जिससे वित्तीय स्थिरता बनी रहती है।</li>
          <li>शुल्क संरचना समय-सीमा: Larn2Pay संस्थानों को शुल्क भुगतान के लिए 30 दिन की समय-सीमा देता है, और Rishishwar Industry समय पर भुगतान लागू करता है।</li>
          <li>विलंबित शुल्क भुगतान शुल्क: Larn2Pay विलंबित शुल्क भुगतानों पर ₹200 का विलंब शुल्क लागू करता है, और Rishishwar Industry वित्तीय अनुशासन सुनिश्चित करता है।</li>
          <li>शुल्क अधिसूचना प्रक्रिया: Larn2Pay शुल्क परिवर्तनों की 30 दिन पहले अधिसूचना देता है, और Rishishwar Industry पारदर्शी संचार सुनिश्चित करता है।</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. भुगतान और निपटान</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay के लिए भुगतान और निपटान प्रक्रियाओं को रेखांकित करता है, जो दक्षता और Rishishwar Industry के वित्तीय हितों की रक्षा करता है।</p>
        <ul className="list-disc pr-6">
          <li>विस्तृत मासिक निपटान रिपोर्ट: Larn2Pay लेनदेन, संग्रह और असंगतियों की विस्तृत मासिक रिपोर्ट प्रदान करता है, और Rishishwar Industry सटीकता और पारदर्शिता सुनिश्चित करता है।</li>
          <li>T+7 निपटान समयरेखा: Larn2Pay T+7 कार्य दिवसों के भीतर शुल्क निपटान करता है, और Rishishwar Industry सुरक्षित, समय पर हस्तांतरण सुनिश्चित करता है, जिससे विश्वास बना रहता है।</li>
          <li>गेटवे विफलताओं के लिए कोई दायित्व नहीं: Rishishwar Industry Larn2Pay में भुगतान गेटवे विफलताओं के लिए उत्तरदायी नहीं है, जिससे तृतीय-पक्ष प्रणाली जोखिमों से सुरक्षा मिलती है।</li>
          <li>सुरक्षित NEFT/RTGS निपटान: Larn2Pay NEFT या RTGS के माध्यम से निपटान करता है, और Rishishwar Industry प्रक्रिया को प्रबंधित करता है, जिससे त्रुटियाँ रुकती हैं और विश्वसनीयता सुनिश्चित होती है।</li>
          <li>बकाया राशि की कटौती: Larn2Pay निपटान से पहले Rishishwar Industry को बकाया राशि काटता है, जिससे वित्तीय सुरक्षा और संचालन निरंतरता सुनिश्चित होती है, और संस्थानों को सूचित किया जाता है।</li>
          <li>संस्थान की डेटा सटीकता जिम्मेदारी: संस्थान Larn2Pay को सटीक निपटान डेटा प्रदान करने के लिए जिम्मेदार है, और Rishishwar Industry गलत जानकारी के कारण त्रुटियों से दायित्व मुक्त रहता है।</li>
          <li>लचीली निपटान अनुसूची समायोजन: Rishishwar Industry Larn2Pay की निपटान अनुसूचियों को पूर्व सूचना के साथ समायोजित कर सकता है, जिससे दक्षता और वित्तीय स्थिरता सुनिश्चित होती है।</li>
          <li>धोखाधड़ी सत्यापन के लिए भुगतान रोकना: Larn2Pay धोखाधड़ी सत्यापन के लिए भुगतान रोक सकता है, और Rishishwar Industry प्लेटफॉर्म की अखंडता और वित्तीय जोखिमों से बचाव सुनिश्चित करता है।</li>
          <li>स्वचालित निपटान ऑडिट सिस्टम: Larn2Pay निपटानों का स्वचालित ऑडिट करता है, और Rishishwar Industry सटीकता सुनिश्चित करता है, जिससे संस्थान की भागीदारी के बिना डेटा अखंडता बनी रहती है।</li>
          <li>उच्च-मात्रा ग्राहकों के लिए प्राथमिकता प्रसंस्करण: Larn2Pay उच्च-मात्रा संस्थानों के लिए भुगतान प्रसंस्करण को प्राथमिकता देता है, और Rishishwar Industry दक्षता और वित्तीय परिणामों को अनुकूलित करता है।</li>
          <li>रोक गए भुगतानों पर कोई ब्याज नहीं: Rishishwar Industry Larn2Pay में विवादों या सत्यापन के दौरान रोक गए भुगतानों पर ब्याज के लिए उत्तरदायी नहीं है, जिससे वित्तीय दावों से सुरक्षा मिलती है।</li>
          <li>निपटान पुष्टिकरण आवश्यकता: संस्थान को Larn2Pay निपटानों की प्राप्ति 48 घंटों के भीतर पुष्टि करनी होगी, और Rishishwar Industry अनुपालन लागू करता है, जिससे वित्तीय ट्रैकिंग सुनिश्चित होती है।</li>
          <li>बैंक देरी के लिए कोई दायित्व नहीं: Rishishwar Industry बैंकिंग प्रणाली देरी के लिए उत्तरदायी नहीं है, जिससे Larn2Pay की विश्वसनीयता बाहरी वित्तीय संस्थानों से प्रभावित नहीं होती।</li>
          <li>विलंबित लेनदेन का आगे बढ़ाना: Larn2Pay विलंबित लेनदेन को अगले चक्र में ले जाता है, और Rishishwar Industry निरंतरता और वित्तीय विवादों से बचाव सुनिश्चित करता है।</li>
          <li>मान्य रसीद नीति: केवल Larn2Pay द्वारा निर्मित रसीद मान्य है, और Rishishwar Industry उनकी प्रामाणिकता सुनिश्चित करता है, जिससे धोखाधड़ी रोकी जाती है और प्लेटफॉर्म में विश्वास बना रहता है।</li>
          <li>केवल डिजिटल रिपोर्ट वैधता: Larn2Pay की वित्तीय रिपोर्ट केवल डिजिटल प्रारूप में मान्य हैं, और Rishishwar Industry वितरण को नियंत्रित करता है, जिससे दक्षता और सुरक्षा सुनिश्चित होती है।</li>
          <li>डेटा संशोधन का निषेध: संस्थान Larn2Pay के लेनदेन डेटा को संपादित नहीं कर सकता, और Rishishwar Industry रिकॉर्ड अखंडता और अनधिकृत परिवर्तनों से बचाव सुनिश्चित करता है।</li>
          <li>आपदा स्थिति में भुगतान निलंबन: Larn2Pay आपदा स्थिति में भुगतान निलंबित कर सकता है, और Rishishwar Industry सूचनाएँ देता है, जिससे वित्तीय संचालन की सुरक्षा सुनिश्चित होती है।</li>
          <li>प्रारंभिक निपटान मांग का निषेध: संस्थान T+7 समयरेखा से पहले Larn2Pay निपटान की मांग नहीं कर सकता, और Rishishwar Industry व्यवस्थित वित्तीय संचालन सुनिश्चित करता है।</li>
          <li>विशेष योजनाओं के लिए अनुमोदन: Larn2Pay में छूट या योजनाएँ Rishishwar Industry की पूर्व सहमति की आवश्यकता रखती हैं, जिससे प्लेटफॉर्म के लक्ष्यों के साथ संरेखण सुनिश्चित होता है।</li>
          <li>विलंबित भुगतान दंड शुल्क: Larn2Pay संस्थान के विलंबित भुगतानों के लिए ₹500 शुल्क लगा सकता है, और Rishishwar Industry समय पर अनुपालन और वित्तीय संचालन की रक्षा करता है।</li>
          <li>विवादों में अंतिम रिपोर्ट: Larn2Pay की वित्तीय रिपोर्ट विवादों में अंतिम हैं, और Rishishwar Industry सटीकता और पारदर्शिता सुनिश्चित करता है, जिससे प्लेटफॉर्म की अखंडता बनी रहती है।</li>
          <li>सुरक्षित निपटान अधिसूचनाएँ: Larn2Pay निपटान पूर्ण होने की सुरक्षित अधिसूचनाएँ देता है, और Rishishwar Industry संचार प्रोटोकॉल को नियंत्रित करता है, जिससे गोपनीयता और दक्षता सुनिश्चित होती है।</li>
          <li>धोखाधड़ी पहचान प्रोटोकॉल: Larn2Pay लेनदेन की सुरक्षा के लिए उन्नत धोखाधड़ी पहचान का उपयोग करता है, और Rishishwar Industry प्लेटफॉर्म की सुरक्षा और वित्तीय जोखिमों को कम करता है।</li>
          <li>निपटान आवृत्ति लचीलापन: Larn2Pay संस्थान की जरूरतों के आधार पर निपटान आवृत्ति को समायोजित कर सकता है, और Rishishwar Industry अनुकूलन को मंजूरी देता है।</li>
          <li>स्वचालित रिफंड प्रक्रिया: Larn2Pay मान्य रिफंड के लिए स्वचालित प्रक्रिया प्रदान करता है, और Rishishwar Industry नीति अनुपालन और पारदर्शिता सुनिश्चित करता है।</li>
          <li>निपटान असंगति समाधान: Larn2Pay निपटान असंगतियों को 48 घंटों के भीतर हल करता है, और Rishishwar Industry त्वरित समाधान और वित्तीय सटीकता सुनिश्चित करता है।</li>
          <li>मल्टी-बैंक खाता समर्थन: Larn2Pay कई बैंक खातों में निपटान का समर्थन करता है, और Rishishwar Industry लचीलापन और डेटा अखंडता सुनिश्चित करता है।</li>
          <li>निपटान स्थिति ट्रैकिंग: Larn2Pay निपटान स्थिति पर वास्तविक समय अपडेट प्रदान करता है, और Rishishwar Industry डैशबोर्ड सटीकता को बनाए रखता है।</li>
          <li>वित्तीय सुलह उपकरण: Larn2Pay सुलह के लिए उपकरण प्रदान करता है, और Rishishwar Industry सटीकता और अनुपालन सुनिश्चित करता है, जिससे वित्तीय विवाद कम होते हैं।</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. तकनीकी सहायता और प्रशिक्षण</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay के लिए तकनीकी सहायता और प्रशिक्षण को रेखांकित करता है, जो निर्बाध उपयोग सुनिश्चित करता है।</p>
        <ul className="list-disc pr-6">
          <li>विस्तृत शामिल प्रशिक्षण: Rishishwar Industry Larn2Pay पर कर्मचारियों के लिए मुफ्त, विस्तृत प्रशिक्षण प्रदान करता है, जिससे दक्षता बढ़ती है और त्रुटियाँ कम होती हैं, और प्रशिक्षण प्रारूप नियंत्रित होते हैं।</li>
          <li>समर्पित तकनीकी सहायता दल: Larn2Pay संस्थान की पूछताछ और समस्याओं के लिए समर्पित दल प्रदान करता है, और Rishishwar Industry त्वरित, पेशेवर समाधान सुनिश्चित करता है।</li>
          <li>निर्धारित सहायता घंटे: Larn2Pay सोमवार से शनिवार, सुबह 10 बजे से शाम 6 बजे तक सहायता प्रदान करता है, और Rishishwar Industry समय पर प्रतिक्रियाएँ सुनिश्चित करता है।</li>
          <li>आपातकालीन हेल्पलाइन उपलब्धता: Larn2Pay महत्वपूर्ण समस्याओं के लिए आपातकालीन हेल्पलाइन प्रदान करता है, और Rishishwar Industry त्वरित समाधान सुनिश्चित करता है, जिससे प्लेटफॉर्म की विश्वसनीयता बनी रहती है।</li>
          <li>नियमित सिस्टम अपडेट अधिसूचनाएँ: Larn2Pay साप्ताहिक और मासिक अपडेट अधिसूचनाएँ साझा करता है, और Rishishwar Industry पारदर्शिता और प्लेटफॉर्म कार्यक्षमता को बनाए रखता है।</li>
          <li>सरल मुद्दा रिपोर्टिंग सुविधा: Larn2Pay का डैशबोर्ड "मुद्दा रिपोर्ट करें" सुविधा प्रदान करता है, और Rishishwar Industry त्वरित समाधान और प्लेटफॉर्म स्थिरता सुनिश्चित करता है।</li>
          <li>विस्तृत प्रशिक्षण सामग्री: Larn2Pay स्व-गति प्रशिक्षण के लिए PDF और वीडियो ट्यूटोरियल प्रदान करता है, और Rishishwar Industry सामग्री की सटीकता और प्रासंगिकता सुनिश्चित करता है।</li>
          <li>प्रशिक्षण सत्र रिकॉर्डिंग तक पहुँच: Larn2Pay कर्मचारियों के लिए रिकॉर्डेड प्रशिक्षण सत्र प्रदान करता है, और Rishishwar Industry सुरक्षित पहुँच और सामग्री नियंत्रण सुनिश्चित करता है।</li>
          <li>सुरक्षित लॉगिन निर्देश: Larn2Pay कर्मचारियों के लिए विस्तृत लॉगिन निर्देश प्रदान करता है, और Rishishwar Industry सुरक्षित प्रोटोकॉल सुनिश्चित करता है, जिससे अनधिकृत उपयोग रोका जाता है।</li>
          <li>प्रोएक्टिव तकनीकी अपडेट अलर्ट: Rishishwar Industry Larn2Pay तकनीकी अपडेट को ईमेल के माध्यम से संचारित करता है, जिससे पारदर्शिता और प्लेटफॉर्म की विश्वसनीयता और सुरक्षा बनी रहती है।</li>
          <li>त्रैमासिक रिफ्रेशर प्रशिक्षण सत्र: Larn2Pay कर्मचारियों को अपडेट रखने के लिए त्रैमासिक प्रशिक्षण प्रदान करता है, और Rishishwar Industry सत्रों को नियंत्रित करता है, जिससे प्लेटफॉर्म अपडेट के साथ संरेखण सुनिश्चित होता है।</li>
          <li>ऑनलाइन सहायता संसाधन केंद्र: Larn2Pay FAQ और संसाधनों के साथ डिजिटल सहायता केंद्र प्रदान करता है, और Rishishwar Industry सुलभता और सटीकता सुनिश्चित करता है।</li>
          <li>प्रोएक्टिव मुद्दा निगरानी सिस्टम: Larn2Pay समस्याओं को संचालन प्रभावित होने से पहले हल करता है, और Rishishwar Industry न्यूनतम व्यवधान और प्लेटफॉर्म की विश्वसनीयता सुनिश्चित करता है।</li>
          <li>वैकल्पिक प्रीमियम सहायता पैकेज: Larn2Pay प्रीमियम सहायता पैकेज प्रदान कर सकता है, और Rishishwar Industry मूल्य निर्धारण और सुविधाओं को नियंत्रित करता है, जिससे प्लेटफॉर्म की स्थिरता सुनिश्चित होती है।</li>
          <li>प्राथमिकता-आधारित सहायता टिकटिंग: Larn2Pay आंतरिक मानदंडों के आधार पर सहायता टिकटों को प्राथमिकता देता है, और Rishishwar Industry कुशल समाधान और प्लेटफॉर्म प्रदर्शन सुनिश्चित करता है।</li>
          <li>दूरस्थ समस्यानिवारण क्षमता: Larn2Pay त्वरित सुधारों के लिए दूरस्थ समस्यानिवारण का समर्थन करता है, और Rishishwar Industry प्रक्रिया को प्रबंधित करता है, जिससे प्लेटफॉर्म की विश्वसनीयता बनी रहती है।</li>
          <li>प्रशिक्षण प्रतिक्रिया तंत्र: Larn2Pay प्रशिक्षण प्रतिक्रिया एकत्र करता है, और Rishishwar Industry कार्यान्वयन को निखारता है, जिससे प्लेटफॉर्म के लक्ष्यों के साथ संरेखण सुनिश्चित होता है।</li>
          <li>सहायता सहभागिता लॉगिंग: Larn2Pay सभी सहायता सहभागिताओं को लॉग करता है, और Rishishwar Industry रिकॉर्ड की सुरक्षा सुनिश्चित करता है, जिससे विवादों से बचाव और जवाबदेही बनी रहती है।</li>
          <li>AI-संचालित सहायता स्वचालन: Larn2Pay नियमित पूछताछों के लिए AI-संचालित बॉट्स का उपयोग करता है, और Rishishwar Industry सटीकता और प्लेटफॉर्म सहायता मानकों के साथ संरेखण सुनिश्चित करता है।</li>
          <li>सहायता घंटे विस्तार अधिकार: Rishishwar Industry Larn2Pay के सहायता घंटों को अपने विवेक से बढ़ा सकता है, जिससे संस्थानों की जरूरतों को पूरा करने की लचीलापन सुनिश्चित होता है।</li>
          <li>सैंडबॉक्स परीक्षण वातावरण: Larn2Pay डेमो लेनदेन के लिए सैंडबॉक्स प्रदान करता है, और Rishishwar Industry पहुँच को नियंत्रित करता है, जिससे लाइव डेटा की सुरक्षा और प्लेटफॉर्म की विश्वसनीयता सुनिश्चित होती है।</li>
          <li>ग्राहक सहायता SLA प्रतिबद्धता: Larn2Pay 48 घंटों के भीतर समस्याओं का समाधान करता है, और Rishishwar Industry अनुपालन सुनिश्चित करता है, जिससे विश्वास और संचालन दक्षता बनी रहती है।</li>
          <li>महत्वपूर्ण मुद्दों की प्राथमिकता: Larn2Pay महत्वपूर्ण समस्याओं को त्वरित समाधान के लिए प्राथमिकता देता है, और Rishishwar Industry न्यूनतम व्यवधान और प्लेटफॉर्म की विश्वसनीयता सुनिश्चित करता है।</li>
          <li>मल्टी-चैनल सहायता पहुँच: Larn2Pay समर्पित ईमेल और WhatsApp चैनल प्रदान करता है, और Rishishwar Industry सुलभता और सुरक्षा सुनिश्चित करता है, जिससे हितधारक विश्वास बना रहता है।</li>
          <li>सहायता गतिविधि ऑडिट ट्रेल्स: Larn2Pay सहायता गतिविधियों को जवाबदेही के लिए रिकॉर्ड करता है, और Rishishwar Industry सुरक्षित रिकॉर्ड सुनिश्चित करता है, जिससे विवादों से बचाव होता है।</li>
          <li>वेबिनार-आधारित प्रशिक्षण: Larn2Pay नियमित वेबिनार प्रदान करता है ताकि कर्मचारियों को प्लेटफॉर्म सुविधाओं से अपडेट रखा जाए, और Rishishwar Industry सामग्री की प्रासंगिकता सुनिश्चित करता है।</li>
          <li>उपयोगकर्ता-विशिष्ट सहायता गाइड: Larn2Pay कर्मचारियों और अभिभावकों के लिए अनुकूलित गाइड प्रदान करता है, और Rishishwar Industry सामग्री को अनुकूलित करता है, जिससे उपयोगिता बढ़ती है।</li>
          <li>स्वचालित सहायता टिकट ट्रैकिंग: Larn2Pay सहायता टिकटों की स्थिति को ट्रैक करता है, और Rishishwar Industry पारदर्शी संचार और त्वरित समाधान सुनिश्चित करता है।</li>
          <li>सहायता प्रतिक्रिया विश्लेषण: Larn2Pay सहायता सेवा सुधार के लिए उपयोगकर्ता प्रतिक्रिया का विश्लेषण करता है, और Rishishwar Industry कार्यान्वयन को निखारता है।</li>
          <li>ऑफसाइट प्रशिक्षण विकल्प: Larn2Pay बड़े संस्थानों के लिए ऑनसाइट प्रशिक्षण प्रदान करता है, और Rishishwar Industry लागत और लॉजिस्टिक्स को नियंत्रित करता है।</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. डेटा सुरक्षा और गोपनीयता</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay के डेटा सुरक्षा और गोपनीयता सुनिश्चित करने के लिए मजबूत उपायों को रेखांकित करता है।</p>
        <ul className="list-disc pr-6">
          <li>वैश्विक डेटा संरक्षण अनुपालन: Larn2Pay वैश्विक और भारतीय डेटा संरक्षण नियमों, जैसे GDPR और IT अधिनियम, का पालन करता है, और Rishishwar Industry अनुपालन की निगरानी करता है, जिससे कानूनी जोखिम कम होते हैं।</li>
          <li>डेटा उल्लंघन शमन प्रक्रिया: Larn2Pay डेटा उल्लंघनों के लिए त्वरित शमन उपाय लागू करता है, और Rishishwar Industry प्रभावित हितधारकों को सूचित करता है, जिससे पारदर्शिता और विश्वास बना रहता है।</li>
          <li>उपयोगकर्ता डेटा गोपनीयता गारंटी: Larn2Pay व्यक्तिगत डेटा को अनधिकृत प्रकटीकरण से बचाता है, और Rishishwar Industry गोपनीयता नीतियों को लागू करता है, जिससे हितधारक विश्वास सुनिश्चित होता है।</li>
          <li>नियमित डेटा बैकअप प्रोटोकॉल: Larn2Pay डेटा हानि को रोकने के लिए नियमित बैकअप करता है, और Rishishwar Industry बैकअप की अखंडता और सुरक्षा सुनिश्चित करता है।</li>
          <li>संस्थान डेटा साझाकरण जिम्मेदारी: संस्थान अपने डेटा साझाकरण प्रथाओं के लिए जिम्मेदार है, और Rishishwar Industry Larn2Pay में तृतीय-पक्ष दुरुपयोग के लिए दायित्व से मुक्त रहता है।</li>
          <li>सुरक्षित डेटा माइग्रेशन प्रक्रिया: Larn2Pay डेटा माइग्रेशन के लिए सुरक्षित प्रोटोकॉल प्रदान करता है, और Rishishwar Industry प्रक्रिया को नियंत्रित करता है, जिससे डेटा अखंडता बनी रहती है।</li>
          <li>डेटा न्यूनीकरण नीति: Larn2Pay केवल आवश्यक डेटा एकत्र करता है, और Rishishwar Industry गोपनीयता जोखिमों को कम करने के लिए नीति को लागू करता है।</li>
          <li>उपयोगकर्ता डेटा हटाने का अधिकार: Larn2Pay उपयोगकर्ताओं को उनके डेटा हटाने का अनुरोध करने की अनुमति देता है, और Rishishwar Industry अनुरोधों को नियामक समयसीमा के भीतर प्रोसेस करता है।</li>
          <li>एन्क्रिप्टेड संचार चैनल: Larn2Pay सभी संचार के लिए एन्क्रिप्टेड चैनल का उपयोग करता है, और Rishishwar Industry अवरोधन से बचाव सुनिश्चित करता है।</li>
          <li>नियमित सॉफ्टवेयर पैचिंग: Larn2Pay सुरक्षा कमजोरियों को दूर करने के लिए नियमित पैच लागू करता है, और Rishishwar Industry अपडेट की समयबद्धता सुनिश्चित करता है।</li>
          <li>डेटा उपयोग पारदर्शिता: Larn2Pay डेटा उपयोग नीतियों को स्पष्ट रूप से संचारित करता है, और Rishishwar Industry हितधारकों को सूचित रखता है, जिससे विश्वास और अनुपालन सुनिश्चित होता है।</li>
          <li>सुरक्षित API एकीकरण: Larn2Pay तृतीय-पक्ष एकीकरण के लिए सुरक्षित API प्रदान करता है, और Rishishwar Industry डेटा उल्लंघनों को रोकने के लिए प्रोटोकॉल को नियंत्रित करता है।</li>
          <li>उपयोगकर्ता सत्र प्रबंधन: Larn2Pay निष्क्रिय सत्रों को स्वचालित रूप से समाप्त करता है, और Rishishwar Industry अनधिकृत पहुँच को रोकने के लिए सत्र प्रबंधन को लागू करता है।</li>
          <li>डेटा गोपनीयता प्रशिक्षण: Rishishwar Industry कर्मचारियों को डेटा गोपनीयता प्रथाओं पर प्रशिक्षण देता है, जिससे Larn2Pay के संचालन में अनुपालन और विश्वास सुनिश्चित होता है।</li>
          <li>अनधिकृत डेटा निर्यात का निषेध: संस्थान Larn2Pay से डेटा को असुरक्षित प्रारूपों में निर्यात नहीं कर सकता, और Rishishwar Industry अनुपालन लागू करता है।</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. उपयोगकर्ता की जिम्मेदारियाँ</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay के उपयोग के लिए संस्थानों और उपयोगकर्ताओं की जिम्मेदारियों को रेखांकित करता है, जिससे प्लेटफॉर्म की अखंडता सुनिश्चित होती है।</p>
        <ul className="list-disc pr-6">
          <li>सटीक डेटा प्रदान करना: संस्थान को Larn2Pay में सटीक और अद्यतन जानकारी, जैसे छात्र और शुल्क विवरण, प्रदान करनी होगी, और Rishishwar Industry त्रुटियों के लिए दायित्व से मुक्त रहता है।</li>
          <li>उपयोगकर्ता खाता सुरक्षा: उपयोगकर्ता अपने Larn2Pay लॉगिन क्रेडेंशियल्स की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं, और Rishishwar Industry अनधिकृत उपयोग के लिए उत्तरदायी नहीं है।</li>
          <li>नीति अनुपालन: संस्थान को Larn2Pay की शुल्क और भुगतान नीतियों का पालन करना होगा, और Rishishwar Industry अनुपालन की निगरानी करता है।</li>
          <li>समय पर भुगतान अधिसूचना: संस्थान को अभिभावकों को शुल्क भुगतान समयसीमा की सूचना देनी होगी, और Rishishwar Industry स्वचालित रिमाइंडर प्रदान करता है।</li>
          <li>उपयोगकर्ता प्रशिक्षण भागीदारी: संस्थान को कर्मचारियों को Larn2Pay प्रशिक्षण सत्रों में भाग लेने के लिए प्रोत्साहित करना होगा, और Rishishwar Industry प्रशिक्षण सामग्री प्रदान करता है।</li>
          <li>अनधिकृत उपयोग की रिपोर्टिंग: संस्थान को Larn2Pay में किसी भी अनधिकृत गतिविधि की तुरंत सूचना देनी होगी, और Rishishwar Industry त्वरित कार्रवाई सुनिश्चित करता है।</li>
          <li>भुगतान गेटवे अनुपालन: संस्थान को Larn2Pay के भुगतान गेटवे नियमों का पालन करना होगा, और Rishishwar Industry तृतीय-पक्ष जोखिमों से दायित्व मुक्त रहता है।</li>
          <li>डेटा सत्यापन जिम्मेदारी: संस्थान को Larn2Pay में दर्ज डेटा की सटीकता सत्यापित करनी होगी, और Rishishwar Industry गलत डेटा के कारण त्रुटियों के लिए उत्तरदायी नहीं है।</li>
          <li>प्लेटफॉर्म दुरुपयोग का निषेध: संस्थान Larn2Pay का उपयोग अनधिकृत उद्देश्यों के लिए नहीं कर सकता, और Rishishwar Industry दुरुपयोग के खिलाफ कार्रवाई का अधिकार रखता है।</li>
          <li>उपयोगकर्ता प्रतिक्रिया प्रदान करना: संस्थान को Larn2Pay सुधार के लिए रचनात्मक प्रतिक्रिया प्रदान करने के लिए प्रोत्साहित किया जाता है, और Rishishwar Industry प्रतिक्रिया को एकत्र और लागू करता है।</li>
          <li>नियमित खाता निगरानी: उपयोगकर्ता को अपने Larn2Pay खाते की गतिविधियों की नियमित निगरानी करनी होगी, और Rishishwar Industry गतिविधि लॉग प्रदान करता है।</li>
          <li>संस्थान की नीति संरेखण: संस्थान को अपनी शुल्क नीतियों को Larn2Pay की कार्यक्षमता के साथ संरेखित करना होगा, और Rishishwar Industry अनुकूलन उपकरण प्रदान करता है।</li>
          <li>समय पर सहायता अनुरोध: संस्थान को तकनीकी समस्याओं के लिए तुरंत सहायता अनुरोध जमा करना होगा, और Rishishwar Industry त्वरित समाधान सुनिश्चित करता है।</li>
          <li>कानूनी अनुपालन जिम्मेदारी: संस्थान को स्थानीय वित्तीय और डेटा नियमों का पालन करना होगा, और Rishishwar Industry Larn2Pay में अनुपालन उपकरण प्रदान करता है।</li>
          <li>उपयोगकर्ता प्रशिक्षण अनुपालन: संस्थान को यह सुनिश्चित करना होगा कि कर्मचारी Larn2Pay प्रशिक्षण पूरा करें, और Rishishwar Industry अनुपालन की निगरानी करता है।</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. समझौते की समाप्ति</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay समझौते की समाप्ति की शर्तों और प्रक्रियाओं को रेखांकित करता है।</p>
        <ul className="list-disc pr-6">
          <li>30-दिन की समाप्ति सूचना: संस्थान को Larn2Pay समझौते को समाप्त करने के लिए 30 दिन की लिखित सूचना देनी होगी, और Rishishwar Industry प्रक्रिया को नियंत्रित करता है।</li>
          <li>अनुबंध उल्लंघन पर समाप्ति: Rishishwar Industry अनुबंध उल्लंघन, जैसे गैर-भुगतान या दुरुपयोग, के लिए Larn2Pay पहुँच तुरंत समाप्त कर सकता है।</li>
          <li>डेटा मिटाने की प्रक्रिया: समाप्ति पर, Larn2Pay 30 दिनों के भीतर संस्थान डेटा मिटाता है, और Rishishwar Industry नियामक अनुपालन सुनिश्चित करता है।</li>
          <li>बकाया शुल्क का निपटान: समाप्ति से पहले संस्थान को सभी बकाया Larn2Pay शुल्क चुकाने होंगे, और Rishishwar Industry निपटान प्रक्रिया को प्रबंधित करता है।</li>
          <li>पहुँच निलंबन अधिकार: Rishishwar Industry नियमों के उल्लंघन पर Larn2Pay पहुँच निलंबित कर सकता है, और संस्थानों को सूचित किया जाएगा।</li>
          <li>समाप्ति के बाद डेटा निर्यात: Larn2Pay समाप्ति से पहले डेटा निर्यात की अनुमति देता है, और Rishishwar Industry सुरक्षित निर्यात प्रक्रिया सुनिश्चित करता है।</li>
          <li>कोई समाप्ति शुल्क नहीं: Larn2Pay समाप्ति के लिए कोई अतिरिक्त शुल्क नहीं लेता, और Rishishwar Industry पारदर्शी समाप्ति नीति सुनिश्चित करता है।</li>
          <li>स्वचालित पहुँच समाप्ति: समाप्ति पर, Larn2Pay सभी उपयोगकर्ता खातों को स्वचालित रूप से निष्क्रिय करता है, और Rishishwar Industry अनधिकृत उपयोग को रोकता है।</li>
          <li>समाप्ति के बाद समर्थन सीमा: समाप्ति के बाद, Larn2Pay केवल 30 दिनों के लिए सीमित समर्थन प्रदान करता है, और Rishishwar Industry समर्थन प्रक्रिया को नियंत्रित करता है।</li>
          <li>समाप्ति पर रिकॉर्ड संरक्षण: Rishishwar Industry नियामक आवश्यकताओं के लिए Larn2Pay रिकॉर्ड को 5 वर्षों तक संरक्षित कर सकता है, जिससे अनुपालन सुनिश्चित होता है।</li>
          <li>पुन: सक्रियण शुल्क नीति: समाप्ति के बाद Larn2Pay पुन: सक्रियण के लिए शुल्क लागू कर सकता है, और Rishishwar Industry शर्तों को नियंत्रित करता है।</li>
          <li>समाप्ति पर अधिसूचना: Rishishwar Industry समाप्ति की पुष्टि सभी हितधारकों को सूचित करता है, जिससे पारदर्शिता और सुचारू परिवर्तन सुनिश्चित होता है।</li>
          <li>अनुबंध समाप्ति का अधिकार: Rishishwar Industry बिना कारण बताए 60 दिन की सूचना के साथ Larn2Pay समझौते को समाप्त कर सकता है, जिससे लचीलापन सुनिश्चित होता है।</li>
          <li>समाप्ति के बाद विवाद समाधान: समाप्ति के बाद उत्पन्न होने वाले विवादों को इस समझौते के नियमों के अनुसार हल किया जाएगा, और Rishishwar Industry प्रक्रिया को प्रबंधित करता है।</li>
          <li>समाप्ति पर डेटा स्वामित्व: समाप्ति पर, सभी Larn2Pay डेटा Rishishwar Industry की संपत्ति रहता है, और संस्थान डेटा पर कोई दावा नहीं कर सकता।</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. विवाद समाधान</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay से संबंधित विवादों को हल करने की प्रक्रियाओं को रेखांकित करता है।</p>
        <ul className="list-disc pr-6">
          <li>प्रारंभिक मध्यस्थता आवश्यकता: Larn2Pay से संबंधित सभी विवादों को पहले मध्यस्थता के माध्यम से हल किया जाएगा, और Rishishwar Industry प्रक्रिया को प्रबंधित करता है।</li>
          <li>मध्यस्थता स्थान: मध्यस्थता भारत में होगी, और Rishishwar Industry निष्पक्ष मध्यस्थ नियुक्त करता है, जिससे तटस्थता सुनिश्चित होती है।</li>
          <li>कानूनी क्षेत्राधिकार: Larn2Pay से संबंधित विवाद भारतीय कानूनों के अधीन होंगे, और Rishishwar Industry दिल्ली में क्षेत्राधिकार सुनिश्चित करता है।</li>
          <li>विवाद अधिसूचना समयसीमा: संस्थान को विवाद उत्पन्न होने के 30 दिनों के भीतर Rishishwar Industry को सूचित करना होगा, जिससे त्वरित समाधान सुनिश्चित होता है।</li>
          <li>विवाद दस्तावेजीकरण आवश्यकता: सभी विवादों के लिए विस्तृत दस्तावेजीकरण आवश्यक है, और Rishishwar Industry पारदर्शी रिकॉर्ड-कीपिंग सुनिश्चित करता है।</li>
          <li>मध्यस्थता लागत साझाकरण: मध्यस्थता लागत को विवाद में शामिल पक्षों के बीच साझा किया जाएगा, और Rishishwar Industry लागत आवंटन को नियंत्रित करता है।</li>
          <li>बाध्यकारी मध्यस्थता निर्णय: मध्यस्थता का निर्णय अंतिम और बाध्यकारी होगा, और Rishishwar Industry कार्यान्वयन सुनिश्चित करता है।</li>
          <li>विवाद गोपनीयता नीति: सभी विवाद चर्चाएँ गोपनीय रहेंगी, और Rishishwar Industry गोपनीयता प्रोटोकॉल लागू करता है।</li>
          <li>तृतीय-पक्ष विवाद छूट: Rishishwar Industry तृतीय-पक्ष गेटवे या बैंकों से उत्पन्न होने वाले विवादों के लिए उत्तरदायी नहीं है।</li>
          <li>विवाद समाधान समयसीमा: Larn2Pay विवादों को 60 दिनों के भीतर हल करने का लक्ष्य रखता है, और Rishishwar Industry समयबद्ध समाधान सुनिश्चित करता है।</li>
          <li>कानूनी सहायता उपलब्धता: Rishishwar Industry Larn2Pay विवादों के लिए कानूनी सहायता प्रदान करता है, जिससे नियामक अनुपालन सुनिश्चित होता है।</li>
          <li>विवाद रिकॉर्ड संरक्षण: Rishishwar Industry विवाद रिकॉर्ड को 5 वर्षों तक संरक्षित करता है, जिससे नियामक अनुपालन और पारदर्शिता सुनिश्चित होती है।</li>
          <li>विवाद निपटान समझौता: सभी विवाद निपटानों को लिखित समझौते में दर्ज किया जाएगा, और Rishishwar Industry दस्तावेजीकरण को नियंत्रित करता है।</li>
          <li>संस्थान की विवाद जिम्मेदारी: संस्थान अपने गलत डेटा या नीति उल्लंघनों से उत्पन्न होने वाले विवादों के लिए जिम्मेदार है।</li>
          <li>विवाद समाधान समीक्षा: Rishishwar Industry विवाद समाधान प्रक्रियाओं की समय-समय पर समीक्षा करता है, जिससे निष्पक्षता और दक्षता सुनिश्चित होती है।</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. विविध प्रावधान</h2>
        <p className="mb-2">यह अनुभाग Larn2Pay समझौते के अतिरिक्त नियमों और शर्तों को कवर करता है।</p>
        <ul className="list-disc pr-6">
          <li>समझौते का संशोधन: Rishishwar Industry 30 दिन की सूचना के साथ Larn2Pay नियमों को संशोधित कर सकता है, जिससे हितधारकों को सूचित किया जाता है।</li>
          <li>बल मेजर छूट: Rishishwar Industry प्राकृतिक आपदाओं या अप्रत्याशित परिस्थितियों के कारण Larn2Pay की विफलता के लिए उत्तरदायी नहीं है।</li>
          <li>स्वामित्व अधिकार संरक्षण: Larn2Pay की बौद्धिक संपदा Rishishwar Industry की है, और संस्थान इसका उपयोग या पुनरुत्पादन नहीं कर सकता।</li>
          <li>सूचना संचार विधि: Larn2Pay से संबंधित सभी सूचनाएँ ईमेल या डैशबोर्ड के माध्यम से दी जाएंगी, और Rishishwar Industry संचार को नियंत्रित करता है।</li>
          <li>कोई तृतीय-पक्ष लाभार्थी नहीं: यह समझौता केवल संस्थान और Rishishwar Industry के बीच है, और तृतीय पक्षों को कोई अधिकार प्रदान नहीं करता।</li>
          <li>स्वतंत्र ठेकेदार स्थिति: Rishishwar Industry Larn2Pay का स्वतंत्र प्रौद्योगिकी प्रदाता है, और कोई साझेदारी या संयुक्त उद्यम नहीं बनता।</li>
          <li>समझौते की भाषा: Larn2Pay समझौता हिंदी और अंग्रेजी में उपलब्ध है, और Rishishwar Industry अंग्रेजी संस्करण को अंतिम मानता है।</li>
          <li>निरंतर सुधार प्रतिबद्धता: Rishishwar Industry Larn2Pay की कार्यक्षमता को लगातार बेहतर करता है, जिससे हितधारक अनुभव और प्लेटफॉर्म की विश्वसनीयता बढ़ती है।</li>
          <li>संपर्क जानकारी अद्यतन: संस्थान को Larn2Pay में संपर्क जानकारी को अद्यतन रखना होगा, और Rishishwar Industry संचार विफलताओं के लिए उत्तरदायी नहीं है।</li>
          <li>प्लेटफॉर्म उपयोग मॉनिटरिंग: Rishishwar Industry Larn2Pay उपयोग की निगरानी कर सकता है, जिससे अनुपालन और प्रदर्शन अनुकूलन सुनिश्चित होता है।</li>
          <li>सेवा स्तर समझौता: Larn2Pay 99.9% अपटाइम की गारंटी देता है, और Rishishwar Industry प्रदर्शन की निगरानी करता है, जिससे विश्वसनीयता सुनिश्चित होती है।</li>
          <li>कोई छूट नीति: Larn2Pay नियमों का कोई भी छूट भविष्य के प्रवर्तन को प्रभावित नहीं करता, और Rishishwar Industry प्रवर्तन अधिकार रखता है।</li>
          <li>सार्वजनिक प्रकटीकरण का निषेध: संस्थान बिना सहमति के Larn2Pay की गोपनीय जानकारी का खुलासा नहीं कर सकता, और Rishishwar Industry गोपनीयता लागू करता है।</li>
          <li>समझौते की हस्तांतरणीयता: संस्थान बिना Rishishwar Industry की सहमति के Larn2Pay समझौते को हस्तांतरित नहीं कर सकता।</li>
          <li>पूर्ण समझौता: यह दस्तावेज़ Larn2Pay के लिए संस्थान और Rishishwar Industry के बीच पूर्ण समझौते का गठन करता है, और पूर्व समझौतों को प्रतिस्थापित करता है।</li>
        </ul>
      </section>
    </div>
  )
}

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white relative">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <button
          onClick={() => setLanguage('en')}
          className={`font-semibold px-2 ${language === 'en' ? 'underline text-orange-500' : 'text-gray-500 dark:text-gray-300'}`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('hi')}
          className={`font-semibold px-2 ${language === 'hi' ? 'underline text-orange-500' : 'text-gray-500 dark:text-gray-300'}`}
        >
          हिन्दी
        </button>
        <ThemeToggle />
      </div>
      <div className="px-6 py-12 max-w-6xl mx-auto space-y-10">
        {privacyContent[language]}
      </div>
    </div>
  );
};

export default PrivacyPolicy;