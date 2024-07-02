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
function App() {

  const animation = useStored((state) => state.animation);
  const [mode, setMode] = useState('orbit');
  const [jsonData, setJSON] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const isDownload = useStored((state) => state.isDownload);
  const setIsDownload = useStored((state) => state.setIsDownload);
  const fullScreen = useStored((state) => state.fullScreen);
  const ref = useRef(null);

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


  const lightTheme = {
    canvas: {
      background: '#fff',
      fog: '#fff'
    },
    node: {
      fill: '#342905',
      activeFill: '#1DE9AC',
      opacity: 1,
      selectedOpacity: 1,
      inactiveOpacity: 0.2,
      label: {
        color: '#000',
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
      fill: '#000',
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
      fill: '#000',
      activeFill: '#000'
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
  return (
    <><header> <Header /></header>
      <main className="flex h-[calc(100vh-84px)] w-full flex-row md:flex-row items-center mx-auto bg-white">

        <Allotment
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
              className="order-1 lg:order-2 from-white  relative  bg-white to-white">
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
                  theme="white"
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
        </Allotment>







      </main>
      <Step />
      <About />
      <footer> <Footer /></footer></>
  );
}

export default App;
