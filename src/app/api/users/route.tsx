// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       include: {
//         petOwnerProfile: true,
//         doctorNurseProfile: true,
//         adminProfile: true,
//         receptionistProfile: true,
//       },
//     });

//     const formattedUsers = users.map((user) => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.isVerified ? "active" : "paused",
//       phone:
//         user.petOwnerProfile?.phoneNumber ||
//         user.doctorNurseProfile?.phoneNumber ||
//         user.adminProfile?.phoneNumber ||
//         user.receptionistProfile?.phoneNumber ||
//         "",
//       avatar: user.image || "",
//     }));

//     return NextResponse.json(formattedUsers);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 },
//     );
//   }
// }
