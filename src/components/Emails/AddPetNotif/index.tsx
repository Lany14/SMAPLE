import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface AddPetNotifProps {
  ownerFirstName: string;
  petName: string;
}

export const AddPetNotif: React.FC<AddPetNotifProps> = ({
  ownerFirstName,
  petName,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>Added a New Pet to your Profile</Text>
        <Text style={paragraph}>Dear {ownerFirstName},</Text>
        <Text style={paragraph}>
          We're excited to confirm that your pet has been successfully added to
          your profile "{petName}" at Abys Agrivet Animal Health Clinic.
        </Text>

        <Text style={paragraph}>
          You can now access your pet's profile, schedule appointments, and
          manage their health records through our online portal.
        </Text>

        <Button style={button} href="https://abysagrivet.online/dashboard">
          View Pet Profile
        </Button>

        <Text style={paragraph}>
          If you have any questions about your pet's profile or need assistance,
          our team is here to help. Feel free to contact us at:
        </Text>

        <Text style={paragraph}>
          Phone: (123) 456-7890
          <br />
          Email: support@abysagrivet.online
        </Text>

        <Text style={paragraph}>Best regards,</Text>
        <Text style={paragraph}>Abys Agrivet Animal Health Clinic Team</Text>
      </Container>
    </Body>
  </Html>
);

// Define your styles here
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  padding: "14px 7px",
};

export default AddPetNotif;
