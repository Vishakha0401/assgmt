import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "Login | NextAuth",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <AuthLayout>
        <AuthForm />
      </AuthLayout>
    </AuthProvider>
  );
}