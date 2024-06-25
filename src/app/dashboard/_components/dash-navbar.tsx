"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemType = {
  id: number;
  name: string;
  link: string;
};

const DashBoardNavbar = () => {
  const navItems: NavItemType[] = [
    {
      id: 1,
      name: "Projects",
      link: "dashboard/projects",
    },
    {
      id: 2,
      name: "Education",
      link: "education",
    },
    {
      id: 3,
      name: "Certificates",
      link: "certificates",
    },
  ];
  return (
    <nav className="border-separate shadow-sm border-b h-[60px]">
      <div className="container flex justify-between items-center h-full">
        <div className="flex items-center flex-wrap gap-x-5 ">
          {navItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default DashBoardNavbar;

function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname();

  const isActive = pathname.includes(item.link);
  return (
    <div>
      <Link
        className={cn(
          "font-normal hover:underline z-10",
          isActive && "underline font-semibold"
        )}
        href={item.link}
        key={item.id}
      >
        {item.name}
      </Link>
    </div>
  );
}
