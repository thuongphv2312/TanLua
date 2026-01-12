import React from 'react';

const StickyDecorations: React.FC = () => {
    return (
        <>
            <div
                className="fixed left-0 top-[140px] z-[999] pointer-events-none hidden xl:block"
                style={{ width: '100px', maxWidth: '8vw' }}
            >
                <img
                    src="https://i.ibb.co/TMGy0pNd/label-left.gif"
                    alt="Decoration Left"
                    className="w-full h-auto"
                />
            </div>
            <div
                className="fixed right-0 top-[140px] z-[999] pointer-events-none hidden xl:block"
                style={{ width: '100px', maxWidth: '8vw' }}
            >
                <img
                    src="https://i.ibb.co/Nhhn8tn/label-right.gif"
                    alt="Decoration Right"
                    className="w-full h-auto"
                />
            </div>
        </>
    );
};

export default StickyDecorations;
