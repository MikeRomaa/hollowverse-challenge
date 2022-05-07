import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { IoClose, IoSearch } from 'react-icons/io5';

export const AppBar = () => {
    const [searchToggled, setSearchToggled] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const toggleSearch = useCallback(() => {
        if (!inputRef.current) return;

        if (!searchToggled) {
            inputRef.current.focus();
        }
        setSearchToggled(!searchToggled);
    }, [inputRef, searchToggled]);

    const IconComponent = searchToggled ? IoClose : IoSearch;

    return (
        <nav className="sticky top-0 flex items-center w-full bg-white p-5 z-10">
            <Link href="/" passHref>
                <a className="absolute flex items-center">
                    <Image
                        src="/images/logo.svg"
                        width={200}
                        height={24}
                        alt="Hollowverse"
                        layout="fixed"
                    />
                </a>
            </Link>

            <div className="flex items-center ml-auto">
                <input
                    className={classNames('transition-all duration-300 h-8 p-2 z-20', { 'w-0': !searchToggled, 'w-80': searchToggled })}
                    ref={inputRef}
                    type="search"
                    placeholder="Search for a celebrity"
                />
                <IconComponent
                    size={22}
                    onClick={toggleSearch}
                    className="cursor-pointer fill-slate-500 ml-2 z-30"
                />
            </div>
        </nav>
    );
};
