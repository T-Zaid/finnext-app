import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
} from 'react-plaid-link';
import { PlaidLinkProps } from '@/types';
import { Button } from './ui/button';
import { useCallback, useEffect, useState } from 'react';
import { createPlaidLinkToken } from '@/lib/server/actions/user.action';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const [plaidToken, setPlaidToken] = useState('');

    useEffect(() => {
      const callCreatePlaidLinkToken = async () => {
        const response = await createPlaidLinkToken(user);
        setPlaidToken(response.linkToken);
      }
      callCreatePlaidLinkToken();
    }, [user]);
    

    const onPlaidLinkSuccess = useCallback(() => {

    }, [user]);
    // const config : PlaidLinkOptions = {

    // }

    return (
        <>
            {variant == 'primary' ?
                <Button className='plaidlink-primary'>Connect Bank</Button> :
                <Button className=''>Connect Bank</Button>
            }
        </>
    )
}

export default PlaidLink;