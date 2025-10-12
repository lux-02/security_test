# Next.js Security Test App

This repository provides a minimal Next.js application that intentionally includes insecure patterns for exercising custom Semgrep rules. **Do not deploy this application anywhere outside of a controlled testing environment.**

## Contents

- `app/api/xss-var/route.ts` – Returns a query parameter obtained from `URL.searchParams` via a variable.
- `app/api/xss-direct/route.ts` – Directly reflects a query parameter in the response.
- `app/api/insecure-cookie/route.ts` – Writes a session cookie without `httpOnly`, `secure`, or `sameSite` attributes.
- `app/api/ssrf/route.ts` – Performs a server-side `fetch` to `127.0.0.1`.
- `app/api/eval/route.ts` – Executes user input with `eval`.

These endpoints line up with the custom Semgrep rules defined in `.security/semgrep-nextjs.yml`.

## Usage

```bash
npm install
npm run dev
```

With the development server running on `http://localhost:3000`, you can access the vulnerable routes, for example:

- `GET /api/xss-var?message=<script>alert(1)</script>`
- `GET /api/xss-direct?output=<img src=x onerror=alert(1)>`
- `POST /api/insecure-cookie` with `{"session": "abc"}` payload.
- `GET /api/ssrf` (attempts to contact `127.0.0.1`).
- `POST /api/eval` with body `2 + 2`.

To run the provided scan helpers, ensure you have Semgrep installed (or Docker available) and run the helper functions from your terminal as needed.
