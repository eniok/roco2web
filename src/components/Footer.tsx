'use client';

import { navLinks } from "../constants";
import { useLang } from "@/lib/i18n";
import { STORE } from "@/lib/store";

const Footer = () => {
    const { lang } = useLang();
    return (
        <footer className="bg-[#15130F] text-[#FAF8F4]/70 py-8">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} RO-AL SH.P.K.</p>
                    <p className="mt-1 text-[#FAF8F4]/50">
                        {STORE.addressLine} · {STORE.phonePretty}
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="hover:text-[#E8B894] transition-colors">
                           {link.label[lang]}
                         </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
