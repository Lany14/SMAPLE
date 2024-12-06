import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  firstName: string;
  resetLink: string;
}

interface ResetPasswordSuccessEmailProps {
  firstName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ResetPasswordEmail = ({
  firstName,
  resetLink,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password for Abys Agrivet</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={`${baseUrl}/static/logo.png`} width="32" height="32" />
        <Text style={title}>Reset Your Password</Text>
        <Section style={section}>
          <Text style={text}>
            Hey <strong>{firstName}</strong>!
          </Text>
          <Text style={text}>
            Someone requested a password reset for your account. If this wasn't
            you, please ignore this email.
          </Text>
          <Button style={button} href={resetLink}>
            Reset Password
          </Button>
          <Text style={text}>
            This link will expire in 1 hour for security reasons.
          </Text>
        </Section>
        <Text style={footer}>© Abys Agrivet {new Date().getFullYear()}</Text>
      </Container>
    </Body>
  </Html>
);

export const ResetPasswordSuccessEmail = ({
  firstName,
}: ResetPasswordSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Password reset successful</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={`${baseUrl}/static/logo.png`} width="32" height="32" />
        <Text style={title}>Password reset successful</Text>
        <Section style={section}>
          <Text style={text}>
            Hey <strong>{firstName}</strong>!
          </Text>
          <Text style={text}>Your password has been successfully reset.</Text>
        </Section>
        <Text style={footer}>© Abys Agrivet {new Date().getFullYear()}</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  margin: "0 auto",
  padding: "20px",
  width: "100%",
  maxWidth: "580px",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  color: "#1a1a1a",
};

const section = {
  padding: "20px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
};

const button = {
  backgroundColor: "#007bff",
  borderRadius: "5px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  marginBottom: "20px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginTop: "30px",
  textAlign: "center" as const,
};
