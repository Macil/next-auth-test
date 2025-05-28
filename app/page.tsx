import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";

export default async function LoginTest() {
  const session = await auth();
  console.log("Session in LoginTest:", session);
  return (
    <main>
      {session?.user ? (
        <>
          <div>Signed in as: {session.user.email}</div>
          <div>
            <SignOut />
          </div>
        </>
      ) : (
        <>
          <div>Not signed in</div>
          <div>
            <SignIn />
          </div>
        </>
      )}
    </main>
  );
}
