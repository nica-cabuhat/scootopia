import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Header = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Scootopia Logo" width={50} height={50} />
        <h1 className="uppercase tracking-widest text-[20px]">Scootopia</h1>
      </div>
      {session && (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button variant="ghost" size="sm" type="submit" className="uppercase tracking-wide cursor-pointer">
            Sign out
          </Button>
        </form>
      )}
    </div>
  );
};

export default Header;
