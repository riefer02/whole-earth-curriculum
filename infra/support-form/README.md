# Support form service

A single Cloudflare Worker stores public support-form submissions in D1, a managed
database with SQLite semantics. The website knows only the Worker endpoint; no
database credential is shipped to the browser.

## Deploy

1. Install the pinned Wrangler version: `npm install`.
2. Authenticate Wrangler with `npm run whoami`. For local automation, put
   `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in an ignored `.env` in this
   directory. Interactive development can use `npx wrangler login --use-keyring`.
3. Confirm the existing D1 database is named `whole-world-curriculum-v1`. Its
   non-secret ID is recorded in `wrangler.jsonc`; do not create another database
   unless replacing it.
4. Test the schema locally: `npm run db:migrate:local`.
5. Apply the same migration remotely: `npm run db:migrate:remote`.
6. Create a managed Turnstile widget restricted to `wholeearthcurriculum.org`, then
   store its private key with `npx wrangler secret put TURNSTILE_SECRET_KEY`.
7. Deploy the Worker: `npm run deploy`.
8. Set `PUBLIC_SUPPORT_FORM_ENDPOINT` and the public
   `PUBLIC_TURNSTILE_SITE_KEY` in the website build environment. The endpoint is the
   deployed URL plus `/support-interest`, then rebuild the site.

The public endpoint accepts only `POST /support-interest` from the origins listed in
`ALLOWED_ORIGINS`. It validates lengths and enumerated values, verifies single-use
Turnstile tokens server-side, applies a hashed-email rate limit, discards honeypot
submissions, and does not expose any read endpoint.

An automatic daily retention job deletes every submission after 24 months and
closed or declined submissions after 12 months. The job logs only the number of
deleted records.

## Work with submissions

Use the Cloudflare dashboard or Wrangler:

```bash
npx wrangler d1 execute DB --remote \
  --command "select id, created_at, support_type, status from support_interests order by created_at desc limit 50"
```

Avoid printing names, email addresses, or free-text messages into shared logs. Export
and back up the database before material workflow changes.

The database ID and Worker URL are identifiers, not secrets. Keep API tokens,
account credentials, and any future bot-verification secret out of Git. Store Worker
secrets with `wrangler secret put`, and store website build secrets in the hosting
provider's encrypted environment settings. This service currently needs no secret in
the browser or repository.
