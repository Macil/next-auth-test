This repository is an example of a bug with OpenNext and NextAuth. The issue is that when NextAuth's `signIn()` or `signOut()` is called while running the project through the `npm run preview` command (which uses Cloudflare Wrangler and supports durable objects with RPC, as opposed to `npm run dev`), the request takes 15 seconds to complete. This can be seen by running this project, pressing the sign in button, and then pressing the sign out button. This issue does not occur when the project is deployed to Cloudflare Workers or when running the project through `npm run dev`.

It might be worth noting that there is a [separate bug affecting `signOut()` with OpenNext](https://github.com/opennextjs/opennextjs-cloudflare/issues/606) that this repository has a workaround in place for in `open-next.config.ts`. I do not think that bug is directly related to the 15 second delay but I might be wrong.

# Instructions

1. `npm install`
2. `npm run preview`
3. Open http://localhost:8787 in your browser.
4. Sign in using the email address "john@example.com" and password "password". Observe a 15 second wait.
5. Click the "Sign out" button and observe the 15 second wait.

This project has a git-committed `.dev.vars` and `.env.local` files with a hard-coded `AUTH_SECRET` value so that this project can be run without any additional configuration. (Real public projects should not commit these files.)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
