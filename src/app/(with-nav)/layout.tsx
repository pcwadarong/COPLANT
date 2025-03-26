import Nav from "@/components/searchBar";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Nav />
        {children}
        <footer>
            footer
        </footer>
      </div>
  );
}
