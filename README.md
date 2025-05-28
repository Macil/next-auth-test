This repository is an example of a bug with OpenNext and NextAuth. The issue is that when NextAuth's `signOut()` is called while running the project through the `npm run preview` command (which uses Cloudflare Wrangler and supports durable objects, as opposed to `npm run dev`), the request takes 15 seconds to complete. This can be seen by running this project, signing in, and then clicking the "Sign out" button. This issue does not occur when the project is deployed to Cloudflare Workers or when running the project through `npm run dev`.

It might be worth noting that there is a [separate bug affecting `signOut()` with OpenNext](https://github.com/opennextjs/opennextjs-cloudflare/issues/606) that this repository has a workaround in place for in `open-next.config.ts`. I do not think that bug is directly related to the 15 second delay but I might be wrong.

# Setup

You must set up NextAuth with an Oauth provider, such as Google or GitHub. (The repo and this readme expect Google to be used. You will need to make changes to `auth.ts` and your environment variables if you use something besides Google.) See https://authjs.dev/getting-started/authentication/oauth.

You will need to make an Oauth client credential which has the following Authorized Javascript Origins:

- `http://localhost:3000`
- `http://localhost:8787`

and the following Authorized redirect URIs:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:8787/api/auth/callback/google`

The first set are for when `npm run dev` is used, and the second set are for when `npm run preview` is used. (The `npm run dev` command uses the Next.js development server, which runs on port 3000, while the `npm run preview` command uses Cloudflare Wrangler, which runs on port 8787 and has fuller support for Cloudflare Workers features like durable objects.)

You must then copy the client ID and secret into the project's environment variables in *both* `.dev.vars` and `.env.local` files. (I believe that the `.env.local` file is used when running `npm run dev`, while the `.dev.vars` file is used when running `npm run preview`.)

You must create a `.dev.vars` file that looks like this:

```sh
# Load .env.development* files when running `wrangler dev`
NEXTJS_ENV=development
# Set the NextAuth URL so NextAuth can determine the correct URL to use for
# OAuth callbacks. (In `npm run preview`, by default NextAuth incorrectly
# assumes the URL is `https://localhost:8787`.)
NEXTAUTH_URL=http://localhost:8787

AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

and `.env.local`:

```sh
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

You can generate a random `AUTH_SECRET` by running `npx auth secret`. The command will automatically write the value to your `.env.local` file, but you must then copy it into your `.dev.vars` file.

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
