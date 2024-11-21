import { auth, signIn, signOut } from "@/auth"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Navbar = async () => {

  const session = await auth()

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans h-[62px]">
      <nav className="flex justify-between items-center">
        {
          session && session?.user ? (
            <>
              <div className="flex-between items-center gap-2">
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || 'avatar'}
                    className="rounded-full w-full h-full"
                  />
                  <AvatarFallback>
                    AV
                  </AvatarFallback>
                </Avatar>

                <p className="text-lg font-semibold">{session.user.name}</p>
              </div>
              <div className="flex gap-7">
                <form action={async () => {
                  "use server";
                  await signOut({ redirectTo: '/' });
                }}>
                  <button type="submit">
                    <span className="max-sm:hidden text-lg">Logout</span>
                    <LogOut className="size-6 sm:hidden text-red-500" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div
              className="flex gap-7 justify-center mt-2"
            >
              <form
                action={async () => {
                  "use server"
                  await signIn("github")
                }}
              >
                <button type="submit">Signin with GitHub</button>
              </form>
            </div>
          )
        }

      </nav>
    </div>
  )
}

export default Navbar