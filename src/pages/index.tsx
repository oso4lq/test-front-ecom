import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useStore from '@/store/useStore';
import Popup from '@/components/Popup';

const Home: React.FC = () => {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const { name } = useStore();

    useEffect(() => {
        console.log('popup');
        if (!name) {
            // Open popup prompting the user's name
            setShowPopup(true);
        } else {
            // Redirect to the password-generator page
            router.push('/password-generator');
        }
    }, [name, router]);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && <Popup onClose={handleClosePopup} />}
        </>
    );
};

export default Home;
