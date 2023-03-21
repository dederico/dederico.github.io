import './globals.css'

export const metadata = {
  title: 'Careeryze',
  description: 'Careeryze can help you grow, and can do it fast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
