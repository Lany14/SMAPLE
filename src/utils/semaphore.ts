// import prisma from "@/lib/prisma";

interface SemaphoreMessage {
  apikey: string;
  number: string;
  message: string;
  sendername?: string;
}

interface SemaphoreResponse {
  message_id: string;
  user_id: string;
  user: string;
  account_id: string;
  account: string;
  recipient: string;
  message: string;
  sender_name: string;
  network: string;
  status: string;
  type: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export async function sendSMS({
  apikey,
  number,
  message,
  sendername = "ABYS AGRIVET",
}: SemaphoreMessage) {
  try {
    const response = await fetch("https://api.semaphore.co/api/v4/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apikey,
        number,
        message,
        sendername,
      }),
    });

    const data: SemaphoreResponse = await response.json();

    // // Store SMS notification in database
    // await prisma.sMSNotification.create({
    //   data: {
    //     messageId: data.message_id,
    //     userId: data.user_id,
    //     userEmail: data.user,
    //     recipient: data.recipient,
    //     message: data.message,
    //     sender_name: data.sender_name,
    //     network: data.network,
    //     status: data.status,
    //     type: data.type,
    //     source: data.source,
    //   },
    // });

    console.log("SMS sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}
