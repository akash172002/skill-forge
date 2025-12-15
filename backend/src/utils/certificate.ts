import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateCertificate = (
  userName: string,
  projectTitle: string
): Promise<string> => {
  const tmpDir = path.join(process.cwd(), "tmp");

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const certificateId = `SF-${Date.now()}`;
  const filePath = path.join(tmpDir, `certificate-${certificateId}.pdf`);

  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 50,
  });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  /* ========= COLORS ========= */
  const primaryColor = "#1e3a8a"; // navy blue
  const secondaryColor = "#64748b"; // gray

  /* ========= BORDER ========= */
  doc
    .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
    .lineWidth(3)
    .stroke(primaryColor);

  doc
    .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
    .lineWidth(1)
    .stroke(secondaryColor);

  /* ========= TITLE ========= */
  doc.fontSize(36).fillColor(primaryColor).text("Certificate of Completion", {
    align: "center",
    underline: false,
  });

  doc.moveDown(1.5);

  /* ========= SUBTITLE ========= */
  doc
    .fontSize(18)
    .fillColor(secondaryColor)
    .text("This certificate is proudly presented to", {
      align: "center",
    });

  doc.moveDown(1.2);

  /* ========= USER NAME ========= */
  doc.fontSize(32).fillColor("#000000").text(userName, {
    align: "center",
  });

  doc.moveDown(1);

  /* ========= DESCRIPTION ========= */
  doc
    .fontSize(16)
    .fillColor("#000000")
    .text("For successfully completing and submitting the following project:", {
      align: "center",
    });

  doc.moveDown(0.8);

  /* ========= PROJECT TITLE ========= */
  doc
    .font("Helvetica-Oblique")
    .fontSize(22)
    .fillColor(primaryColor)
    .text(projectTitle, {
      align: "center",
    });

  doc.moveDown(2);

  // Reset font
  doc.font("Helvetica");

  /* ========= FOOTER INFO ========= */
  const issueDate = new Date().toLocaleDateString();

  doc
    .fontSize(14)
    .fillColor("#000000")
    .text(`Issued On: ${issueDate}`, 80, doc.page.height - 160);

  doc
    .fontSize(14)
    .text(`Certificate ID: ${certificateId}`, 80, doc.page.height - 130);

  /* ========= SIGNATURES ========= */
  doc
    .moveTo(doc.page.width - 350, doc.page.height - 140)
    .lineTo(doc.page.width - 120, doc.page.height - 140)
    .stroke();

  doc
    .fontSize(14)
    .text("Authorized Signature", doc.page.width - 320, doc.page.height - 120);

  /* ========= PLATFORM NAME ========= */
  doc.fontSize(16).fillColor(primaryColor).text("SkillForge Platform", {
    align: "center",
  });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};
