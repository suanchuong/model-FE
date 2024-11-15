import React, { useEffect, useRef } from 'react';
import './Attachment.css';

const Attachment = () => {
    const quantityRefs = useRef([]);
    const hasAnimated = useRef(false); 

    useEffect(() => {
        const handleScrollAnimation = () => {
            if (hasAnimated.current) return; 

            quantityRefs.current.forEach((quantityRef) => {
                const initialValue = parseInt(quantityRef.innerText, 10);
                const randomValue = Math.floor(Math.random() * initialValue + initialValue / 2);
                let currentValue = initialValue;

                const duration = 2000;
                const interval = 50;
                const steps = duration / interval;
                const increment = (randomValue - initialValue) / steps; 

                const intervalId = setInterval(() => {
                    currentValue += increment;
                    quantityRef.innerText = Math.round(currentValue);

                    // Dừng lại khi gần đạt được giá trị ngẫu nhiên
                    if ((increment > 0 && currentValue >= randomValue) || (increment < 0 && currentValue <= randomValue)) {
                        clearInterval(intervalId);
                        quantityRef.innerText = randomValue; 
                        setTimeout(() => {
                            quantityRef.innerText = initialValue;
                        });
                    }
                }, interval);
            });
            // Đánh dấu là đã thực hiện animation
            hasAnimated.current = true; 
        };

        // Scroll trigger
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                handleScrollAnimation();
            }
        }, { threshold: 0.5 });
        observer.observe(document.querySelector('.attach'));
        return () => observer.disconnect();
    }, []);

    return (
        <div className='attach'>
            {['640', '200', '120', '520'].map((num, index) => (
                <div key={index} className="box-att">
                    <p
                        ref={el => quantityRefs.current[index] = el}
                        className='quantity'
                    >
                        {num}
                    </p>
                    <p className='checking'>
                        {['SELECTION', 'CLAIMED', 'RESERVE', 'INSIGHTS'][index]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Attachment;
