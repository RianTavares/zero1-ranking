'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import style from './headerNav.module.scss';

const HeaderNav = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (InPathname: string) => {
        return pathname === InPathname;
    };

    return (
        <header className={style.header}>
            <nav className={style.navigation}>
            <Link href="/beach-tennis" className={isActive('/beach-tennis') ? `${style.navLink} ${style.active}` : style.navLink}>
                Beach Tennis
            </Link>
            <Link href="/futevolei" className={isActive('/futevolei') ? `${style.navLink} ${style.active}` : style.navLink}>
                Futevôlei
            </Link>
            </nav>
        </header>
    )
}

export default HeaderNav;
