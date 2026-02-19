import { Toaster } from "sonner";

export default async function AuthLayout({ children }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
