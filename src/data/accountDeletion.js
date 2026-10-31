export const DELETION_SUPPORT_EMAIL = "support@crittrapp.com";
export const DELETION_REQUEST_SUBJECT = "Crittr account and data deletion request";

const requestBody = [
  "Hello Crittr support,",
  "",
  "I would like to request deletion of my Crittr account and associated data.",
  "",
  "Account email address: [enter the email address used for your Crittr account]",
  "",
  "Please let me know what is needed to verify that I own this account.",
  "",
  "Thank you.",
].join("\n");

export const DELETION_REQUEST_HREF = `mailto:${DELETION_SUPPORT_EMAIL}?subject=${encodeURIComponent(DELETION_REQUEST_SUBJECT)}&body=${encodeURIComponent(requestBody)}`;
