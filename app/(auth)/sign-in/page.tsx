import AuthenticationForm from "@/components/AuthenticationForm"
import { getLoggedInUser } from "@/lib/server/user.action";


const SignIn = async () => {
    const user = await getLoggedInUser();
    console.log("Logged In User: ", user);
    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthenticationForm type="sign-in" />
        </section>
    )
}

export default SignIn;