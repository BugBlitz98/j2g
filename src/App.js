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
    if (jsonSizeInBytes > 200000) {
      alert('Your JSON data exceeds the limit, maximum 200KB');
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
      background: darkMode?'#000':'#fff',
      fog: '#fff'
    },
    node: {
      fill: '#342905',
      activeFill: '#1DE9AC',
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 0.2,
      label: {
        color:  darkMode?'#fff':'#000',
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
      fill:  darkMode?'#fff':'#000',
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
      fill:  darkMode?'#fff':'#000',
      activeFill:  darkMode?'#fff':'#000'
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
  },[darkMode]);
  return (
    <>
      <Helmet>
        <title>Online JSON to Graph Visualization</title>
      </Helmet>
      <Helmet>"
        <meta name="description" content="Free online transfrom json to stunning 2d and 3d graph visualization with our json2graph tools.easily understand and download the graph.try it now" />
      </Helmet>
      <Helmet>
        <meta property="og:title" content="JSON to Graph Visualization" />
        <meta property="og:description" content="convert json to stunning 2d and 3d graph visualization with our json2graph tools" />
        <meta property="og:image" content={"https://www.json2graph.com/logo.png"} />
        <meta property="og:url" content={"https://www.json2graph.com"} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Helmet>
        <meta name="twitter:title" content={"JSON to Graph Visualization"} />
        <meta name="twitter:description" content={"convert json to stunning 2d and 3d graph visualization with our json2graph tools"} />
        <meta name="twitter:image" content={"https://www.json2graph.com/logo.png"} />
      </Helmet>
      {isLoading ? <Loader /> : <><header> <Header /></header>
        <main className="mb-4 flex h-[calc(100vh-84px)] w-full flex-row md:flex-row items-center mx-auto bg-white">

         {getStarted && <Allotment
            className="!relative flex h-[calc(100vh-84px)]"
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
                className={darkMode?"order-1 lg:order-2 from-white  relative bg-black to-white":"order-1 lg:order-2 from-white bg-white  relative to-white"}>
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
                    theme={darkMode?"hc-black":"white"}
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
          </Allotment>}

          {!getStarted && <>
            <section className="mt-20 bg-white">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent md:text-5xl lg:text-6xl ">Transform JSON into Interactive 3D Graphs</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 bg-gradient-to-tl from-slate-700 via-slate-950 to-gray-950 bg-clip-text text-transparent">Quickly turn your JSON data into stunning, interactive 3D graphs. Explore, zoom, and analyze your data with ease—perfect for developers and data enthusiasts looking to visualize information effortlessly</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            
            <button onClick={()=>{
              setIsOpen(true)
              //setStarted(!getStarted)
              }} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
               Get Started
            </button>  
        </div>

        {/* <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
  <span className="font-bold text-gray-500 uppercase tracking-wider">Powered By</span>
  <div className="flex flex-wrap justify-center items-center mt-8 text-gray-600">
    <a href="https://x.com/BlitzBug98" className="flex items-center space-x-3 mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
      <img src="https://www.jsonviewer.tools/logo.png" className="" width={70} alt="jsonviewer.tools logo" />
      <span className="text-lg font-semibold">jsonviewer.tools</span>
    </a>
  </div>
</div> */}

    </div>
</section>
          </>
}

<InfoModal setIsOpen={setIsOpen} isOpen={isOpen} setStarted={setStarted}/>



        </main>
        <Step />
        <About />
        <footer> <Footer /></footer>
       
        </>
        
        }</>
  );
}

export default App;
