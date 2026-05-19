import Link from "next/link";

import { usePathname } from "next/navigation";
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <Link className={`${pathname === href ? "text-blue-400 font-bold border-b-2 border-blue-400" : ""}text-white `} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
