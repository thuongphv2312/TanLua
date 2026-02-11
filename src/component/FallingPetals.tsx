import { useEffect, useState } from 'react';

const FallingPetals = () => {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        // Generate ~15 red envelopes (Thưa)
        const count = 15;
        const newPetals = Array.from({ length: count }, (_, i) => i);
        setPetals(newPetals);
    }, []);

    return (
        <div className="falling-petals-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999, // On top
            overflow: 'hidden'
        }}>
            <style>
                {`
                  @keyframes fall {
                    0% { top: -10%; transform: translateX(0) rotate(0deg); opacity: 1; }
                    100% { top: 110%; transform: translateX(20px) rotate(360deg); opacity: 0; }
                  }
                  
                  .petal {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    user-select: none;
                    filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.1));
                  }
                `}
            </style>
            {petals.map((i) => {
                const left = Math.random() * 100;
                // Slower: 15s to 25s
                const duration = 15 + Math.random() * 10;
                // Delay: 0s to 15s (Spreads them out)
                const delay = Math.random() * 15;
                const size = 12 + Math.random() * 10; // 12-22px

                return (
                    <div
                        key={i}
                        className="petal"
                        style={{
                            left: `${left}%`,
                            fontSize: `${size}px`,
                            animation: `fall ${duration}s linear ${delay}s infinite`,
                            top: '-10%'
                        }}
                    >
                        🧧
                    </div>
                );
            })}
        </div>
    );
};

export default FallingPetals;
