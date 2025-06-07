"use client"
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from "react";
import { useStored } from './store/useStore';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Store state
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

    const handleScrollToContent = () => {
        const viewportHeight = window?.innerHeight || document?.documentElement?.clientHeight;
        window?.scrollTo({
            top: viewportHeight,
            behavior: 'smooth'
        });
    };

    const handleDownload = async () => {
        setIsDownload(!isDownload);
    };

    const ToggleSwitch = ({ label, enabled, onChange }) => (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-300">{label}</span>
            <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                    enabled ? 'bg-indigo-600' : 'bg-gray-600'
                }`}
                onClick={onChange}
                aria-label={`Toggle ${label}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );

    const IconButton = ({ onClick, children, label, className = "" }) => (
        <button
            className={`h-9 w-9 rounded-lg border border-gray-600 bg-gray-800/50 p-2 text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${className}`}
            onClick={onClick}
            aria-label={label}
        >
            {children}
        </button>
    );

    const DropdownMenu = ({ buttonText, children }) => (
        <Menu as="div" className="relative">
            <Menu.Button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-800/50 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                <span>{buttonText}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
                <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 border border-gray-700 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                        {children}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );

    const MenuItem = ({ onClick, children, active }) => (
        <Menu.Item>
            {({ active: isActive }) => (
                <button
                    className={`group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive || active
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </Menu.Item>
    );

    if (!getStarted) {
        return (
            <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={() => setStarted(!getStarted)}
                            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
                        >
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                JSON2GRAPH
                            </h1>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a
                                    href="#howitworks"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
                                >
                                    How it Works
                                </a>
                                <a
                                    href="#about"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 text-sm font-medium"
                                >
                                    About
                                </a>
                                <a
                                    href="https://jsonviewer.tools?utm_source=json2graph.com"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                >
                                    Upgrade
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
                                <a
                                    href="#howitworks"
                                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                                >
                                    How it Works
                                </a>
                                <a
                                    href="#about"
                                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                                >
                                    About
                                </a>
                                <a
                                    href="https://jsonviewer.tools?utm_source=json2graph.com"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white block px-3 py-2 text-base font-medium rounded-lg"
                                >
                                    Upgrade
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => setStarted(!getStarted)}
                        className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
                    >
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            JSON2GRAPH
                        </h1>
                    </button>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <IconButton
                                onClick={handleScrollToContent}
                                label="Scroll to content"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </IconButton>

                            <IconButton
                                onClick={handleDownload}
                                label="Download"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </IconButton>

                            <a
                                href="https://buymeacoffee.com/animeshmanna"
                                className="h-9 w-9 rounded-lg border border-gray-600 bg-gray-800/50 p-2 text-gray-300 transition-colors hover:border-gray-500 hover:bg-gray-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Environment / Coffee"> <path id="Vector" d="M4 20H10.9433M10.9433 20H11.0567M10.9433 20C10.9622 20.0002 10.9811 20.0002 11 20.0002C11.0189 20.0002 11.0378 20.0002 11.0567 20M10.9433 20C7.1034 19.9695 4 16.8468 4 12.9998V8.92285C4 8.41305 4.41305 8 4.92285 8H17.0767C17.5865 8 18 8.41305 18 8.92285V9M11.0567 20H18M11.0567 20C14.8966 19.9695 18 16.8468 18 12.9998M18 9H19.5C20.8807 9 22 10.1193 22 11.5C22 12.8807 20.8807 14 19.5 14H18V12.9998M18 9V12.9998M15 3L14 5M12 3L11 5M9 3L8 5" stroke="#f3eded" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                            </a>
                        </div>

                        {/* Dropdown Menus */}
                        <div className="hidden md:flex items-center gap-2">
                            <DropdownMenu buttonText="Direction">
                                <MenuItem onClick={() => setDirection(viewType === '3d' ? 'forceDirected3d' : 'forceDirected2d')}>
                                    Force Directed
                                </MenuItem>
                                <MenuItem onClick={() => setDirection(viewType === '3d' ? 'radialOut3d' : 'radialOut2d')}>
                                    Radial Out
                                </MenuItem>
                                <MenuItem onClick={() => setDirection(viewType === '3d' ? 'treeLr3d' : 'treeLr2d')}>
                                    Tree Left-Right
                                </MenuItem>
                                <MenuItem onClick={() => setDirection(viewType === '3d' ? 'treeTd3d' : 'treeTd2d')}>
                                    Tree Top-Down
                                </MenuItem>
                            </DropdownMenu>

                            <DropdownMenu buttonText={viewType === '3d' ? '3D View' : '2D View'}>
                                <MenuItem onClick={() => { setView('3d'); setDirection('forceDirected3d'); }}>
                                    3D View
                                </MenuItem>
                                <MenuItem onClick={() => { setView('2d'); setDirection('forceDirected2d'); }}>
                                    2D View
                                </MenuItem>
                            </DropdownMenu>

                            <DropdownMenu buttonText={animation || 'Control'}>
                                <MenuItem onClick={() => setAnimation('pan')}>Pan</MenuItem>
                                <MenuItem onClick={() => setAnimation('rotate')}>Rotate</MenuItem>
                                <MenuItem onClick={() => setAnimation('orbit')}>Orbit</MenuItem>
                            </DropdownMenu>
                        </div>

                        {/* Toggle Switches */}
                        <div className="hidden lg:flex items-center gap-6">
                            <ToggleSwitch
                                label="Full Screen"
                                enabled={fullScreen}
                                onChange={() => setFullScreen(!fullScreen)}
                            />
                            <ToggleSwitch
                                label="Dark Mode"
                                enabled={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                        </div>

                        {/* CTA Button */}
                        <a
                            href="https://jsonviewer.tools/editor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
                        >
                            <span>New Editor</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;