# Personal Email Agent

A Vite + React app that helps draft and send email requests through a webhook-powered backend.

## Local development

```bash
npm install
npm run dev
```

The app uses the `VITE_WEBHOOK_URL` environment variable for the backend endpoint. For local dev, it falls back to:

```bash
http://localhost:5678/webhook/personal-email-agent
```

## Production build

```bash
npm run build
```

The generated static files are in the `dist/` folder and can be deployed to any static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Deployment config

Set this variable in your deployment environment:

```bash
VITE_WEBHOOK_URL=https://your-backend-domain.example.com/webhook/personal-email-agent
```

Then deploy the `dist/` output from the project root.

## Notes

- The frontend itself is static and does not include backend logic.
- The actual email workflow must be exposed by your backend or webhook service.
- If your backend is deployed behind HTTPS, ensure the same `VITE_WEBHOOK_URL` is configured there.
