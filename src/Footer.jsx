

const Footer = () => {
    
    return (
        <>


            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="1" d="M0,128L48,149.3C96,171,192,213,288,234.7C384,256,480,256,576,256C672,256,768,256,864,213.3C960,171,1056,85,1152,64C1248,43,1344,85,1392,106.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <div className="sm:flex sm:items-center sm:justify-between bg-[#273036]">
                <div

                    className="flex flex-row items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                >

                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl "><span className="bg-gradient-to-tl from-slate-600 via-slate-100 to-slate-600 bg-clip-text text-transparent"
                    >JSON2GRAPH</span></h2>
                </div>


            </div>

            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 bg-[#273036]">
                © 2024{" "}
                <a href="#" className="hover:underline">
                    json2graph.com
                </a>
                . All Rights Reserved. | Created by <a href="https://www.linkedin.com/in/animesh-manna-428633157/">@animesh</a>
            </span>


        </>
    );
};

export default Footer;