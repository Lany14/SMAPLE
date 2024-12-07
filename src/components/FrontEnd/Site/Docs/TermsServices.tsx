import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsOfService() {
  const termsContent = [
    {
      title: "1. Introduction",
      content: (
        <>
          <p>
            These Terms constitute a binding legal agreement between you and
            Abyss Agrivet Vet Clinic. They apply to all users, including:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              Clinic Staff: Admins, Veterinarians, Nurses, and Receptionists.
            </li>
            <li>
              Pet Owners: Individuals managing their pet records or accessing
              clinic services.
            </li>
          </ul>
          <p className="mt-2">
            If you do not agree to these Terms, please refrain from using the
            Portal.
          </p>
        </>
      ),
    },
    {
      title: "2. Eligibility",
      content: (
        <>
          <p>To use the Portal, you must:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              Be at least 18 years old, or if under 18, use the Portal with the
              consent of a parent or guardian.
            </li>
            <li>
              If a clinic staff member, be authorized to access the Portal by
              Abyss Agrivet Vet Clinic.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Account Responsibilities",
      content: (
        <ul className="list-disc pl-5">
          <li>
            <strong>Registration:</strong> You are responsible for providing
            accurate and up-to-date information when creating your account.
          </li>
          <li>
            <strong>Confidentiality:</strong> You must keep your login
            credentials secure.
          </li>
          <li>
            <strong>Unauthorized Access:</strong> Notify us immediately if you
            suspect unauthorized access to your account.
          </li>
          <li>
            <strong>Liability:</strong> You are responsible for all activities
            conducted under your account.
          </li>
        </ul>
      ),
    },
    {
      title: "4. Permitted Use of the Portal",
      content: (
        <>
          <p>You may use the Portal for the following purposes:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Scheduling appointments and consultations.</li>
            <li>Accessing pet medical records.</li>
            <li>Processing payments for services.</li>
            <li>Communicating with clinic staff.</li>
          </ul>
          <p className="mt-2">
            <strong>Prohibited Activities:</strong>
          </p>
          <p>You may not:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Use the Portal for illegal or harmful purposes.</li>
            <li>Attempt to hack, damage, or disrupt the system.</li>
            <li>Upload malware, viruses, or harmful code.</li>
            <li>Misuse personal or medical data belonging to others.</li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Content Ownership",
      content: (
        <>
          <p>
            <strong>User-Generated Content:</strong> Any pet-related records or
            data you upload remains your property. By uploading, you grant us
            permission to use this data solely for providing services.
          </p>
          <p className="mt-2">
            <strong>System Content:</strong> All system features, software, and
            designs are the intellectual property of Abyss Agrivet Vet Clinic.
            Unauthorized use is strictly prohibited.
          </p>
        </>
      ),
    },
    {
      title: "6. Service Availability",
      content: (
        <p>
          We strive to provide uninterrupted service but do not guarantee the
          Portal will always be operational. We may temporarily suspend services
          for maintenance, updates, or unforeseen technical issues.
        </p>
      ),
    },
    {
      title: "7. Fees and Payments",
      content: (
        <>
          <p>
            Payments for veterinary services are processed through third-party
            providers (Xendit). By using the Portal, you agree to their terms.
          </p>
          <p className="mt-2">
            Fees are non-refundable except as required by law or stated in our
            refund policy.
          </p>
        </>
      ),
    },
    {
      title: "8. Third-Party Integrations",
      content: (
        <>
          <p>
            The Portal integrates with third-party services to enhance
            functionality, including:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Google Meet: For virtual consultations.</li>
            <li>Payment Gateways: For secure payment processing.</li>
            <li>SMS and Email Services: For notifications and reminders.</li>
          </ul>
          <p className="mt-2">
            These services are governed by their own terms and privacy policies,
            and we are not responsible for their actions.
          </p>
        </>
      ),
    },
    {
      title: "9. Privacy and Data Handling",
      content: (
        <p>
          Your use of the Portal is subject to our Privacy Policy, which
          outlines how we collect, use, and protect your data. By using the
          Portal, you consent to these practices.
        </p>
      ),
    },
    {
      title: "10. Disclaimers and Limitation of Liability",
      content: (
        <>
          <p>
            <strong>No Warranty:</strong> The Portal is provided "as is" without
            warranties of any kind, express or implied.
          </p>
          <p className="mt-2">
            <strong>Limited Liability:</strong> To the maximum extent permitted
            by law, we are not liable for damages resulting from your use of the
            Portal, including:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>System downtime or errors.</li>
            <li>Unauthorized access due to user negligence.</li>
            <li>Loss of data beyond our reasonable control.</li>
          </ul>
        </>
      ),
    },
    {
      title: "11. Termination of Access",
      content: (
        <>
          <p>
            We reserve the right to terminate or suspend your account if you
            violate these Terms or misuse the Portal. Upon termination:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>You lose access to the Portal and its services.</li>
            <li>Any outstanding payments remain due.</li>
          </ul>
        </>
      ),
    },
    {
      title: "12. Modifications to Terms",
      content: (
        <p>
          We may revise these Terms at any time. Users will be notified of
          changes via email or system notifications. Continued use of the Portal
          after updates constitutes acceptance of the revised Terms.
        </p>
      ),
    },
    {
      title: "13. Governing Law and Dispute Resolution",
      content: (
        <>
          <p>
            These Terms are governed by the laws of [Insert Jurisdiction]. Any
            disputes will be resolved through:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              <strong>Mediation:</strong> As a first step to resolve disputes
              amicably.
            </li>
            <li>
              <strong>Arbitration:</strong> If mediation fails, disputes will be
              settled through binding arbitration.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "14. Contact Information",
      content: (
        <>
          <p>For questions or concerns about these Terms, please contact us:</p>
          <p className="mt-2">Abyss Agrivet Vet Clinic</p>
          <p>Email: [Insert Email Address]</p>
          <p>Phone: [Insert Phone Number]</p>
          <p>Address: [Insert Physical Address]</p>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-slate-950">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Terms of Service for Abyss Agrivet Vet Clinic Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">Effective Date: December 1, 2024</p>
          <p className="mb-6">
            Welcome to the Abyss Agrivet Vet Clinic Portal ("the Portal"). These
            Terms of Service ("Terms") govern your use of the Portal operated by
            Abyss Agrivet Vet Clinic ("we," "us," or "our"). By accessing or
            using the Portal, you agree to comply with these Terms.
          </p>

          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <Accordion type="single" collapsible>
              {termsContent.map((section, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose max-w-none">{section.content}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
