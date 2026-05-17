export type ContactFormStatusCode =
  | "idle"
  | "success"
  | "ipRateLimited"
  | "validationFailed"
  | "emailPhoneRateLimited"
  | "submitFailed";

export type ContactFormState = {
  ok: boolean;
  code: ContactFormStatusCode;
};
