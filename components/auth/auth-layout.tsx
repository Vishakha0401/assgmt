import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        {children}
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:flex-1 bg-muted relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/5 to-background/0 z-10" />
        <Image
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Authentication background"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>
    </div>
  );
}