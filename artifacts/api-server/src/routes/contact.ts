import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const parsed = SubmitContactBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed: " + parsed.error.message });
      return;
    }

    const { name, email, message } = parsed.data;
    const contactEmail = process.env.CONTACT_EMAIL || "admin@nurturethespectrum.com";

    // Log the contact form submission (in production, send an email)
    req.log.info({ name, email, contactEmail }, "Contact form submission received");

    // In production, integrate with an email service here
    // For now, we log it and return success

    res.json({
      success: true,
      message: "Thank you for your message. We will get back to you within 1-2 business days.",
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact form");
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

export default router;
