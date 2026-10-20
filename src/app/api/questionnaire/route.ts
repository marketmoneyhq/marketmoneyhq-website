import { NextResponse } from "next/server";
import { sendQuestionnaireEmail } from "@/lib/email";

export const runtime = "nodejs";

type Body = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  helpWith?: string;
  why?: string;
  readyToday?: string;
};

function clean(value?: string) {
  return value?.trim() || "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const firstName = clean(body.firstName);
    const lastName = clean(body.lastName);
    const phone = clean(body.phone);
    const email = clean(body.email).toLowerCase();
    const helpWith = clean(body.helpWith);
    const why = clean(body.why);
    const readyToday = clean(body.readyToday);

    if (firstName.length < 1 || lastName.length < 1) {
      return NextResponse.json(
        { error: "First and last name are required." },
        { status: 400 }
      );
    }
    if (phone.length < 7) {
      return NextResponse.json(
        { error: "A valid phone number is required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }
    if (helpWith.length < 2) {
      return NextResponse.json(
        { error: "Please tell us what you need help with." },
        { status: 400 }
      );
    }
    if (why.length < 2) {
      return NextResponse.json(
        { error: 'Please share your "WHY".' },
        { status: 400 }
      );
    }
    if (readyToday !== "Yes" && readyToday !== "No") {
      return NextResponse.json(
        { error: "Please choose Yes or No for getting started today." },
        { status: 400 }
      );
    }

    const emailResult = await sendQuestionnaireEmail({
      firstName,
      lastName,
      phone,
      email,
      helpWith,
      why,
      readyToday,
    });

    if (!emailResult.sent) {
      return NextResponse.json(
        {
          error:
            `We couldn't send your answers right now.\n\n${emailResult.reason}`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      emailProvider: emailResult.provider,
    });
  } catch (error) {
    console.error("Questionnaire submit failed:", error);
    return NextResponse.json(
      { error: "Unable to submit the questionnaire. Please try again." },
      { status: 500 }
    );
  }
}
