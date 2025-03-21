"use client"; // Add this at the very top

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
// Define TypeScript interfaces
interface MenuListViewModel {
  id: number;
  name: string;
  component: string;
  path: string;
  icon: string;
  order: number;
  children?: MenuListViewModel[];
}

interface ModuleListViewModel {
  id: number;
  name: string;
  code: string;
  menu?: MenuListViewModel[];
  children?: ModuleListViewModel[];
  permissions?: { id: number; permission: string }[];
}

// Sidebar component
const Sidebar = ({ modules }: { modules: ModuleListViewModel[] }) => {
  return (
    <aside className="w-64 h-screen bg-white text-gray-800 p-4 border-r-1 border-gray-300">
      <nav>
        {modules.map((module) => (
          <div key={module.id} className="mb-4">
            <h2 className="text-lg font-bold">{module.name}</h2>
            {module.menu && (
              <ul className="mt-2">
                {module.menu.map((menu) => (
                  <MenuItem key={menu.id} menu={menu} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

const MenuItem = ({ menu }: { menu: MenuListViewModel }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = pathname === menu.path;
  return (
    <li className="mb-2">
      <div
        className={`flex items-center justify-between p-2 rounded hover:bg-purple-50 cursor-pointer ${
          isActive ? "bg-purple-50" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <Link href={menu.path}
          
          className={`flex items-center gap-2 `}
        >
          <span className={`${
            isActive ? " text-purple-500 gap-2" : "text-gray-800 gap-2 "
          }`}>{menu.icon}</span>{" "}
          {/* Replace with an icon component */}
          {menu.name}
        </Link>
   
        {menu.children && menu.children.length > 0 && (
          <button onClick={() => setOpen(!open)}>
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-3"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {open && menu.children && (
        <ul className="ml-4">
          {menu.children.map((child) => (
            <MenuItem key={child.id} menu={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
