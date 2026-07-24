"use client";

import { FormEvent, useMemo, useState } from "react";

const interestOptions = [
  "POS and checkout",
  "Inventory and RFID security",
  "House accounts and aging",
  "Layaway and financing",
  "Multi-store transfers",
  "Accounting integrations",
  "Shopify and e-commerce",
  "JewelLink CRM",
  "CountRetail camera intelligence",
  "Open API or custom integrations",
];

const demoFocusOptions = [
  "Linkd POS early release",
  "Linkd + JewelLink CRM",
  "Linkd + CountRetail AI",
  "Full luxury operations stack",
  "Migration planning",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const [selected, setSelected] = useState<string[]>([
    "POS and checkout",
    "Inventory and RFID security",
  ]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const statusCopy = useMemo(() => {
    if (submitState === "success") return message || "Your request was sent.";
    if (submitState === "error") return message || "Something went wrong.";
    return "";
  }, [message, submitState]);

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
      setSelected(["POS and checkout", "Inventory and RFID security"]);
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
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input
        className="hidden-field"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="form-heading">
        <span>Request early access</span>
        <h3>Tell us about your store.</h3>
      </div>

      <div className="form-grid">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
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
          Current POS
          <input name="currentPos" placeholder="EDGE, Lightspeed, custom, etc." />
        </label>
        <label>
          Demo focus
          <select name="demoFocus" defaultValue="Linkd POS early release">
            {demoFocusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
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
                type="checkbox"
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

      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending..." : "Request Early Access"}
      </button>

      {statusCopy ? (
        <p className={`form-status ${submitState}`} role="status">
          {statusCopy}
        </p>
      ) : null}
    </form>
  );
}
