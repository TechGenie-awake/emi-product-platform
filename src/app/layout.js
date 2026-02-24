import './globals.css'

export const metadata = {
  title: '1Fi EMI Store - Buy Now, Pay Later',
  description: 'Purchase premium smartphones with flexible EMI plans backed by mutual funds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}