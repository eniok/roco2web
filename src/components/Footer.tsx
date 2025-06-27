// src/components/Footer.tsx
import { navLinks } from "../constants";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} RO-AL SH.P.K. All Rights Reserved.
                </p>
                <div className="space-x-4 text-sm">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="hover:text-gray-200 transition-colors">
                           {link.label}
                         </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;