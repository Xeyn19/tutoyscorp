import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: {
    default: "TutoY Corp Integrated System",
    template: "%s | TutoY Corp Integrated System",
  },
  description:
    "Integrated platform for finance, care, learning, and transport operations across organizations.",
  icons: {
    icon: "/tutoy-logo.jpeg",
  },
};

const themeInitializer = `
  (() => {
    try {
      const storedTheme = window.localStorage.getItem("tutoyscorp-theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolvedTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
      document.documentElement.dataset.theme = resolvedTheme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body
        className={`${sora.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
