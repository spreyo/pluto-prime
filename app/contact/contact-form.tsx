"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Dictionary } from "@/dictionaries";
import type { ContactFormState, ContactFormStatusCode } from "./contact-status";

type ContactFormProps = {
  form: Dictionary["contact"]["form"];
  inputClassName: string;
};

const countryOptions = [
  { country: "Netherlands", region: "NL", prefix: "+31" },
  { country: "Slovakia", region: "SK", prefix: "+421" },
  { country: "Czech Republic", region: "CZ", prefix: "+420" },
  { country: "Germany", region: "DE", prefix: "+49" },
  { country: "Belgium", region: "BE", prefix: "+32" },
  { country: "France", region: "FR", prefix: "+33" },
  { country: "Spain", region: "ES", prefix: "+34" },
  { country: "Austria", region: "AT", prefix: "+43" },
  { country: "United Kingdom", region: "GB", prefix: "+44" },
  { country: "United States", region: "US", prefix: "+1" },
] as const;

const initialState: ContactFormState = {
  ok: false,
  code: "idle",
};

function getDetectedPrefix() {
  if (typeof navigator === "undefined") {
    return "+31";
  }

  const locale = navigator.languages?.[0] || navigator.language;
  const region =
    typeof Intl !== "undefined" && "Locale" in Intl
      ? new Intl.Locale(locale).region
      : locale.split("-")[1];

  return (
    countryOptions.find((option) => option.region === region)?.prefix || "+31"
  );
}

function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  const groups = [];

  for (let index = 0; index < digits.length; index += 3) {
    groups.push(digits.slice(index, index + 3));
  }

  return groups.join(" ");
}

export function ContactForm({ form, inputClassName }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<ContactFormState>(initialState);
  const [phonePrefix, setPhonePrefix] = useState("+31");
  const [detectedPhonePrefix, setDetectedPhonePrefix] = useState("+31");
  const [hasEditedPhonePrefix, setHasEditedPhonePrefix] = useState(false);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientErrorCode, setClientErrorCode] =
    useState<ContactFormStatusCode>("idle");
  const contactEndpoint =
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
  const statusMessage =
    clientErrorCode !== "idle"
      ? form.status[clientErrorCode]
      : state.code !== "idle"
        ? form.status[state.code]
        : "";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const detectedPrefix = getDetectedPrefix();

      setDetectedPhonePrefix(detectedPrefix);
      setPhonePrefix(detectedPrefix);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setClientErrorCode("idle");
    setState(initialState);

    try {
      const currentForm = event.currentTarget;
      const formData = new FormData(currentForm);
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      } else{
        console.log("success")
      }

      const result = (await response.json()) as ContactFormState;

      setState(result);
    } catch {
      setClientErrorCode("submitFailed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form
        ref={formRef}
        className="space-y-4"
        id="formular"
        onSubmit={handleSubmit}
      >
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="company">Firma</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
          >
            {form.firstName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={form.firstNamePlaceholder}
            required
            maxLength={80}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
          >
            {form.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={form.lastNamePlaceholder}
            maxLength={80}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
          >
            {form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            required
            maxLength={254}
            className={inputClassName}
          />
        </div>

        <div>
          <p className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]">
            {form.phone}
          </p>
          <div className="mt-1.5 grid grid-cols-[8.5rem_1fr] gap-3">
            <div>
              <label htmlFor="phonePrefix" className="sr-only">
                Predvoľba
              </label>
              <input
                id="phonePrefix"
                name="phonePrefix"
                type="tel"
                autoComplete="tel-country-code"
                value={phonePrefix}
                required
                maxLength={5}
                pattern="^\+\d{1,4}$"
                aria-label="Telefónna predvoľba"
                className={`${inputClassName} mt-0 text-center`}
                onFocus={() => {
                  if (
                    !hasEditedPhonePrefix &&
                    phonePrefix === detectedPhonePrefix
                  ) {
                    setPhonePrefix("");
                  }
                }}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/[^\d+]/g, "")
                    .replace(/(?!^)\+/g, "")
                    .slice(0, 5);

                  setHasEditedPhonePrefix(true);
                  setPhonePrefix(
                    value ? (value.startsWith("+") ? value : `+${value}`) : "",
                  );
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Telefónne číslo
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                value={phone}
                placeholder={form.phonePlaceholder}
                required
                minLength={5}
                maxLength={24}
                pattern="^[\d\s().-]{5,24}$"
                aria-label="Telefónne číslo bez predvoľby"
                className={`${inputClassName} mt-0`}
                onChange={(event) =>
                  setPhone(formatPhoneNumber(event.target.value))
                }
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-extrabold tracking-[0.08em] text-[#ECC560]"
          >
            {form.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={form.messagePlaceholder}
            required
            minLength={10}
            maxLength={2000}
            className={`${inputClassName} min-h-32 resize-y py-3`}
          />
        </div>

        {statusMessage ? (
          <p
            className={`text-center text-sm font-bold ${
              clientErrorCode === "idle" && state.ok
                ? "text-[#ECC560]"
                : "text-red-300"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-md bg-[linear-gradient(135deg,#ECC560_0%,#FFD76A_100%)] px-7 text-base font-black uppercase tracking-[0.14em] text-black shadow-[0_8px_10px_rgba(0,0,0,.3)] transition hover:brightness-105 active:scale-[.99] disabled:cursor-not-allowed disabled:bg-none disabled:bg-[#6b6b6b] disabled:text-black/60 disabled:shadow-none disabled:hover:brightness-100 disabled:active:scale-100"
        >
          {form.submit}
        </button>
      </form>
    </>
  );
}
