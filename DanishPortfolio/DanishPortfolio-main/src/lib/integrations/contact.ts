import { makeAdapter } from "./types";

export const contactAdapter = makeAdapter({
  provider: "resend",
  displayName: "Resend (email)",
  purpose: "Send email notifications when contact form is submitted.",
  requiredEnv: ["RESEND_API_KEY"],
});
