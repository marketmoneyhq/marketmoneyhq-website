import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/metadata";
import { buildSignedDisclosurePdf } from "@/lib/signed-pdf";
import { sendSignedAgreementEmails } from "@/lib/email";

export const runtime = "nodejs";

type SignBody = {
  fullName?: string;
  email?: string;
  date?: string;
  signatureDataUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignBody;
    const fullName = body.fullName?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const date = body.date?.trim() || "";
    const signatureDataUrl = body.signatureDataUrl || "";

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ error: "Date is required." }, { status: 400 });
    }
    if (!signatureDataUrl.startsWith("data:image/png;base64,")) {
      return NextResponse.json(
        { error: "A signature is required. Draw one or adopt a typed signature." },
        { status: 400 }
      );
    }

    const signedAt = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const pdfBuffer = await buildSignedDisclosurePdf({
      fullName,
      email,
      signedAt,
      signatureDataUrl,
    });

    const emailResult = await sendSignedAgreementEmails({
      fullName,
      email,
      pdfBuffer,
      signedAt,
    });

    if (!emailResult.sent) {
      return NextResponse.json(
        {
          error:
            `Signed copies could not be emailed, so payment was not started.\n\n${emailResult.reason}\n\n` +
            "Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local, then restart the server.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      redirectUrl: siteConfig.stripePaymentUrl,
      emailProvider: emailResult.provider,
    });
  } catch (error) {
    console.error("Agreement signing failed:", error);
    return NextResponse.json(
      { error: "Unable to process the signed agreement. Please try again." },
      { status: 500 }
    );
  }
}
