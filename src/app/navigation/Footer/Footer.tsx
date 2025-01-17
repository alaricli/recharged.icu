import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-4 md:mb-0">
          {/* Column 1: Logo */}
          <div>
            <Image
              src="/rebooted_square_logo.png"
              width={150}
              height={150}
              alt="/Logo"
            />
          </div>
          {/* Column 2: Links */}
          <div>
            <ul className="">
              <li>
                <Link href="/">
                  <p className="hover:text-orange-400">Home</p>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <p className="hover:text-orange-400">PC Components</p>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <p className="hover:text-orange-400">Systems</p>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <p className="hover:text-orange-400">Accessories</p>
                </Link>
              </li>
            </ul>
          </div>
          {/* Column 3: About Data */}
          <div>
            <ul>
              <li>
                <Link href="/about">
                  <p className="hover:text-orange-400">About</p>
                </Link>
              </li>
              <li>
                <a href="mailto:professorsresearchtcg@gmail.com">
                  <p className="hover:text-orange-400">Contact</p>
                </a>
              </li>
              <li>
                <Link href="/privacy">
                  <p className="hover:text-orange-400">Privacy</p>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <p className="hover:text-orange-400">Terms</p>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <p className="hover:text-orange-400">Returns</p>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <p className="hover:text-orange-400">Shipping</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-8 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {currentYear} Rebooted, a Recharged Company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
