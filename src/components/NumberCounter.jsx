import React, { useState, useEffect, useRef } from 'react';

const NumberCounter = ({ targetNumber, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const hasBeenAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenAnimated.current) {
                    startCount();
                    hasBeenAnimated.current = true;
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, [targetNumber]);

    const startCount = () => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const newCount = Math.min(Math.floor((progress / duration) * targetNumber), targetNumber);
            setCount(newCount);
            if (newCount < targetNumber) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    return (
        <span ref={countRef}>
            {count}
        </span>
    );
};

export default NumberCounter;