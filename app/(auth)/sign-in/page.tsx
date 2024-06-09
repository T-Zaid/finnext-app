import AuthenticationForm from "@/components/AuthenticationForm"


const SignIn = () => {
    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthenticationForm type="sign-in" />
        </section>
    )
}

export default SignIn;