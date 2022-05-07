import Image from 'next/image';
import React from 'react';

export const Footer = () => (
    <footer className="bg-slate-100 mt-5 p-5">
        <div className="mb-3">
            <Image
                width={30}
                height={30}
                alt="Hollowverse"
                src="/images/letter-logo.png"
            />
        </div>
        <p>Hollowverse is about the important<br />people and their beliefs.</p>
        <p>Email us at <a href="mailto:hollowverse@hollowverse.com" className="font-bold">hollowverse@hollowverse.com</a>.</p>
    </footer>
);
