// library
import type { Metadata } from 'next';

// components
import Banner from './components/banner/banner.component';
import Grid from './components/grid/grid.component';
import Nav from './components/nav/nav.component';
import Footer from './components/footer/footer.component';

// head
export const metadata: Metadata = {
  title: 'BB&S America',
  description: 'BB&S: Lighting People',
}

// styles
import '@/app/styles/main.scss'
import { UserProvider } from './contexts/user.context';

export default function RootLayout({
  children,
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body>
        <Grid>
          <Banner />
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
