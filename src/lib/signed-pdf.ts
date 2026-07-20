import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";

export async function buildSignedDisclosurePdf({
  fullName,
  email,
  signedAt,
  signatureDataUrl,
}: {
  fullName: string;
  email: string;
  signedAt: string;
  signatureDataUrl: string;
}) {
  const pdfPath = path.join(
    process.cwd(),
    "public",
    "agreements",
    "trading-disclosure.pdf"
  );
  const existing = await readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(existing);
  const page = pdfDoc.getPages()[0];
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pngBase64 = signatureDataUrl.replace(/^data:image\/png;base64,/, "");
  const signatureImage = await pdfDoc.embedPng(
    Buffer.from(pngBase64, "base64")
  );

  const bodySize = 10;
  const left = 78;
  const maxLineWidth = 440;

  // Measured from the source A4 PDF text layer:
  // intro line y≈659.89, Printed Name y≈167.89, Signature y≈137.89, Date y≈107.89

  // --- Replace "[Your Full Name]" in opening sentence ---
  const introY = 659.89;
  page.drawRectangle({
    x: left - 2,
    y: introY - 4,
    width: maxLineWidth + 12,
    height: 16,
    color: rgb(1, 1, 1),
    borderWidth: 0,
  });

  const introPrefix = "I, ";
  const introSuffix =
    ", hereby acknowledge and agree to the following terms and conditions related to";
  let introSize = bodySize;
  const introLine = `${introPrefix}${fullName}${introSuffix}`;

  while (
    font.widthOfTextAtSize(introLine, introSize) > maxLineWidth &&
    introSize > 8
  ) {
    introSize -= 0.25;
  }

  if (font.widthOfTextAtSize(introLine, introSize) > maxLineWidth) {
    page.drawText(`${introPrefix}${fullName},`, {
      x: left,
      y: introY,
      size: bodySize,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
    page.drawRectangle({
      x: left - 2,
      y: 647.89 - 4,
      width: maxLineWidth + 12,
      height: 16,
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });
    page.drawText(
      "hereby acknowledge and agree to the following terms and conditions related to",
      {
        x: left,
        y: 647.89,
        size: bodySize,
        font,
        color: rgb(0.05, 0.05, 0.05),
      }
    );
  } else {
    page.drawText(introLine, {
      x: left,
      y: introY,
      size: introSize,
      font,
      color: rgb(0.05, 0.05, 0.05),
    });
  }

  // --- Printed Name on underline ---
  const printedLabelWidth = font.widthOfTextAtSize("Printed Name: ", bodySize);
  const printedNameX = left + printedLabelWidth + 4; // ≈148
  const printedNameY = 165.5;

  page.drawRectangle({
    x: printedNameX - 2,
    y: printedNameY - 3,
    width: 220,
    height: 15,
    color: rgb(1, 1, 1),
    borderWidth: 0,
  });
  page.drawText(fullName, {
    x: printedNameX,
    y: printedNameY,
    size: 11,
    font: bold,
    color: rgb(0.05, 0.05, 0.05),
  });

  // --- Signature image on underline ---
  const signatureLabelWidth = font.widthOfTextAtSize("Signature: ", bodySize);
  const signatureX = left + signatureLabelWidth + 6; // ≈145
  const signatureMaxWidth = 230;
  const signatureMaxHeight = 30;
  const scale = Math.min(
    signatureMaxWidth / signatureImage.width,
    signatureMaxHeight / signatureImage.height
  );
  const signatureWidth = signatureImage.width * scale;
  const signatureHeight = signatureImage.height * scale;
  // Sit the image on the Signature underline (label baseline ≈137.89)
  const signatureY = 128;

  page.drawRectangle({
    x: signatureX - 2,
    y: 122,
    width: signatureMaxWidth + 6,
    height: 28,
    color: rgb(1, 1, 1),
    borderWidth: 0,
  });
  page.drawImage(signatureImage, {
    x: signatureX,
    y: signatureY,
    width: signatureWidth,
    height: signatureHeight,
  });

  // --- Date on underline ---
  const dateLabelWidth = font.widthOfTextAtSize("Date: ", bodySize);
  const dateX = left + dateLabelWidth + 4; // ≈108
  const dateY = 105.5;

  page.drawRectangle({
    x: dateX - 2,
    y: dateY - 3,
    width: 230,
    height: 15,
    color: rgb(1, 1, 1),
    borderWidth: 0,
  });
  page.drawText(signedAt, {
    x: dateX,
    y: dateY,
    size: 10,
    font,
    color: rgb(0.05, 0.05, 0.05),
  });

  // Footer well below Date line
  page.drawText(`Email: ${email}`, {
    x: left,
    y: 52,
    size: 8,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });
  page.drawText("Electronically signed via Market Money HQ", {
    x: left,
    y: 38,
    size: 8,
    font,
    color: rgb(0.35, 0.35, 0.35),
  });
  // keep right side clear / optional second stamp
  page.drawText("Signed copy", {
    x: Math.max(left, width - 100),
    y: 38,
    size: 8,
    font,
    color: rgb(0.45, 0.45, 0.45),
  });

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
