import { auth } from "@/auth";
import ChatForm from "@/components/ChatForm";
import SessionRequired from "@/components/SessionRequired";

const page = async ({ params }: { params: Promise<{ gender: string }> }) => {
    const genderPreference = (await params).gender;
    const session = await auth();
    if (!session) {
        // Handle the case where session is null, e.g., redirect or show an error
        return <SessionRequired />
    }

    return (
        <section className={`${genderPreference == "men" ? "blue-container" : "pink-container"} flex-between flex-col`}>
            <ChatForm
                genderPreference={genderPreference}
                session={session}
            />
        </section>
    )
}

export default page