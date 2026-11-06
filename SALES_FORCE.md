# Linkd Sales Force intake

Prepared connection to https://sales.linkd.com for linkd.

Forwarding stays disabled until the server has `SALES_FORCE_ENABLED=true` and a private `SALES_FORCE_SIGNING_KEY` matching `INBOUND_LINKD_SECRET` on Sales Force. Deploy Sales Force and migration 010 first. Never expose this secret through browser variables.

The adapter runs only after a validated marketing submission succeeds. It forwards an allowlist of contact/form fields using a signed server request, retries transient failures with the same submission ID, and returns a retryable error if CRM receipt cannot be confirmed. Existing Postmark notifications stay in place during cutover and may repeat after a CRM outage retry. Browser submission IDs deduplicate CRM delivery on retries; older clients without IDs only deduplicate within a server request. No applicant, assessment, password, or authentication data is forwarded.

Run `node --test sales-force.test.mjs`. No tests contact live services. Live wiring still requires the public Sales Force deployment and secrets.
