import React from 'react';
import SignupCard from '../components/SignupCard';
import LoginCard from '../components/LoginCard';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';

function AuthPage() {

    const authScreenState = useRecoilValue(authScreenAtom);
    return (
        <>
           
           {
            authScreenAtom === "Login" ? <LoginCard/> : <SignupCard/>
           }



        </>
    );
}

export default AuthPage;