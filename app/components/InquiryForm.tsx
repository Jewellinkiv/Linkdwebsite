"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const interestOptions = [
  "Payment processing",
  "Receivables and accounts",
  "Repairs and services",
  "Inventory flow and control",
  "Rapid data migration",
  "Sage and QuickBooks",
  "Linkd Ecosystem",
  "Open API or custom integrations",
];

const demoFocusOptions = [
  "Full Linkd system",
  "Payment processing",
  "Receivables management",
  "Services and inventory",
  "Linkd Ecosystem",
  "Migration planning",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const [selected, setSelected] = useState<string[]>([
    "Payment processing",
    "Inventory flow and control",
  ]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const sourcePathRef = useRef<HTMLInputElement>(null);
  const sourceUrlRef = useRef<HTMLInputElement>(null);
  const referrerRef = useRef<HTMLInputElement>(null);

  const statusCopy = useMemo(() => {
    if (submitState === "success") return message || "Your request was sent.";
    if (submitState === "error") return message || "Something went wrong.";
    return "";
  }, [message, submitState]);

  function setSourcePath() {
    if (sourcePathRef.current) {
      sourcePathRef.current.value = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    }
    if (sourceUrlRef.current) {
      sourceUrlRef.current.value = window.location.href;
    }
    if (referrerRef.current) {
      referrerRef.current.value = document.referrer;
    }
  }

  useEffect(() => {
    setSourcePath();
  }, []);

  function toggleInterest(option: string) {
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitState("submitting");
    setMessage("");

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      company: String(data.get("company") || ""),
      locations: String(data.get("locations") || ""),
      currentPos: String(data.get("currentPos") || ""),
      demoFocus: String(data.get("demoFocus") || ""),
      timeline: String(data.get("timeline") || ""),
      preferredContact: String(data.get("preferredContact") || ""),
      notes: String(data.get("notes") || ""),
      website: String(data.get("website") || ""),
      sourcePath: String(data.get("sourcePath") || ""),
      sourceUrl: String(data.get("sourceUrl") || ""),
      referrer: String(data.get("referrer") || ""),
      interests: selected,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send request.");
      }

      form.reset();
      setSourcePath();
      setSelected(["Payment processing", "Inventory flow and control"]);
      setSubmitState("success");
      setMessage(result.message || "Your request was sent.");
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send request. Please try again.",
      );
    }
  }

  return (
    <form
      className="inquiry-form"
      onSubmit={handleSubmit}
      aria-busy={submitState === "submitting"}
      aria-describedby="inquiry-form-intro inquiry-form-status"
    >
      <input
        className="hidden-field"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input name="sourcePath" type="hidden" ref={sourcePathRef} readOnly />
      <input name="sourceUrl" type="hidden" ref={sourceUrlRef} readOnly />
      <input name="referrer" type="hidden" ref={referrerRef} readOnly />
      <div className="form-heading">
        <span>Book a demo</span>
        <h3>Start with the essentials.</h3>
        <p id="inquiry-form-intro">
          We will tailor the demo around your processor, workflows, and migration.
        </p>
      </div>

      <div className="form-grid essential-form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
          />
        </label>
        <label>
          Phone
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label>
          Store or company
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          Locations
          <select name="locations" defaultValue="" required>
            <option value="" disabled>
              Select
            </option>
            <option>1 location</option>
            <option>2-3 locations</option>
            <option>4-9 locations</option>
            <option>10+ locations</option>
          </select>
        </label>
        <label>
          Main focus
          <select name="demoFocus" defaultValue="Full Linkd system">
            {demoFocusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <details className="form-details">
        <summary>Add migration, timeline, or integration details</summary>
        <div className="form-grid">
          <label>
            Current POS
            <input name="currentPos" placeholder="EDGE, Lightspeed, custom, etc." />
          </label>
          <label>
            Timeline
            <select name="timeline" defaultValue="Exploring">
              <option>Exploring</option>
              <option>0-90 days</option>
              <option>3-6 months</option>
              <option>6+ months</option>
            </select>
          </label>
          <label>
            Preferred contact
            <select name="preferredContact" defaultValue="Email">
              <option>Email</option>
              <option>Phone</option>
              <option>Text</option>
            </select>
          </label>
        </div>

        <fieldset>
          <legend>Areas of interest</legend>
          <div className="interest-grid">
            {interestOptions.map((option) => (
              <label className="check-option" key={option}>
                <input
                  name="interests"
                  type="checkbox"
                  value={option}
                  checked={selected.includes(option)}
                  onChange={() => toggleInterest(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          What should we know?
          <textarea
            name="notes"
            rows={4}
            placeholder="Tell us about inventory security, accounting, migration, multi-store needs, or demo timing."
          />
        </label>
      </details>

      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending..." : "Book a Demo"}
      </button>

      <p className="form-consent">
        By submitting, you agree that Linkd may contact you about this request.
        Your information is used to prepare and follow up on the demo.
      </p>

      <p
        className={`form-status ${submitState} ${statusCopy ? "" : "is-empty"}`}
        id="inquiry-form-status"
        role={submitState === "error" ? "alert" : "status"}
        aria-live={submitState === "error" ? "assertive" : "polite"}
      >
        {statusCopy}
      </p>
    </form>
  );
}
