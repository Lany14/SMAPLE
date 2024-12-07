import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  const policyContent = [
    {
      title: "1. Information We Collect",
      content: (
        <>
          <p>
            We collect information from users, including administrators,
            veterinarians, receptionists, nurses, and pet owners, to provide
            effective services.
          </p>
          <h4 className="mt-2 font-semibold">a. Personal Information</h4>
          <ul className="list-disc pl-5">
            <li>
              Pet Owners: Name, contact details (phone, email), address, pet
              details (name, species, medical history).
            </li>
            <li>
              Clinic Staff: Name, role, email, and work-related credentials.
            </li>
          </ul>
          <h4 className="mt-2 font-semibold">b. Payment Information</h4>
          <p>
            Payment card details and billing addresses (processed securely
            through third-party payment providers).
          </p>
          <h4 className="mt-2 font-semibold">c. Technical Information</h4>
          <p>
            IP addresses, browser types, device information, and login
            activities.
          </p>
          <h4 className="mt-2 font-semibold">d. Usage Data</h4>
          <p>
            Appointment history, communication logs, and browsing activities
            within the Portal.
          </p>
        </>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <ul className="list-disc pl-5">
          <li>
            Providing Services: To manage appointments, store pet medical
            records, and communicate with users.
          </li>
          <li>Payments: To process payments for veterinary services.</li>
          <li>
            System Improvement: To analyze system usage and enhance features.
          </li>
          <li>
            Security: To detect and prevent unauthorized access or fraudulent
            activities.
          </li>
          <li>
            Communication: To send reminders, notifications, and important
            updates via SMS, email, or in-app messages.
          </li>
        </ul>
      ),
    },
    {
      title: "3. How We Share Your Information",
      content: (
        <>
          <p>
            We do not sell your information to third parties. However, we may
            share it as follows:
          </p>
          <h4 className="mt-2 font-semibold">Third-Party Services:</h4>
          <ul className="list-disc pl-5">
            <li>Google Meet for virtual consultations.</li>
            <li>Payment Gateways to process transactions securely.</li>
            <li>SMS/Email Services for reminders and notifications.</li>
          </ul>
          <h4 className="mt-2 font-semibold">Legal Requirements:</h4>
          <p>
            To comply with legal obligations or respond to lawful requests from
            regulatory bodies.
          </p>
        </>
      ),
    },
    {
      title: "4. How We Protect Your Information",
      content: (
        <>
          <p>We employ industry-standard practices to secure your data:</p>
          <ul className="list-disc pl-5">
            <li>
              Encryption: Sensitive data (e.g., passwords, payment details) is
              encrypted in transit and at rest.
            </li>
            <li>
              Access Control: User data access is role-based and restricted to
              authorized personnel only.
            </li>
            <li>
              Regular Audits: We conduct security checks and update our systems
              regularly.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Your Rights",
      content: (
        <>
          <p>
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="list-disc pl-5">
            <li>Access: View the information we hold about you.</li>
            <li>Correction: Request corrections to inaccurate data.</li>
            <li>
              Deletion: Request deletion of your data, subject to legal or
              operational requirements.
            </li>
            <li>
              Consent Withdrawal: Opt-out of certain types of data processing.
            </li>
          </ul>
          <p className="mt-2">
            To exercise these rights, please contact us using the details in
            Section 9.
          </p>
        </>
      ),
    },
    {
      title: "6. Cookies and Tracking",
      content: (
        <>
          <p>The Portal uses cookies to enhance user experience.</p>
          <ul className="list-disc pl-5">
            <li>
              Purpose: Session tracking, analytics, and system performance.
            </li>
            <li>
              Your Choice: You can manage cookie preferences through your
              browser settings.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "7. Data Retention",
      content: (
        <>
          <p>
            We retain your data only as long as necessary for the purposes
            outlined:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Medical Records: Retained for up to [Insert Retention Period]
              after your last interaction, as required by veterinary
              regulations.
            </li>
            <li>Payment Data: Retained per financial record-keeping laws.</li>
            <li>
              Account Data: Deleted upon user request or inactivity for [Insert
              Period].
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "8. Third-Party Services",
      content: (
        <>
          <p>The Portal integrates with the following third-party services:</p>
          <ul className="list-disc pl-5">
            <li>Google Authentication: Secure login using Google accounts.</li>
            <li>Payment Gateways: [Insert Provider Name].</li>
            <li>SMS/Email Services: [Insert Provider Name].</li>
          </ul>
          <p className="mt-2">
            We ensure these providers comply with strict data protection
            standards.
          </p>
        </>
      ),
    },
    {
      title: "9. Policy Updates",
      content: (
        <p>
          We may update this Privacy Policy periodically. Changes will be
          communicated through the Portal and, where appropriate, directly to
          you.
        </p>
      ),
    },
    {
      title: "10. Contact Us",
      content: (
        <>
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your privacy rights, contact us at:
          </p>
          <p className="mt-2">Abyss Agrivet Vet Clinic</p>
          <p>Email: [Insert Email Address]</p>
          <p>Phone: [Insert Phone Number]</p>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-slate-950">
      <h1 className="mb-6 text-3xl font-bold">
        Privacy Policy for Abyss Agrivet Vet Clinic Portal
      </h1>
      <p className="mb-4">Effective Date: December 1, 2024</p>
      <p className="mb-6">
        At Abyss Agrivet Vet Clinic, we prioritize your privacy. This Privacy
        Policy explains how we collect, use, share, and protect your personal
        information when you use our veterinary clinic portal ("the Portal"). By
        using the Portal, you agree to the terms outlined below.
      </p>

      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <Accordion type="single" collapsible className="w-full">
          {policyContent.map((section, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none">{section.content}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
