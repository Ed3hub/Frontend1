import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleTranslateInit from "@/components/GoogleTranslateInit";

export const metadata: Metadata = {
  title: "Ed3Hub",
  description: "Ed3Hub is a platform for Web3 community & courses.",
  icons: {
    icon: "/icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.paystack.co/v1/inline.js"></script>
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '890444347433066'); 
fbq('track', 'PageView');
`
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
 <img height="1" width="1" 
src="https://www.facebook.com/tr?id=890444347433066&ev=PageView
&noscript=1"/>
`
          }}
        />
        {/* End Facebook Pixel Code */}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "placeholder-client-id"}>
          <AuthProvider>
            <GoogleTranslateInit />
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
