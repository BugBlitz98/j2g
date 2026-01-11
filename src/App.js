import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Step from './Step';
import About from './About';
import { Allotment } from 'allotment';
import { GraphCanvas } from 'reagraph';
import { Editor } from '@monaco-editor/react';
import { useStored } from './store/useStore';
import { useEffect, useRef, useState } from 'react';
import "allotment/dist/style.css";
import Loader from './Loader';
import { Helmet } from 'react-helmet';
import InfoModal from './components/InfoModal';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Analytics } from "@vercel/analytics/react"
function App() {

  const animation = useStored((state) => state.animation);
  const [mode, setMode] = useState('orbit');
  const [jsonData, setJSON] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const isDownload = useStored((state) => state.isDownload);
  const setIsDownload = useStored((state) => state.setIsDownload);
  const fullScreen = useStored((state) => state.fullScreen);
  const [isLoading, setIsLoading] = useState(true);
  const darkMode = useStored((state) => state.darkMode);
  const getStarted = useStored((state) => state.getStarted);
  const setStarted = useStored((state) => state.setStarted);
  const [kok, setKok] = useState(0);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const direction = useStored((state) => state.direction);
  const transformToReaflowFormat = (data) => {
    let nodes = [];
    let edges = [];

    const traverse = (obj, parentId = null, key) => {
      if (typeof obj === 'object' && obj !== null) {

        const nodeId = `${Math.random().toString(36).substr(2, 9)}`;  // Create a random ID for the node
        nodes.push({
          id: nodeId,
          label: Array.isArray(obj) ? `${key ? key : 'Array'}(${obj.length})` : `{${key ? key : 'ROOT'}}`,
        });

        if (parentId) {
          edges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId
          });
        }

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            traverse(obj[key], nodeId, key);
          }
        }
      } else {
        const nodeId = `${Math.random().toString(36).substr(2, 9)}`;  // Create a random ID for the node
        nodes.push({
          id: nodeId,
          label: `${obj}`,
        });

        if (parentId) {
          edges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId
          });
        }
      }
    };

    traverse(data);

    return { nodes, edges };
  };


  const [isOpenM, setIsOpenM] = useState(false);

  // Open modal after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpenM(true);
    }, 10000); // 10 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpenM(false);
  };

  const json = {
    "family": {
      "father": {
        "name": "Michael",
        "age": 50,
        "occupation": "Engineer"
      },
      "mother": {
        "name": "Jessica",
        "age": 48,
        "occupation": "Teacher"
      },
      "children": [
        {
          "name": "Emily",
          "age": 20,
          "occupation": "Student",
          "children": [
            {
              "name": "Sophie",
              "age": 2,
              "relationship": "Grandchild"
            }
          ]
        },
        {
          "name": "Daniel",
          "age": 18,
          "occupation": "Student"
        },
        {
          "name": "Grace",
          "age": 15,
          "occupation": "Student"
        }
      ],
      "pets": [
        {
          "name": "Max",
          "species": "Dog",
          "age": 5
        },
        {
          "name": "Whiskers",
          "species": "Cat",
          "age": 3
        }
      ]
    }
  };

  useEffect(() => {


    const { nodes, edges } = json ? transformToReaflowFormat(json) : { nodes: [], edges: [] };
    setNodes(nodes)
    setEdges(edges)

    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout duration as needed
  }, []);

  function handleEditorChange(value, event) {
    let jsonSizeInBytes = new Blob([value]).size;
    if (jsonSizeInBytes > 20000) {
      setIsOpenM(true);
      // Optionally, you can store a message to show in the modal if you want to customize it
      // setModalMessage('Your JSON data exceeds the limit, maximum 20KB. Upgrade for more.');
      return false;
    }
    const { nodes, edges } = value ? transformToReaflowFormat(JSON.parse(value)) : { nodes: [], edges: [] };
    setNodes(nodes)
    setEdges(edges)

  }

  useEffect(() => {
    if (isDownload) {
      setIsDownload(false);
      // console.log('den')
      const data = ref.current.exportCanvas();
      const link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('target', '_blank');
      link.setAttribute('download', 'json2graph.png');
      link.click();

    }

  }, [isDownload])


  const lightTheme = {
    canvas: {
      background: darkMode ? '#000' : '#fff',
      fog: '#fff'
    },
    node: {
      fill: '#342905',
      activeFill: '#1DE9AC',
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 0.2,
      label: {
        color: darkMode ? '#fff' : '#000',
        activeColor: '#1DE9AC'
      },
      subLabel: {
        color: '#2A6475',
        stroke: '#eee',
        activeColor: '#1DE9AC'
      }
    },
    lasso: {
      border: '1px solid #55aaff',
      background: 'rgba(75, 160, 255, 0.1)'
    },
    ring: {
      fill: '#D8E6EA',
      activeFill: '#1DE9AC'
    },
    edge: {
      fill: darkMode ? '#fff' : '#000',
      activeFill: '#1DE9AC',
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 0.1,
      label: {
        stroke: '#fff',
        color: '#2A6475',
        activeColor: '#1DE9AC'
      }
    },
    arrow: {
      fill: darkMode ? '#fff' : '#000',
      activeFill: darkMode ? '#fff' : '#000'
    },
    cluster: {
      stroke: '#D8E6EA',
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 0.1,
      label: {
        stroke: '#fff',
        color: '#2A6475'
      }
    }
  };

  useEffect(() => {

    setKok(prevKey => prevKey + 1)
  }, [darkMode]);
  return (
    <>
      <Helmet>
        <title>JSON to Graph Visualization | Transform JSON into Interactive 3D Graphs</title>
        <meta name="description" content="Free online tool to transform JSON data into stunning 2D and 3D graph visualizations. Easily understand complex data structures and download interactive graphs. Try it now!" />
        <meta name="keywords" content="json to graph, json visualizer, json 3d graph, json viewer, json graph visualization, json network graph, json data visualization, interactive json graph" />
        <meta name="author" content="JSON2Graph" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.json2graph.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.json2graph.com/" />
        <meta property="og:title" content="JSON to Graph Visualization | Transform JSON into Interactive 3D Graphs" />
        <meta property="og:description" content="Free online tool to transform JSON data into stunning 2D and 3D graph visualizations. Easily understand complex data structures and download interactive graphs." />
        <meta property="og:image" content="https://www.json2graph.com/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="JSON2Graph" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.json2graph.com/" />
        <meta name="twitter:title" content="JSON to Graph Visualization | Transform JSON into Interactive 3D Graphs" />
        <meta name="twitter:description" content="Free online tool to transform JSON data into stunning 2D and 3D graph visualizations. Easily understand complex data structures and download interactive graphs." />
        <meta name="twitter:image" content="https://www.json2graph.com/preview.png" />
      </Helmet>
      {isLoading ? <Loader /> : <><header> <Header /></header>


        {getStarted &&
          <main className="mb-4 flex h-[calc(100vh-73px)] w-full flex-row md:flex-row items-center mx-auto ">
            <Allotment
              className="!relative flex h-[calc(100vh-73px)]"
              proportionalLayout={false}
            >
              {!fullScreen && <Allotment.Pane
                className="h-full bg-white dark:bg-vsdark-500 dark:text-white"
                preferredSize={450}
                minSize={100}
                maxSize={800}
                visible={true}
              >
                <div
                  className={darkMode ? "order-1 lg:order-2 from-white  relative bg-black to-white" : "order-1 lg:order-2 from-white bg-white  relative to-white"}>
                  <div className="flex flex-row">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
                  </div>
                  <div className="px-4 lg:px-8 py-3">
                    <div className="flex flex-row space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-600"></div>
                      <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <Editor
                      className="h-screen md:h-full"
                      language="json"
                      theme={darkMode ? "hc-black" : "white"}
                      height="90vh"
                      // defaultValue={data}
                      value={JSON.stringify(json, null, 2)}
                      // onMount={handleEditorDidMount}
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>
              </Allotment.Pane>}
              <Allotment.Pane
                className="h-full bg-white dark:bg-vsdark-500 dark:text-white"

                visible={true}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0
                }}>

                  {Array.isArray(nodes) && nodes.length > 0 && <GraphCanvas
                    ref={ref}
                    key={kok}
                    nodes={nodes}
                    edges={edges}
                    theme={lightTheme}
                    cameraMode={animation}
                    layoutType={direction}
                    sizingType="centrality"

                  //draggable 
                  >
                    <directionalLight position={[0, 5, -4]} intensity={3} />
                  </GraphCanvas>}
                </div>

              </Allotment.Pane>
            </Allotment></main>}

        {!getStarted && <>
          <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 py-20 md:py-32">
            {/* Animated background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500 blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-500 blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500 blur-3xl opacity-10"></div>
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative py-12 px-4 mx-auto max-w-7xl text-center z-10">
              {/* Decorative element with animation */}
              <div className="mb-8 inline-block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="relative">
                  <svg className="w-16 h-16 mx-auto text-indigo-400 drop-shadow-lg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
                </div>
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-7xl">
                <span className="block bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent animate-gradient">
                  Transform JSON into
                </span>
                <span className="block mt-2 bg-gradient-to-r from-pink-300 via-purple-400 to-blue-300 bg-clip-text text-transparent animate-gradient" style={{ animationDelay: '0.5s' }}>
                  Interactive Graphs
                </span>
              </h1>

              <p className="mb-12 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 max-w-4xl mx-auto leading-relaxed">
                Quickly turn your JSON data into stunning, interactive <span className="text-purple-300 font-semibold">2D and 3D graphs</span>. Explore, zoom, and analyze your data with ease—perfect for developers and data enthusiasts looking to visualize information effortlessly.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col mb-12 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6">
                <button
                  onClick={() => {
                    setStarted(true)
                    setIsOpen(false)
                  }}
                  className="group inline-flex justify-center items-center py-4 px-10 text-base font-semibold text-center text-white bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 rounded-xl hover:from-purple-600 hover:via-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300/50 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transform"
                  aria-label="Start using the JSON to Graph editor"
                >
                  <span>Get Started Free</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>

                <a 
                  href='https://jsonviewer.tools?utm_source=json2graph.com'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex justify-center items-center py-4 px-10 text-base font-semibold text-center text-indigo-100 rounded-xl border-2 border-indigo-400/50 hover:border-indigo-300 hover:bg-indigo-800/30 focus:ring-4 focus:ring-indigo-300/20 transition-all duration-300 backdrop-blur-sm hover:scale-105 transform"
                  aria-label="Upgrade to premium features"
                >
                  <span>Upgrade to Pro</span>
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </a>
              </div>

              {/* Feature pills with hover effects */}
              <div className="flex flex-wrap justify-center gap-3 mt-12">
                <span className="px-5 py-2.5 rounded-full bg-indigo-900/60 text-indigo-200 text-sm font-medium backdrop-blur-md border border-indigo-700/40 hover:bg-indigo-800/80 hover:border-indigo-600/60 transition-all duration-300 hover:scale-105 cursor-default">⚡ Real-time Updates</span>
                <span className="px-5 py-2.5 rounded-full bg-indigo-900/60 text-indigo-200 text-sm font-medium backdrop-blur-md border border-indigo-700/40 hover:bg-indigo-800/80 hover:border-indigo-600/60 transition-all duration-300 hover:scale-105 cursor-default">🎨 Customizable Views</span>
                <span className="px-5 py-2.5 rounded-full bg-indigo-900/60 text-indigo-200 text-sm font-medium backdrop-blur-md border border-indigo-700/40 hover:bg-indigo-800/80 hover:border-indigo-600/60 transition-all duration-300 hover:scale-105 cursor-default">🌐 3D Visualization</span>
                <span className="px-5 py-2.5 rounded-full bg-indigo-900/60 text-indigo-200 text-sm font-medium backdrop-blur-md border border-indigo-700/40 hover:bg-indigo-800/80 hover:border-indigo-600/60 transition-all duration-300 hover:scale-105 cursor-default">💾 Export Options</span>
              </div>

              {/* Stats section */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-slate-800/40 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">100%</div>
                  <div className="text-sm text-gray-400 mt-2">Free to Use</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">2D & 3D</div>
                  <div className="text-sm text-gray-400 mt-2">Visualizations</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">Fast</div>
                  <div className="text-sm text-gray-400 mt-2">Processing</div>
                </div>
                <div className="bg-slate-800/40 backdrop-blur-sm border border-indigo-800/30 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Easy</div>
                  <div className="text-sm text-gray-400 mt-2">Export</div>
                </div>
              </div>
            </div>
          </section>
          </main>
        </>
        }


        <Transition appear show={isOpenM} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            {/* Modal Content */}
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {/* Modal Image */}
                    <img
                      src="https://ik.imagekit.io/qsj9rwkvv/Screenshot%202025-04-18%20at%204.57.32%E2%80%AFPM.png?updatedAt=1745685453045"
                      alt="Advanced Features"
                      className="w-full h-68 object-cover rounded-md mb-4"
                    />

                    {/* Modal Title */}
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Try Advanced Features
                    </Dialog.Title>

                    {/* Modal Description */}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Visualization of JSON Data with jsonviewer.tools. Explore advanced features like real-time updates, customizable views,more advance 3d visualization and ai features. Upgrade now for enhanced functionality and export options.
                      </p>
                    </div>

                    {/* Close Button */}
                    <div className="flex mt-4 gap-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={() => {
                          window.open('https://jsonviewer.tools?utm_source=json2graph.com', '_blank');
                          setIsOpenM(false);
                        }}
                      >
                        Upgrade
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                        onClick={closeModal}
                      >
                        Not Now
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <InfoModal setIsOpen={setIsOpen} isOpen={isOpen} setStarted={setStarted} />




        <Step />
        <About />
        <footer> <Footer /></footer>
        <Analytics/>
      </>

      }</>
  );
}

export default App;
