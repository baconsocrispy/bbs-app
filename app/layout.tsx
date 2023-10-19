// library
import type { Metadata } from 'next';

// components
import Grid from './_components/grid/grid.component';
import Nav from './_components/nav/nav.component';
import Footer from './_components/footer/footer.component';

// head
export const metadata: Metadata = {
  title: 'BB&S America',
  description: 'BB&S: Lighting People',
}

// styles
import '@/app/_styles/main.scss'
import { UserProvider } from './_contexts/user.context';

export default function RootLayout({
  children,
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body>
        <Grid>
          <UserProvider>
            <Nav />
            { children }
          </UserProvider>
          <Footer />
        </Grid>
      </body>
    </html>
  )
}
