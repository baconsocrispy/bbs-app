// library
import type { Metadata } from 'next';

// head
export const metadata: Metadata = {
  title: 'BB&S America',
  description: 'BB&S: Lighting People'
};

// context
import { UserProvider } from './_contexts/user.context';

// styles
import '@/app/_styles/main.scss';

export default function RootLayout({
  children,
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          { children }
        </UserProvider>
      </body>
    </html>
  )
};
