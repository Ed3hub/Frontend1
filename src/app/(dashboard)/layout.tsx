import { ThemeProvider } from "@/components/ui/theme-provider";
import AuthGuard from "@/components/AuthGuard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthGuard>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </AuthGuard>
    );
};

export default DashboardLayout;