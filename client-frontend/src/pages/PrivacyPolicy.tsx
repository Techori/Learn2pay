import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const privacyContent = {
  en: (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Larn2Pay Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Purpose & Scope</h2>
        <p className="text-gray-700">
          Larn2Pay, operated by Rishishwar Industry Private Limited, collects and processes data to facilitate secure fee transactions, ensure regulatory compliance, and deliver efficient services across institutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Essential Data Collection</h2>
        <p className="text-gray-700">
          Larn2Pay collects minimal data, such as names, contact numbers, institutional IDs, and payment details, ensuring compliance with Indian data privacy laws, including the DPDP Act, 2023.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
        <p className="text-gray-700">
          Data processing is conducted under the Indian IT Act, 2000, and DPDP Act, 2023, for legitimate business interests, including platform functionality and compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Data Storage</h2>
        <p className="text-gray-700">
          Larn2Pay uses AES-256 encryption for data storage in secure, Indian-compliant data centers. Rishishwar Industry ensures robust safeguards to protect data integrity and confidentiality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Role-Based Access Controls</h2>
        <p className="text-gray-700">
          Only authorized personnel access data via role-based controls. Rishishwar Industry conducts regular audits, ensuring secure access and maintaining Larn2Pay's operational integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Explicit User Consent</h2>
        <p className="text-gray-700">
          Larn2Pay requires explicit consent at registration or service use. Rishishwar Industry securely records consents, ensuring traceability and compliance with Indian privacy laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Consent Withdrawal Rights</h2>
        <p className="text-gray-700">
          Users may withdraw consent via Larn2Pay's secure portal. Rishishwar Industry processes requests, ensuring prior lawful processing and legal retention remain unaffected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Restricted Data Sharing</h2>
        <p className="text-gray-700">
          Larn2Pay shares data only with verified payment gateways and auditors under strict NDAs. Rishishwar Industry ensures confidentiality and compliance with data protection agreements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention Policy</h2>
        <p className="text-gray-700">
          Larn2Pay retains data for three years post-transaction or as legally required. Rishishwar Industry ensures encrypted backups for compliance and disaster recovery.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Modification Rights</h2>
        <p className="text-gray-700">
          Users can view and correct data via a secure portal. Rishishwar Industry verifies requests, ensuring accuracy and compliance with user-centric policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Data Access Rights</h2>
        <p className="text-gray-700">
          Users may request data access or limited erasure per Indian laws. Rishishwar Industry processes requests within 30 days, subject to verification.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Breach Notification Protocol</h2>
        <p className="text-gray-700">
          Larn2Pay notifies stakeholders of breaches within 72 hours per DPDP Act, 2023. Rishishwar Industry ensures corrective actions and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="text-gray-700">
          Rishishwar Industry is not liable for unauthorized access due to user negligence, such as weak passwords. Compensation is subject to contractual terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">No Data Sale Policy</h2>
        <p className="text-gray-700">
          Larn2Pay never sells, rents, or exploits user data for marketing. Rishishwar Industry enforces this, ensuring privacy and compliance with ethical standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Minimization Standards</h2>
        <p className="text-gray-700">
          Larn2Pay collects only necessary data for operations and compliance. Rishishwar Industry enforces this, minimizing exposure and ensuring regulatory adherence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staff Privacy Training</h2>
        <p className="text-gray-700">
          Larn2Pay trains staff in cybersecurity and privacy practices. Rishishwar Industry ensures ongoing training, reducing risks and enhancing platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Institution Data Segregation</h2>
        <p className="text-gray-700">
          Larn2Pay segregates institutional data to prevent cross-access. Rishishwar Industry enforces protocols, ensuring confidentiality and compliance with privacy requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Protection Officer</h2>
        <p className="text-gray-700">
          Larn2Pay appoints a Data Protection Officer to oversee compliance. Rishishwar Industry ensures the officer addresses grievances, maintaining trust and regulatory adherence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Policy Update Notifications</h2>
        <p className="text-gray-700">
          Larn2Pay notifies users of policy changes via email, SMS, or in-app alerts. Continued use post-notification constitutes acceptance, per Rishishwar Industry's oversight.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Governing Law & Jurisdiction</h2>
        <p className="text-gray-700">
          Privacy matters are governed by Indian law. Disputes fall under the exclusive jurisdiction of courts in Gwalior, Madhya Pradesh, ensuring legal clarity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure API Transmission</h2>
        <p className="text-gray-700">
          Larn2Pay uses secure APIs for payment gateway integration. Rishishwar Industry monitors API integrity, ensuring encrypted exchanges and upholding platform security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Encrypted Offsite Backups</h2>
        <p className="text-gray-700">
          Larn2Pay backs up data in encrypted offsite servers. Rishishwar Industry manages protocols, ensuring recovery capabilities and protecting data integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Portability Options</h2>
        <p className="text-gray-700">
          Larn2Pay allows data exports in formats like CSV. Rishishwar Industry ensures secure, structured exports, enhancing user convenience and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">PCI DSS Compliance</h2>
        <p className="text-gray-700">
          Larn2Pay integrates with PCI DSS-compliant payment gateways. Rishishwar Industry oversees integrations, ensuring secure transactions and protecting financial data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Anonymized Analytics Data</h2>
        <p className="text-gray-700">
          Larn2Pay uses anonymized data for platform enhancements. Rishishwar Industry ensures no personal identifiers are used, protecting privacy and optimizing performance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Processing Agreements</h2>
        <p className="text-gray-700">
          Larn2Pay requires institutions to sign data processing agreements. Rishishwar Industry ensures alignment with laws, protecting users and ensuring compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">HTTPS and SSL Security</h2>
        <p className="text-gray-700">
          Larn2Pay uses HTTPS and SSL for data transmissions. Rishishwar Industry monitors security, ensuring protection against interception and maintaining platform integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Access Audit Trails</h2>
        <p className="text-gray-700">
          Larn2Pay maintains audit trails for data access. Rishishwar Industry reviews trails, ensuring accountability and preventing unauthorized access on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Impact Assessments</h2>
        <p className="text-gray-700">
          Larn2Pay conducts regular data processing impact assessments. Rishishwar Industry oversees assessments, ensuring compliance and minimizing risks across the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">No Non-Essential Data</h2>
        <p className="text-gray-700">
          Larn2Pay avoids collecting non-essential data like biometrics unless legally mandated. Rishishwar Industry enforces this, ensuring compliance with Indian privacy laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Notification Storage</h2>
        <p className="text-gray-700">
          Larn2Pay securely stores SMS and email notification records. Rishishwar Industry ensures encrypted storage, protecting communications and complying with privacy laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Correction Process</h2>
        <p className="text-gray-700">
          Larn2Pay allows users to correct data via a secure portal. Rishishwar Industry verifies requests, ensuring accuracy and compliance with policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Breach Mitigation Measures</h2>
        <p className="text-gray-700">
          Larn2Pay implements swift breach mitigation measures. Rishishwar Industry oversees responses, ensuring quick resolution and compliance with regulatory obligations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Institution Access Controls</h2>
        <p className="text-gray-700">
          Larn2Pay restricts institution access to their data sets. Rishishwar Industry enforces controls, ensuring confidentiality and preventing unauthorized access.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Consent Management System</h2>
        <p className="text-gray-700">
          Larn2Pay manages consents securely with traceable records. Rishishwar Industry ensures accuracy, maintaining compliance and protecting user privacy on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Two-Factor Authentication</h2>
        <p className="text-gray-700">
          Larn2Pay implements two-factor authentication for logins. Rishishwar Industry oversees protocols, ensuring protection against unauthorized access and enhancing platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Parental Consent for Minors</h2>
        <p className="text-gray-700">
          Larn2Pay requires parental consent for users under 18. Rishishwar Industry verifies consents, ensuring compliance with child protection laws and fostering trust.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quarterly Security Audits</h2>
        <p className="text-gray-700">
          Larn2Pay conducts quarterly data security audits. Rishishwar Industry oversees audits, identifying vulnerabilities and reinforcing Larn2Pay's commitment to robust data protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Disposal</h2>
        <p className="text-gray-700">
          Larn2Pay securely disposes of data post-retention. Rishishwar Industry oversees disposal, ensuring compliance and preventing data recovery risks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Access Request Handling</h2>
        <p className="text-gray-700">
          Larn2Pay processes data access requests within 30 days. Rishishwar Industry ensures prompt responses, maintaining transparency and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Encryption Key Management</h2>
        <p className="text-gray-700">
          Larn2Pay uses secure key management for encryption. Rishishwar Industry oversees protocols, ensuring protection and maintaining platform integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">No Advertising Data Sharing</h2>
        <p className="text-gray-700">
          Larn2Pay prohibits sharing data for advertising. Rishishwar Industry enforces this policy, ensuring privacy and compliance with ethical standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Export Formats</h2>
        <p className="text-gray-700">
          Larn2Pay provides secure data exports in formats like CSV. Rishishwar Industry ensures compatibility and encryption, protecting data during transfers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Automated Session Termination</h2>
        <p className="text-gray-700">
          Larn2Pay terminates inactive sessions to prevent unauthorized access. Rishishwar Industry oversees protocols, ensuring security and platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Annual Transparency Reports</h2>
        <p className="text-gray-700">
          Larn2Pay publishes annual data processing transparency reports. Rishishwar Industry ensures report accuracy, fostering trust and compliance with standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Anonymized Testing Data</h2>
        <p className="text-gray-700">
          Larn2Pay uses anonymized data for system testing. Rishishwar Industry ensures no personal data exposure, maintaining privacy and operational integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Institution Data Deletion</h2>
        <p className="text-gray-700">
          Institutions may request data deletion upon Larn2Pay termination. Rishishwar Industry verifies requests, ensuring secure deletion and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Encrypted Backup Retention</h2>
        <p className="text-gray-700">
          Larn2Pay retains encrypted backups for one year. Rishishwar Industry manages policies, ensuring recovery capabilities and compliance with standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Identity Verification for Access</h2>
        <p className="text-gray-700">
          Larn2Pay verifies user identity for data access. Rishishwar Industry oversees verification, ensuring security and preventing unauthorized access.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Privacy Education</h2>
        <p className="text-gray-700">
          Larn2Pay provides tutorials and FAQs to educate users on privacy. Rishishwar Industry ensures accessibility, fostering awareness and trust in platform practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Continuous System Monitoring</h2>
        <p className="text-gray-700">
          Larn2Pay monitors systems for vulnerabilities continuously. Rishishwar Industry ensures proactive detection, maintaining security and Larn2Pay's operational reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Migration</h2>
        <p className="text-gray-700">
          Larn2Pay uses secure protocols for data migration during upgrades. Rishishwar Industry oversees processes, ensuring data integrity and platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Support Channels</h2>
        <p className="text-gray-700">
          Larn2Pay offers dedicated channels for privacy concerns. Rishishwar Industry ensures prompt responses, addressing user queries and maintaining trust.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Automated Security Alerts</h2>
        <p className="text-gray-700">
          Larn2Pay automates alerts for potential security issues. Rishishwar Industry ensures accuracy, enabling swift action and maintaining platform security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Institutional Compliance Training</h2>
        <p className="text-gray-700">
          Larn2Pay provides compliance training for institutional staff. Rishishwar Industry ensures effectiveness, reducing risks and enhancing platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Archiving</h2>
        <p className="text-gray-700">
          Larn2Pay archives data securely for long-term storage. Rishishwar Industry manages protocols, ensuring compliance and protecting data integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Proactive Breach Prevention</h2>
        <p className="text-gray-700">
          Larn2Pay implements proactive measures to prevent breaches. Rishishwar Industry oversees strategies, ensuring Larn2Pay remains secure and reliable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Transparent Processing Logs</h2>
        <p className="text-gray-700">
          Larn2Pay maintains transparent logs of data processing activities. Rishishwar Industry reviews logs, ensuring accountability and compliance with privacy standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Annual Policy Reviews</h2>
        <p className="text-gray-700">
          Larn2Pay reviews its privacy policy annually. Rishishwar Industry oversees updates, ensuring alignment with DPDP Act, 2023, and user-centric practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Recovery</h2>
        <p className="text-gray-700">
          Larn2Pay implements secure data recovery mechanisms for emergencies. Rishishwar Industry ensures reliability, maintaining data integrity and user trust.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Multi-Factor Authentication Options</h2>
        <p className="text-gray-700">
          Larn2Pay offers multi-factor authentication for enhanced security. Rishishwar Industry ensures robust implementation, protecting accounts and reinforcing reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Regular Software Updates</h2>
        <p className="text-gray-700">
          Larn2Pay applies regular security updates to protect against vulnerabilities. Rishishwar Industry oversees updates, ensuring compliance and platform security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Sharing Audit Trails</h2>
        <p className="text-gray-700">
          Larn2Pay maintains audit trails for data sharing activities. Rishishwar Industry reviews trails, ensuring transparency and preventing unauthorized disclosures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Feedback Mechanisms</h2>
        <p className="text-gray-700">
          Larn2Pay collects user feedback to improve privacy practices. Rishishwar Industry analyzes feedback, ensuring continuous improvement and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Consent Management</h2>
        <p className="text-gray-700">
          Larn2Pay manages data sharing consents securely. Rishishwar Industry ensures accuracy, maintaining confidentiality and compliance with Indian regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Automated Compliance Monitoring</h2>
        <p className="text-gray-700">
          Larn2Pay automates privacy compliance monitoring. Rishishwar Industry ensures effectiveness, maintaining adherence to DPDP Act, 2023, and protecting user data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Access Request Escalation</h2>
        <p className="text-gray-700">
          Larn2Pay escalates complex access requests securely. Rishishwar Industry oversees processes, ensuring compliance and maintaining platform security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Transmission Protocols</h2>
        <p className="text-gray-700">
          Larn2Pay uses advanced protocols for secure data transmissions. Rishishwar Industry monitors protocols, protecting against interception and maintaining integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Incident Resolution</h2>
        <p className="text-gray-700">
          Larn2Pay resolves privacy incidents promptly. Rishishwar Industry oversees resolution, ensuring compliance and maintaining user trust in the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Automated Policy Enforcement</h2>
        <p className="text-gray-700">
          Larn2Pay automates enforcement of privacy policies. Rishishwar Industry ensures accuracy, maintaining compliance and protecting user data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Consent Renewal Tracking</h2>
        <p className="text-gray-700">
          Larn2Pay tracks consent renewals securely. Rishishwar Industry ensures accuracy, maintaining compliance and protecting user privacy on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Breach Response Documentation</h2>
        <p className="text-gray-700">
          Larn2Pay documents all breach response actions. Rishishwar Industry reviews documentation, ensuring transparency and compliance with DPDP Act, 2023.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Institutional Data Integration</h2>
        <p className="text-gray-700">
          Larn2Pay ensures secure data integration with institutional systems. Rishishwar Industry oversees protocols, maintaining confidentiality and platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Proactive Security Enhancements</h2>
        <p className="text-gray-700">
          Larn2Pay continuously enhances data security measures. Rishishwar Industry oversees upgrades, ensuring Larn2Pay remains a leader in secure fee collection solutions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Data Access Portal</h2>
        <p className="text-gray-700">
          Larn2Pay provides a secure portal for users to view and manage data. Rishishwar Industry ensures accessibility, promoting transparency and user empowerment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Regular Vendor Audits</h2>
        <p className="text-gray-700">
          Larn2Pay audits third-party vendors for compliance. Rishishwar Industry oversees audits, ensuring secure partnerships and maintaining Larn2Pay's data protection standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Incident Response Training</h2>
        <p className="text-gray-700">
          Larn2Pay trains staff on incident response protocols. Rishishwar Industry ensures readiness, minimizing risks and enhancing platform reliability during security events.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure User Authentication</h2>
        <p className="text-gray-700">
          Larn2Pay implements advanced authentication beyond two-factor. Rishishwar Industry ensures robust verification, protecting accounts and reinforcing platform security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Anonymization Protocols</h2>
        <p className="text-gray-700">
          Larn2Pay applies strict protocols for data anonymization in analytics. Rishishwar Industry ensures no personal data exposure, maintaining privacy and compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Real-Time Threat Detection</h2>
        <p className="text-gray-700">
          Larn2Pay uses real-time monitoring for threat detection. Rishishwar Industry oversees systems, ensuring proactive responses and maintaining Larn2Pay's security integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Privacy Notifications</h2>
        <p className="text-gray-700">
          Larn2Pay notifies users of data usage changes promptly. Rishishwar Industry ensures clear communication, fostering trust and compliance with regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Segmentation</h2>
        <p className="text-gray-700">
          Larn2Pay segments sensitive data to enhance security. Rishishwar Industry enforces segmentation, ensuring confidentiality and minimizing risks across the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Regular Backup Testing</h2>
        <p className="text-gray-700">
          Larn2Pay tests encrypted backups regularly for reliability. Rishishwar Industry oversees testing, ensuring data recovery capabilities and compliance with standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy Accessibility</h2>
        <p className="text-gray-700">
          Larn2Pay ensures its privacy policy is accessible online. Rishishwar Industry maintains clarity, fostering user trust and compliance with transparency requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure API Authentication</h2>
        <p className="text-gray-700">
          Larn2Pay uses secure authentication for API integrations. Rishishwar Industry monitors access, ensuring encrypted connections and maintaining platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Consent Verification</h2>
        <p className="text-gray-700">
          Larn2Pay verifies user consents before data processing. Rishishwar Industry ensures accuracy, maintaining compliance and protecting user privacy on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Automated Audit Scheduling</h2>
        <p className="text-gray-700">
          Larn2Pay automates scheduling of privacy audits. Rishishwar Industry ensures timeliness, maintaining compliance and enhancing Larn2Pay's data protection reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Breach Simulations</h2>
        <p className="text-gray-700">
          Larn2Pay conducts breach simulations to test response plans. Rishishwar Industry oversees simulations, ensuring preparedness and compliance with regulatory standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Transfer Channels</h2>
        <p className="text-gray-700">
          Larn2Pay uses dedicated secure channels for data transfers. Rishishwar Industry monitors channels, ensuring protection against interception and maintaining integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Privacy Training Modules</h2>
        <p className="text-gray-700">
          Larn2Pay offers interactive privacy training via tutorials and FAQs. Rishishwar Industry ensures effectiveness, enhancing awareness and trust in the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Compliance Reporting System</h2>
        <p className="text-gray-700">
          Larn2Pay maintains a system for compliance reporting. Rishishwar Industry ensures accurate reports, fostering transparency and adherence to DPDP Act, 2023.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Session Management</h2>
        <p className="text-gray-700">
          Larn2Pay manages user sessions securely to prevent hijacking. Rishishwar Industry oversees protocols, ensuring security and platform reliability.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention Audits</h2>
        <p className="text-gray-700">
          Larn2Pay audits data retention policies regularly. Rishishwar Industry ensures compliance, securely deleting outdated data and maintaining regulatory adherence.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Feedback Analysis</h2>
        <p className="text-gray-700">
          Larn2Pay analyzes privacy feedback to enhance policies. Rishishwar Industry ensures actionable insights, improving user trust and compliance with standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Encryption Updates</h2>
        <p className="text-gray-700">
          Larn2Pay updates encryption standards regularly. Rishishwar Industry oversees updates, ensuring robust protection and compliance with evolving security requirements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Vendor Data Protection Agreements</h2>
        <p className="text-gray-700">
          Larn2Pay requires vendors to sign strict data protection agreements. Rishishwar Industry ensures compliance, protecting user data and platform integrity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Data Access Logs</h2>
        <p className="text-gray-700">
          Larn2Pay maintains detailed logs of user data access. Rishishwar Industry reviews logs, ensuring transparency and preventing unauthorized access.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Proactive Regulatory Alignment</h2>
        <p className="text-gray-700">
          Larn2Pay aligns with evolving privacy regulations proactively. Rishishwar Industry monitors changes, ensuring compliance with DPDP Act, 2023, and maintaining leadership.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secure Data Backup Access</h2>
        <p className="text-gray-700">
          Larn2Pay restricts backup access to authorized personnel. Rishishwar Industry enforces controls, ensuring data security and compliance with standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Privacy Complaint Resolution</h2>
        <p className="text-gray-700">
          Larn2Pay resolves privacy complaints promptly via support channels. Rishishwar Industry ensures fair resolution, maintaining user trust and regulatory compliance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Comprehensive Privacy Commitment</h2>
        <p className="text-gray-700">
          Larn2Pay upholds a comprehensive privacy commitment. Rishishwar Industry ensures robust safeguards, fostering trust, compliance, and reliability across the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Larn2Pay Privacy Policy – Overview Summary</h2>
        <p className="text-gray-700">
          The Larn2Pay Privacy Policy, governed by Rishishwar Industry Private Limited, outlines a robust, legally compliant, and user-centric framework for the secure management of personal and institutional data across its digital fee collection ecosystem. Designed in alignment with the Digital Personal Data Protection (DPDP) Act, 2023, and the IT Act, 2000, this policy defines clear principles of data minimization, consent-based processing, secure access, and transparent usage.
        </p>
        <p className="text-gray-700">
          Larn2Pay collects only essential user data—such as names, institutional IDs, contact information, and payment details—ensuring no collection of non-essential data like biometrics unless legally mandated. Data is securely stored using AES-256 encryption in Indian-compliant data centers and transmitted through HTTPS/SSL-secured APIs.
        </p>
        <p className="text-gray-700">
          The platform enforces role-based access controls, two-factor authentication, and audit trail mechanisms to restrict unauthorized access and ensure accountability. User rights are central, with secure options for data access, modification, correction, deletion, and consent withdrawal, all processed within stipulated timelines.
        </p>
        <p className="text-gray-700">
          Larn2Pay's privacy architecture includes:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Explicit user and parental consent</li>
          <li>Data sharing only with verified third parties under strict NDAs</li>
          <li>Quarterly security audits and annual privacy reviews</li>
          <li>Real-time breach detection and 72-hour breach notifications</li>
          <li>No sale or misuse of user data</li>
          <li>Institutional data segregation and protection</li>
        </ul>
        <p className="text-gray-700">
          Additional layers of compliance include Privacy Impact Assessments, staff training, secure backups and migration protocols, automated compliance monitoring, and a dedicated Data Protection Officer (DPO).
        </p>
        <p className="text-gray-700">
          Disputes are governed exclusively under Indian law, with jurisdiction in Gwalior, Madhya Pradesh.
        </p>
        <p className="text-gray-700">
          By combining advanced security measures with ethical data governance, Larn2Pay reaffirms its commitment to transparency, accountability, and user privacy, under the strict oversight of Rishishwar Industry Private Limited.
        </p>
      </section>
    </div>
  ),
  hi: (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">लर्न2पे गोपनीयता नीति</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">उद्देश्य और दायरा</h2>
        <p className="text-gray-700">
          लर्न2पे, जिसे रशीश्वर इंडस्ट्री प्राइवेट लिमिटेड संचालित करता है, सुरक्षित शुल्क लेनदेन, नियामक अनुपालन और संस्थानों में कुशल सेवाएं प्रदान करने के लिए डेटा एकत्र और संसाधित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">आवश्यक डेटा संग्रह</h2>
        <p className="text-gray-700">
          लर्न2पे केवल आवश्यक डेटा जैसे नाम, संपर्क नंबर, संस्थागत आईडी और भुगतान विवरण एकत्र करता है, और यह भारतीय डेटा गोपनीयता कानूनों, जिसमें DPDP अधिनियम, 2023 शामिल है, का पालन करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">प्रसंस्करण का कानूनी आधार</h2>
        <p className="text-gray-700">
          डेटा प्रसंस्करण भारतीय आईटी अधिनियम, 2000 और DPDP अधिनियम, 2023 के तहत वैध व्यावसायिक हितों के लिए किया जाता है, जिसमें प्लेटफॉर्म की कार्यक्षमता और अनुपालन शामिल है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">उन्नत डेटा भंडारण</h2>
        <p className="text-gray-700">
          लर्न2पे डेटा भंडारण के लिए AES-256 एन्क्रिप्शन का उपयोग करता है और डेटा को भारतीय मानकों के अनुरूप सुरक्षित डेटा केंद्रों में रखता है। रशीश्वर इंडस्ट्री डेटा की अखंडता और गोपनीयता की सुरक्षा सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">भूमिका-आधारित पहुँच नियंत्रण</h2>
        <p className="text-gray-700">
          केवल अधिकृत कर्मचारी ही भूमिका-आधारित नियंत्रणों के माध्यम से डेटा तक पहुँच सकते हैं। रशीश्वर इंडस्ट्री नियमित ऑडिट करता है, जिससे प्लेटफॉर्म की सुरक्षा और अखंडता बनी रहती है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">स्पष्ट उपयोगकर्ता सहमति</h2>
        <p className="text-gray-700">
          लर्न2पे पंजीकरण या सेवा उपयोग के समय स्पष्ट सहमति प्राप्त करता है। रशीश्वर इंडस्ट्री सहमतियों को सुरक्षित रूप से रिकॉर्ड करता है, जिससे भारतीय गोपनीयता कानूनों का पालन होता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">सहमति वापसी का अधिकार</h2>
        <p className="text-gray-700">
          उपयोगकर्ता लर्न2पे के सुरक्षित पोर्टल के माध्यम से अपनी सहमति वापस ले सकते हैं। रशीश्वर इंडस्ट्री अनुरोधों को संसाधित करता है, जिससे पूर्व में की गई वैध प्रसंस्करण और कानूनी प्रतिधारण अप्रभावित रहते हैं।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">प्रतिबंधित डेटा साझाकरण</h2>
        <p className="text-gray-700">
          लर्न2पे केवल सत्यापित भुगतान गेटवे और ऑडिटरों के साथ डेटा साझा करता है, और यह कड़े NDA के तहत होता है। रशीश्वर इंडस्ट्री गोपनीयता और डेटा सुरक्षा समझौतों का पालन सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">डेटा प्रतिधारण नीति</h2>
        <p className="text-gray-700">
          लर्न2पे लेनदेन के बाद तीन वर्षों तक या कानूनी आवश्यकता के अनुसार डेटा रखता है। रशीश्वर इंडस्ट्री अनुपालन और आपदा पुनर्प्राप्ति के लिए एन्क्रिप्टेड बैकअप सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">डेटा संशोधन अधिकार</h2>
        <p className="text-gray-700">
          उपयोगकर्ता सुरक्षित पोर्टल के माध्यम से डेटा देख और संशोधित कर सकते हैं। रशीश्वर इंडस्ट्री अनुरोधों को सत्यापित करता है, जिससे सटीकता और उपयोगकर्ता-केंद्रित नीतियों का पालन होता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">उपयोगकर्ता डेटा पहुँच अधिकार</h2>
        <p className="text-gray-700">
          उपयोगकर्ता भारतीय कानूनों के अनुसार डेटा पहुँच या सीमित मिटाने का अनुरोध कर सकते हैं। रशीश्वर इंडस्ट्री 30 दिनों के भीतर अनुरोधों को संसाधित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">उल्लंघन अधिसूचना प्रोटोकॉल</h2>
        <p className="text-gray-700">
          लर्न2पे DPDP अधिनियम, 2023 के अनुसार 72 घंटों के भीतर उल्लंघनों की सूचना देता है। रशीश्वर इंडस्ट्री सुधारात्मक कार्रवाई और नियामक अनुपालन सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">दायित्व की सीमा</h2>
        <p className="text-gray-700">
          रशीश्वर इंडस्ट्री उपयोगकर्ता की लापरवाही, जैसे कमजोर पासवर्ड, के कारण अनधिकृत पहुँच के लिए उत्तरदायी नहीं है। मुआवजा अनुबंध की शर्तों के अनुसार होगा।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">डेटा बिक्री नीति</h2>
        <p className="text-gray-700">
          लर्न2पे कभी भी उपयोगकर्ता डेटा को बेचता, किराए पर देता या विपणन के लिए उपयोग नहीं करता। रशीश्वर इंडस्ट्री गोपनीयता और नैतिक मानकों का पालन सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">डेटा न्यूनीकरण मानक</h2>
        <p className="text-gray-700">
          लर्न2पे केवल संचालन और अनुपालन के लिए आवश्यक डेटा एकत्र करता है। रशीश्वर इंडस्ट्री जोखिम को कम करता है और नियामक अनुपालन सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">कर्मचारी गोपनीयता प्रशिक्षण</h2>
        <p className="text-gray-700">
          लर्न2पे कर्मचारियों को साइबर सुरक्षा और गोपनीयता प्रशिक्षण देता है। रशीश्वर इंडस्ट्री निरंतर प्रशिक्षण सुनिश्चित करता है, जिससे जोखिम कम होता है और प्लेटफॉर्म की विश्वसनीयता बढ़ती है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">संस्थागत डेटा पृथक्करण</h2>
        <p className="text-gray-700">
          लर्न2पे संस्थागत डेटा को क्रॉस-एक्सेस से बचाने के लिए पृथक करता है। रशीश्वर इंडस्ट्री गोपनीयता और अनुपालन सुनिश्चित करता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">डेटा संरक्षण अधिकारी</h2>
        <p className="text-gray-700">
          लर्न2पे अनुपालन के लिए डेटा संरक्षण अधिकारी नियुक्त करता है। रशीश्वर इंडस्ट्री अधिकारी के माध्यम से शिकायतों का समाधान करता है, जिससे विश्वास और नियामक अनुपालन बना रहता है।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">नीति अद्यतन अधिसूचनाएँ</h2>
        <p className="text-gray-700">
          लर्न2पे नीति परिवर्तनों की सूचना ईमेल, एसएमएस या इन-ऐप अलर्ट के माध्यम से देता है। सूचना के बाद निरंतर उपयोग को स्वीकृति माना जाएगा।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">शासकीय कानून और क्षेत्राधिकार</h2>
        <p className="text-gray-700">
          गोपनीयता मामलों पर भारतीय कानून लागू होगा। विवादों का निपटारा विशेष रूप से ग्वालियर, मध्य प्रदेश की अदालतों के अधिकार क्षेत्र में होगा।
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">सारांश</h2>
        <p className="text-gray-700">
          लर्न2पे की गोपनीयता नीति, रशीश्वर इंडस्ट्री प्राइवेट लिमिटेड द्वारा शासित, डेटा सुरक्षा, पारदर्शिता और उपयोगकर्ता अधिकारों के लिए प्रतिबद्ध है। प्लेटफॉर्म केवल आवश्यक डेटा एकत्र करता है, उसे सुरक्षित रखता है, और उपयोगकर्ताओं को उनके डेटा पर नियंत्रण देता है।
        </p>
      </section>
    </div>
  )
}

const PrivacyPolicy = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={darkMode ? 'dark bg-black text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      {/* Top Bar: Language & Theme Switcher */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, padding: 16 }}>
        <button
          onClick={() => setLanguage('en')}
          style={{
            marginRight: 8,
            fontWeight: language === 'en' ? 'bold' : 'normal',
            textDecoration: language === 'en' ? 'underline' : 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: darkMode ? 'white' : 'black',
          }}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('hi')}
          style={{
            fontWeight: language === 'hi' ? 'bold' : 'normal',
            textDecoration: language === 'hi' ? 'underline' : 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: darkMode ? 'white' : 'black',
          }}
        >
          हिन्दी
        </button>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            marginLeft: 16,
            background: darkMode ? '#222' : '#eee',
            color: darkMode ? 'white' : 'black',
            border: '1px solid',
            borderColor: darkMode ? '#444' : '#ccc',
            borderRadius: 6,
            padding: '4px 12px',
            cursor: 'pointer',
            fontSize: 16,
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? 'Bright Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="px-6 py-12 max-w-6xl mx-auto space-y-10">
        {privacyContent[language]}
      </div>
    </div>
  );
};

export default PrivacyPolicy;