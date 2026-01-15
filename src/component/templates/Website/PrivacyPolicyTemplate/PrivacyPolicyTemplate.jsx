"use client";
import classes from "./PrivacyPolicyTemplate.module.css";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import TopHeader from "@/component/atoms/TopHeader";
import { Container } from "react-bootstrap";
import Parser from "html-react-parser";

const PrivacyPolicyTemplate = () => {
  const data = {
    htmlDescription: `
      <p><strong>Last updated: October 2025</strong></p>
      
      <p>Tap2SOS ("we", "our", "us") is a digital emergency identification service operated by NewCo, based in Greece. We are committed to protecting your personal data and ensuring transparency about how it is collected, stored, and used. This Privacy Policy describes how we handle your personal information in compliance with the General Data Protection Regulation (EU) 2016/679 (GDPR) and other applicable EU and national data protection laws.</p>

      <h3>1. Who we are</h3>
      <p><strong>Data Controller:</strong></p>
      <ul>
        <li>NewCo (owner of Tap2SOS)</li>
        <li>Registered Office: Athens, Greece</li>
        <li>Email: privacy@tap2sos.com</li>
      </ul>
      <p>If you have any questions about this policy or how we handle your data, please contact our Data Protection Officer (DPO) at privacy@tap2sos.com.</p>

      <h3>2. What we collect</h3>
      <p>Depending on how you use Tap2SOS, we may process the following types of data:</p>

      <p><strong>a) Account information</strong></p>
      <ul>
        <li>Name and surname (optional pseudonym accepted)</li>
        <li>Email address and password</li>
        <li>Preferred language and country</li>
        <li>Consent and communication preferences</li>
      </ul>

      <p><strong>b) Medical and emergency data (optional, user-generated)</strong></p>
      <p>You can choose to store the following information to be displayed during an emergency scan:</p>
      <ul>
        <li>Medical conditions and allergies</li>
        <li>Current medications and treatments</li>
        <li>Blood type</li>
        <li>Emergency contacts (ICE)</li>
        <li>Doctor or healthcare provider details</li>
        <li>Insurance or policy notes</li>
        <li>Any other details you choose to share voluntarily</li>
      </ul>
      <p>This information is entered and managed solely by you. You can edit or delete it at any time.</p>

      <p><strong>c) Technical and device data</strong></p>
      <ul>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Device model (mobile/desktop)</li>
        <li>IP address (anonymised)</li>
        <li>Access timestamps and error logs</li>
      </ul>
      <p>These are collected automatically for platform performance and security.</p>

      <h3>3. Purpose and legal basis of processing</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <th style=" padding: 12px; text-align: left;">Purpose</th>
          <th style=" padding: 12px; text-align: left;">Legal Basis</th>
        </tr>
        <tr>
          <td style="padding: 12px;">To create and manage your Tap2SOS account</td>
          <td style="padding: 12px;">Performance of contract (Art. 6(1)(b))</td>
        </tr>
        <tr>
          <td style="padding: 12px;">To display your medical profile when you are scanned</td>
          <td style="padding: 12px;">Explicit consent (Art. 6(1)(a), Art. 9(2)(a))</td>
        </tr>
        <tr>
          <td style="padding: 12px;">To improve service functionality and security</td>
          <td style="padding: 12px;">Legitimate interest (Art. 6(1)(f))</td>
        </tr>
        <tr>
          <td style="padding: 12px;">To comply with legal or regulatory obligations</td>
          <td style="padding: 12px;">Legal obligation (Art. 6(1)(c))</td>
        </tr>
      </table>
      <p>You can withdraw your consent at any time by logging into your profile or emailing privacy@tap2sos.com.</p>

      <h3>4. Data security and infrastructure</h3>
      <p>We take security seriously. Tap2SOS applies:</p>
      <ul>
        <li>End-to-end encryption (TLS 1.3 in transit, AES-256 at rest)</li>
        <li>Role-based access controls for internal staff</li>
        <li>Data minimisation — only the fields you choose to share are stored</li>
        <li>Blockchain anchoring (optional) — for audit trails and data integrity. The blockchain record contains only hashes (non-identifiable metadata), never personal data.</li>
      </ul>
      <p>Our servers are hosted within the European Economic Area (EEA) in GDPR-compliant facilities.</p>

      <h3>5. Data sharing and third-party processors</h3>
      <p>We do not sell, trade, or rent your personal data. We only share data with selected processors that support our service under strict contractual terms (Data Processing Agreements – DPAs). These may include:</p>
      <ul>
        <li>Cloud infrastructure and database hosting providers</li>
        <li>Customer support and ticketing platforms</li>
        <li>Email or notification service providers</li>
      </ul>
      <p>All processors act solely under our instructions and comply with GDPR requirements.</p>

      <h3>6. International transfers</h3>
      <p>If data is ever transferred outside the EEA (for example, through global hosting services), we ensure that appropriate safeguards are in place, such as:</p>
      <ul>
        <li>The European Commission's Standard Contractual Clauses (SCCs), or</li>
        <li>Transfers to countries with an adequacy decision.</li>
      </ul>

      <h3>7. Data retention</h3>
      <p>Your account and medical profile remain active until you delete them. Once deleted:</p>
      <ul>
        <li>Account data is permanently removed from our systems within 30 days</li>
        <li>Backups are securely purged within 90 days</li>
        <li>Blockchain metadata remains non-personal and irreversible</li>
      </ul>

      <h3>8. Your rights under GDPR</h3>
      <p>You have the following rights:</p>
      <ul>
        <li><strong>Access</strong> – to request a copy of your personal data.</li>
        <li><strong>Rectification</strong> – to correct inaccuracies.</li>
        <li><strong>Erasure ("Right to be Forgotten")</strong> – to delete your data permanently.</li>
        <li><strong>Restriction</strong> – to limit processing under certain conditions.</li>
        <li><strong>Portability</strong> – to receive your data in a structured, machine-readable format.</li>
        <li><strong>Objection</strong> – to processing based on legitimate interests.</li>
        <li><strong>Withdraw consent</strong> – at any time, without affecting prior lawful processing.</li>
      </ul>
      <p>To exercise any right, email privacy@tap2sos.com. We will respond within 30 days of your verified request.</p>

      <h3>9. Cookies and analytics</h3>
      <p>Tap2SOS uses minimal cookies required for:</p>
      <ul>
        <li>Authentication sessions</li>
        <li>Security validation</li>
        <li>Language preference</li>
      </ul>
      <p>We do not use advertising, marketing, or profiling cookies. Anonymous analytics may be collected to improve usability.</p>

      <h3>10. Children's data</h3>
      <p>Tap2SOS is not directed at children under 16. Parents or legal guardians must provide consent before a child's data is registered.</p>

      <h3>11. Updates to this policy</h3>
      <p>We may revise this Privacy Policy from time to time to reflect legal, technical, or operational changes. If we make material changes, you will be notified via email or a banner on our website. The "Last updated" date will always indicate the current version.</p>

      <h3>12. Complaints and supervisory authority</h3>
      <p>If you believe your data has been processed unlawfully, you may lodge a complaint with your national Data Protection Authority. For Greece, the competent authority is:</p>
      <ul>
        <li><strong>Hellenic Data Protection Authority (HDPA)</strong></li>
        <li>Website: www.dpa.gr</li>
        <li>Email: complaints@dpa.gr</li>
      </ul>
      <p>We would, however, appreciate the chance to resolve your concerns directly at privacy@tap2sos.com before you contact the authority.</p>

      <h3>Summary</h3>
      <p>Tap2SOS gives you full control over your medical and emergency data — securely stored, instantly accessible, and always compliant with European privacy law.</p>
      <p><strong>Tap2SOS — Because every second counts.</strong></p>
    `,
  }
  return (
    <LayoutWrapper>
      <TopHeader />
      <Container>
        <div className={classes.privacyContainer}>
          <div className={classes.quillContent}> 
            {data?.htmlDescription && Parser(data?.htmlDescription)}
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default PrivacyPolicyTemplate;