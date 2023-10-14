import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegEye, FaRegUser, FaUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Pages } from "../lib/pages";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../lib/firebase-services";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

enum Disclosures {
  Nav,
  Search,
}

export default function Navbar({ active }: { active: Pages }) {
  const [activeDisclosure, setActiveDisclosure] = React.useState<Disclosures>();
  const { query } = useParams();
  const [searchStr, setSearchStr] = React.useState<string>(query ?? "");
  const navigate = useNavigate();
  const user = React.useContext(AuthContext);

  const handleChangeSearchStr = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchStr(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/browse/${searchStr}`);
  };

  const navigation = [
    { name: "Browse", to: "/browse", current: active === Pages.Browse },
    { name: "Edit", to: "/edit", current: active === Pages.Edit },
    { name: "Recent", to: "/recent", current: active === Pages.Recent },
    { name: "Saved", to: "/saved", current: active === Pages.Saved },
    { name: "About", to: "/about", current: active === Pages.About },
  ];

  const getUserIcon = () => {
    const userIconClass = "hidden block h-6 w-auto lg:block";
    if (user) {
      if (user.photoURL) {
        return (
          <img
            src={user.photoURL}
            className={userIconClass}
            alt={`${user.displayName}`}
          />
        );
      } else if (active === Pages.Profile) {
        return <FaUser color="white" className={userIconClass} />;
      } else {
        return <FaRegUser color="white" className={userIconClass} />;
      }
    } else {
      if (active === Pages.SignIn) {
        return <FaUser color="white" className={userIconClass} />;
      } else {
        return <FaRegUser color="white" className={userIconClass} />;
      }
    }
  };

  const getDisclosurePanel = () => {
    switch (activeDisclosure) {
      case Disclosures.Nav:
        return (
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        );

      case Disclosures.Search:
        return (
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <form
                className="flex bg-gray-700 rounded-md px-3 py-2 text-white"
                onSubmit={handleSearchSubmit}
              >
                <button type="submit" className="mr-2 text-gray-300">
                  <BsSearch />
                </button>
                <input
                  type="text"
                  className="border-none outline-none bg-gray-700 placeholder-gray-300 text-md font-medium flex-grow"
                  placeholder="Search"
                  value={searchStr}
                  onChange={handleChangeSearchStr}
                />
              </form>
            </div>
          </Disclosure.Panel>
        );

      default:
        return <></>;
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  onClick={() => {
                    setActiveDisclosure(Disclosures.Nav);
                  }}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open && activeDisclosure === Disclosures.Nav ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <FaRegEye
                      color="white"
                      className="block h-8 w-auto lg:hidden"
                    />
                  </Link>
                  <Link to="/">
                    <FaRegEye
                      color="white"
                      className="hidden h-8 w-auto lg:block"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm 3xl:text-xl font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex space-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 min-w-0">
                <form
                  className="bg-gray-700 rounded-md px-3 py-2 text-white hidden sm:flex flex-no-wrap flex-shrink min-w-0"
                  onSubmit={handleSearchSubmit}
                >
                  <button type="submit" className="mr-2 text-gray-300">
                    <BsSearch />
                  </button>
                  <input
                    type="text"
                    className="border-none outline-none bg-gray-700 placeholder-gray-300 text-md 3xl:text-xl font-medium flex-shrink min-w-0"
                    placeholder="Search"
                    onChange={handleChangeSearchStr}
                    value={searchStr}
                  />
                </form>

                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
                  onClick={() => {
                    setActiveDisclosure(Disclosures.Search);
                  }}
                >
                  {open && activeDisclosure === Disclosures.Search ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <BsSearch className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                <Link
                  to={user ? "/profile" : "/signin"}
                  aria-label={user ? "Profile" : "Sign In"}
                  className="bg-gray-700 rounded-3xl  px-2 py-2 text-white hidden sm:flex flex-no-wrap flex-shrink min-w-0"
                >
                  {getUserIcon()}
                </Link>
              </div>
            </div>
          </div>

          {getDisclosurePanel()}
        </>
      )}
    </Disclosure>
  );
}
