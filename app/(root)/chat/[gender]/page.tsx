import { auth } from "@/auth";
import ChatForm from "@/components/ChatForm";

const page = async ({ params }: { params: Promise<{ gender: string }> }) => {
    const genderPreference = (await params).gender;
    const session = await auth();

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