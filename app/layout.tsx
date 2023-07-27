// library
import type { Metadata } from 'next';

// components
import Grid from './components/grid/grid.component';

// head
export const metadata: Metadata = {
  title: 'BB&S',
  description: 'BB&S: Lighting People',
}

// styles
import '@/app/styles/main.scss'

export default function RootLayout({
  children,
}: { children: React.ReactNode}
) {
  return (
    <html lang="en">
      <body>
        <Grid>
          { children }
        </Grid>
      </body>
    </html>
  )
}
