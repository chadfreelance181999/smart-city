import AuthProvider from "./components/AuthProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}