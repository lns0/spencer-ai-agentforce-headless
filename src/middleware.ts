// import { NextRequest, NextResponse } from "next/server";

// const USERNAME: string = process.env.BASIC_AUTH_USERNAME ?? "";
// const PASSWORD: string = process.env.BASIC_AUTH_PASSWORD ?? "";

// export function middleware(req: NextRequest) {
//   if (!USERNAME || !PASSWORD) {
//     return NextResponse.json(
//       { error: "Basic Auth Error" },
//       {
//         headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
//         status: 401,
//       }
//     );
//   }
//   const basicAuth = req.headers.get("authorization");
//   if (basicAuth) {
//     const authValue = basicAuth.split(" ")[1];
//     const [username, password] = Buffer.from(authValue, "base64")
//       .toString()
//       .split(":");
//     if (username === USERNAME && password === PASSWORD) {
//       return NextResponse.next();
//     }
//   }
//   return NextResponse.json(
//     { error: "Basic Auth Error" },
//     {
//       headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
//       status: 401,
//     }
//   );
// }
