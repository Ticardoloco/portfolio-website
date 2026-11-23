// import { adminAuth, adminDb } from "./firebaseAdmin";


// export async function verifyAdminToken(request: Request) {
//   const authHeader = request.headers.get("authorization");
//   console.log("1. Auth Header received:", authHeader ? "Yes (starts with Bearer)" : "MISSING!");

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return false;
//   }

//   const token = authHeader.split("Bearer ")[1];

//   try {
//     const decodedToken = await adminAuth.verifyIdToken(token);
//     console.log("2. Token verified! UID:", decodedToken.uid);

//     // Check if UID exists in admins collection
//     const adminDoc = await adminDb.collection("admins").doc(decodedToken.uid).get();
//     console.log("3. Is user in 'admins' collection?", adminDoc.exists);

//     return adminDoc.exists;
//   } catch (error) {
//     console.error("VERIFICATION ERROR:", error);
//     return false;
//   }
// }

import { cookies } from "next/headers";
import { adminAuth, adminDb } from "./firebaseAdmin";

const SESSION_COOKIE_NAME = "__session";

async function isUidInAdminsCollection(uid: string): Promise<boolean> {
  const adminDoc = await adminDb.collection("admins").doc(uid).get();
  console.log("3. Is user in 'admins' collection?", adminDoc.exists);
  return adminDoc.exists;
}

export async function verifyAdminToken(request?: Request): Promise<boolean> {
  try {
    // 1. Check Authorization: Bearer <idToken> header first
    const authHeader = request?.headers.get("authorization");
    console.log(
      "1. Auth Header received:",
      authHeader ? "Yes (starts with Bearer)" : "MISSING!"
    );

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7).trim();
      if (!token) {
        return false;
      }

      const decodedToken = await adminAuth.verifyIdToken(token);
      console.log("2. ID Token verified! UID:", decodedToken.uid);
      return await isUidInAdminsCollection(decodedToken.uid);
    }

    // 2. Fallback to HttpOnly __session cookie if no Bearer header was sent
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      return false;
    }

    const decodedSession = await adminAuth.verifySessionCookie(sessionCookie, true);
    console.log("2. Session cookie verified! UID:", decodedSession.uid);
    return await isUidInAdminsCollection(decodedSession.uid);
  } catch (error) {
    console.error("VERIFICATION ERROR:", error);
    return false;
  }
}