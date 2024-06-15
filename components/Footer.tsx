import { signOut } from '@/lib/server/user.action';
import { FooterProps } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter();

    const handleSignOut = async function () {
        const signedOut = await signOut();
        if (signedOut) router.push('sign-in');
    }

    return (
        <footer className="footer">
            <div className={type == 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <div className="text-xl font-bold text-gray-700">
                    {user.name[0]}
                </div>
            </div>

            <div className={type == "mobile" ? 'footer_email-mobile' : 'footer_email'}>
                <h1 className="text-14 truncate text-gray-600 font-semibold">
                    {user.name}
                </h1>
                <p className="text-14 truncate text-gray-600 font-normal">
                    {user.email}
                </p>
            </div>

            <div className="footer_image" onClick={handleSignOut}>
                <Image src="icons/logout.svg" fill alt='logout' />
            </div>
        </footer>
    )
}

export default Footer;