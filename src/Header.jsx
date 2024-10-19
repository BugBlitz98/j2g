"use client"
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from "react";
import { useStored } from './store/useStore';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVis, setIsVis] = useState(false);
    const [isGen, setIsGen] = useState(false);
    const setDirection = useStored((state) => state.setDirection);
    const isDownload = useStored((state) => state.isDownload);
    const setIsDownload = useStored((state) => state.setIsDownload);
    const setView = useStored((state) => state.setView);
    const animation = useStored((state) => state.animation);
    const setAnimation = useStored((state) => state.setAnimation);
    const viewType = useStored((state) => state.viewType);
    const fullScreen = useStored((state) => state.fullScreen);
    const setFullScreen = useStored((state) => state.setFullScreen);
    const darkMode = useStored((state) => state.darkMode);
    const setDarkMode = useStored((state) => state.setDarkMode);
    const getStarted = useStored((state) => state.getStarted);

    const setStarted = useStored((state) => state.setStarted);
    const handleClick = () => {
        // Get the height of the viewport
        const viewportHeight = window?.innerHeight || document?.documentElement?.clientHeight;

        // Scroll down by the height of the viewport
        window?.scrollTo({
            top: viewportHeight,
            behavior: 'smooth' // Smooth scrolling animation
        });
    };




    const download = async () => {
        setIsDownload(!isDownload);

    }

    return (
        <nav className={getStarted?"bg-black ":"bg-white"}>
            <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="/" passHref
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >

                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl "><span className="bg-gradient-to-tl from-slate-700 via-slate-400 to-slate-800 bg-clip-text text-transparent">JSON2GRAPH</span></h1>
                </a>
               
                {!getStarted &&  
                
              <>
               <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div className={isOpen?"w-full md:block md:w-auto":"hidden w-full md:block md:w-auto"} id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                  <li>
                    <a href="#howitworks" className="block py-2 px-3 text-blue-700  rounded md:bg-transparent md:p-0  " aria-current="page">How it Works</a>
                  </li>

                  <li>
                    <a href="#about" className="block py-2 px-3 text-blue-700  rounded md:bg-transparent  md:p-0  " aria-current="page">About</a>
                  </li>

                  <li>
                    <button onClick={()=>{setStarted(!getStarted)}} className="block py-2 px-3 text-blue-700  rounded md:bg-transparent  md:p-0  " aria-current="page">Get Started</button>
                  </li>
                  
                </ul>
              </div>
              </> 
                }
               {getStarted && <div className="flex items-center gap-2">
                    <button
                        className="h-8 w-8 rounded-md border border-[#e4e8ee] p-[5px] text-gray-700"
                        type="button"
                        onClick={() => { handleClick(); }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#e4e8ee"
                            height="100%"
                            width="100%"
                        >
                            <path d="M12 17V11" stroke="#e4e8ee" strokeWidth="1.5" strokeLinecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#e4e8ee"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#e4e8ee" strokeWidth="1.5" strokeLinecap="round"></path>
                        </svg>
                    </button>

                    <button
                        className="h-8 w-8 rounded-md border border-[#e4e8ee] p-[5px] text-gray-700 "
                        type="button"
                        aria-label="focus to center"
                        onClick={() => { download() }}
                    >
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="100%"
                            width="100%"
                            xmlns="http://www.w3.org/2000/svg"
                        >

                            <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#e4e8ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#e4e8ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>


                    </button>
                    <Menu as="div" className="relative">
                        <Menu.Button
                            className="text-[#e4e8ee] inline-flex h-8 w-8 items-center justify-center gap-1 rounded-md border border-[#e4e8ee] p-0 text-sm text-[#e4e8ee] hover:bg-gray-900   dark:hover:border-green-400 dark:hover:text-green-400 md:w-auto md:px-2 md:py-1"
                            aria-label="Shortcut menu"
                        >
                            <span className="hidden md:inline">Direction</span>
                            <div className="-mr-1 ml-2 hidden h-4 w-4 md:inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                    height="100%"
                                    width="100%"
                                    stroke="#e4e8ee"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    ></path>
                                </svg>

                            </div>
                            <span className="h-5 w-5 md:hidden">
                                {/* <MenuIcon /> */}
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-900 p-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-y-0 dark:bg-vsdark-500 dark:shadow-green-700/10 dark:ring-1 dark:ring-gray-600 md:w-56">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => { setDirection(viewType === '3d' ? 'forceDirected3d' : 'forceDirected2d'); }}
                                        >
                                            Force Directed
                                        </button>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}

                                            onClick={() => { setDirection(viewType === '3d' ? 'radialOut3d' : 'radialOut2d'); }}
                                        >
                                            Radial Out
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}

                                            onClick={() => { setDirection(viewType === '3d' ? 'treeLr3d' : 'treeLr2d'); }}
                                        >
                                            Tree Left-right
                                        </button>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => { setDirection(viewType === '3d' ? 'treeTd3d' : 'treeTd2d'); }}
                                        >
                                            Tree Top-down
                                        </button>
                                    )}
                                </Menu.Item>


                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative">
                        <Menu.Button
                            className="text-[#e4e8ee] inline-flex h-8 w-8 items-center justify-center gap-1 rounded-md border border-[#e4e8ee] p-0 text-sm text-[#e4e8ee] hover:bg-gray-900   dark:hover:border-green-400 dark:hover:text-green-400 md:w-auto md:px-2 md:py-1"
                            aria-label="Shortcut menu"
                        >
                            <span className="hidden md:inline">{viewType === '3d' ? '3D View' : '2D View'}</span>
                            <div className="-mr-1 ml-2 hidden h-4 w-4 md:inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#e4e8ee"
                                    aria-hidden="true"
                                    height="100%"
                                    width="100%"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    ></path>
                                </svg>

                            </div>
                            <span className="h-5 w-5 md:hidden">
                                {/* <MenuIcon /> */}
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-900 p-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-y-0 dark:bg-vsdark-500 dark:shadow-green-700/10 dark:ring-1 dark:ring-gray-600 md:w-56">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => {
                                                setView('3d');
                                                setDirection('forceDirected3d');
                                            }}
                                        >
                                            3D
                                        </button>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => {
                                                setView('2d');
                                                setDirection('forceDirected2d');
                                            }}
                                        >
                                            2D
                                        </button>
                                    )}
                                </Menu.Item>


                                {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active
                      ? "bg-gray-900 text-white dark:text-green-400"
                      : "text-gray-900 text-white dark:text-white"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                  //  onClick={() => { setGraph(false);  setGrid(true);}}
                  >
                    CSV
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active
                      ? "bg-gray-900 text-white dark:text-green-400"
                      : "text-gray-900 text-white dark:text-white"
                      } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                  //  onClick={() => { setGraph(false);  setGrid(true);}}
                  >
                    XML
                  </button>
                )}
              </Menu.Item> */}


                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <Menu as="div" className="relative">
                        <Menu.Button
                            className="text-[#e4e8ee] inline-flex h-8 w-8 items-center justify-center gap-1 rounded-md border border-[#e4e8ee] p-0 text-sm text-[#e4e8ee] hover:bg-gray-900   dark:hover:border-green-400 dark:hover:text-green-400 md:w-auto md:px-2 md:py-1"
                            aria-label="Shortcut menu"
                        >
                            <span className="hidden md:inline">{animation?animation:'Control'}</span>
                            <div className="-mr-1 ml-2 hidden h-4 w-4 md:inline-block">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#e4e8ee"
                                    aria-hidden="true"
                                    height="100%"
                                    width="100%"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    ></path>
                                </svg>

                            </div>
                            <span className="h-5 w-5 md:hidden">
                                {/* <MenuIcon /> */}
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-900 p-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-y-0 dark:bg-vsdark-500 dark:shadow-green-700/10 dark:ring-1 dark:ring-gray-600 md:w-56">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => {
                                               setAnimation('pan')
                                            }}
                                        >
                                            Pan
                                        </button>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => {
                                                setAnimation('rotate')
                                            }}
                                        >
                                            Rotate
                                        </button>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                ? "bg-gray-900 text-white dark:text-green-400"
                                                : "text-gray-900 text-white dark:text-white"
                                                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm md:justify-between`}
                                            onClick={() => {
                                                setAnimation('orbit')
                                            }}
                                        >
                                            Orbit
                                        </button>
                                    )}
                                </Menu.Item>


                            


                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <label
                        htmlFor="toggle"
                        className="toggle-label block overflow-hidden h-6 rounded-full text-white cursor-pointer"
                    >Full Screen</label>
                    <div
                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out ${fullScreen ? 'bg-green-400' : 'bg-gray-400'
                            } rounded-full cursor-pointer`}
                        onClick={() => {
                            setFullScreen(!fullScreen)
                        }}
                    >

                        <div
                            className={`absolute left-0 inline-block w-6 h-6 transition transform duration-200 ease-in-out ${fullScreen ? 'translate-x-full bg-green-200' : 'bg-white'
                                } rounded-full shadow-md`}
                        />
                    </div>

                    <label
                        htmlFor="toggle"
                        className="toggle-label block overflow-hidden h-6 rounded-full text-white cursor-pointer"
                    >Dark Mode</label>
                    <div
                        className={`relative inline-block w-12 h-6 transition duration-200 ease-in-out ${darkMode ? 'bg-green-400' : 'bg-gray-400'
                            } rounded-full cursor-pointer`}
                        onClick={() => {
                            setDarkMode(!darkMode)
                        }}
                    >

                        <div
                            className={`absolute left-0 inline-block w-6 h-6 transition transform duration-200 ease-in-out ${darkMode ? 'translate-x-full bg-green-200' : 'bg-white'
                                } rounded-full shadow-md`}
                        />
                    </div>
                </div>}
            </div>

        </nav>

    );
};

export default Header;
