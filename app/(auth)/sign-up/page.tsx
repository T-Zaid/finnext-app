import AuthenticationForm from '@/components/AuthenticationForm';
import React from 'react'

const SignUp = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthenticationForm type="sign-up" />
    </section>
  )
}

export default SignUp;