import { ToastContainer } from 'react-toastify';
import './globals.css'
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[--color-background] text-[--color-foreground] antialiased">
        <Providers>
          <div className="min-h-screen max-w-4xl mx-auto p-6">
            {children}
            <ToastContainer autoClose={1500} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
