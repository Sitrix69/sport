import './globals.css';
import { Inter } from 'next/font/google';
import Header from './header';
import ClientWrapper from './ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <ClientWrapper>
                    {children}
                </ClientWrapper>
            </body>
        </html>
    );
}
