import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div>
      {/* top bar */}
      <nav className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/">
              <Image
                src={"/bar_logo.svg"}
                alt="rebooted.biz logo"
                width={300}
                height={75}
                className=""
              />
            </Link>
          </div>

          {/* Top Navigation Links */}
          <ul className="flex text-sm space-x-6"></ul>
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded py-1 px-4 pr-10 w-64"
              />
              <button className="absolute right-0 top-0 mt-1 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* bottom bar */}
      <nav className="bg-gray-100 py-4 shadow-sm ">
        <div className="container mx-auto flex items-center justify-center">
          <ul className="flex space-x-8 text-base">
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "component" },
                }}
                className="hover:underline hover:text-blue-500"
              >
                PC Components
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "system" },
                }}
                className="hover:underline hover:text-blue-500"
              >
                Systems
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/products",
                  query: { category: "accessory" },
                }}
                className="hover:underline hover:text-blue-500"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
