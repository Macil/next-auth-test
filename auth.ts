import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const fakeUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
];

const saltAndHashPassword = (password: string) => {
  return `hashed-${password}`;
};
const getUserFromDb = async (email: string, passwordHash: string) => {
  const user = fakeUsers.find((user) => user.email === email);
  if (
    user &&
    user.email === email &&
    passwordHash === saltAndHashPassword("password")
  ) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "john@example.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = null;

        if (
          !credentials.email ||
          !credentials.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials.");
        }
        const pwHash = saltAndHashPassword(credentials.password);

        user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  // needed when using `npm run preview` and is fine for production on
  // Cloudflare
  trustHost: true,
});
