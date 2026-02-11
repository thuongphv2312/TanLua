import React from 'react';

const SideBanners = () => {
    return (
        <>
            <style>
                {`
          @media (max-width: 1100px) {
            .pc-banner { display: none !important; }
          }
        `}
            </style>
            <img
                className="pc-banner"
                src="https://i.ibb.co/6R9ggsnf/talutlp35-lite.png"
                alt="Left Banner"
                style={{
                    position: 'fixed',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '90vh',
                    width: 'auto',
                    maxWidth: '12vw', // Reduced width
                    zIndex: 50,
                    objectFit: 'contain',
                    pointerEvents: 'none'
                }}
            />
            <img
                className="pc-banner"
                src="https://i.ibb.co/9HVMjm0v/mayxoi-lite.png"
                alt="Right Banner"
                style={{
                    position: 'fixed',
                    right: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '90vh',
                    width: 'auto',
                    maxWidth: '12vw', // Reduced width
                    zIndex: 50,
                    objectFit: 'contain',
                    pointerEvents: 'none'
                }}
            />
        </>
    );
};

export default SideBanners;
