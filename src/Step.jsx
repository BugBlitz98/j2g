import React from 'react'

export default function Step() {
  return (
    <div
        className="bg-white flex min-h-screen flex-row items-center justify-between px-10 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6"
      >
        <div className="flex">

          <div
            className="relative box-border flex flex-col gap-5 overflow-hidden rounded-xl border p-8 text-white no-underline border-black"
          >

            <div className="flex flex-col gap-2">
              <h3
                className="m-0 font-mono text-lg font-bold leading-5 text-black"
              >
                #1 Paste your JSON
              </h3>
              <p className="text-black m-0 leading-6 opacity-95">
                JSON is widely used but can be challenging to handle. This website simplifies processing JSON data with a user-friendly interface
              </p>
            </div>
          </div>
        </div>
        <div className="flex" >
          <div
            className="relative box-border flex flex-col gap-5 overflow-hidden rounded-xl border p-8 text-white no-underline border-black"
          >

            <div className="flex flex-col gap-2">
              <h3
                className="m-0 font-mono text-lg font-bold leading-5 text-black"
              >
                #2 Visualize  graph
              </h3>
              <p className="m-0 leading-6 opacity-95 text-black">
                Once the data is prepared, you can effortlessly display the values using various types of graphs and settings.
              </p>
            </div>
          </div>
        </div>
        <div className="flex" >
          <div
            className="relative box-border flex flex-col gap-5 overflow-hidden rounded-xl border p-8 text-white no-underline border-black"
          >

            <div className="flex flex-col gap-2">
              <h3
                className="m-0 font-mono text-lg font-bold leading-5 text-black"
              >
                #3 Use the graph
              </h3>
              <p className="m-0 leading-6 opacity-95 text-black">
                Once the graph is prepared, export it as an image. Additional features such as saving the graph for future use or embedding it into other websites may be introduced later
              </p>
            </div>
          </div>
        </div>


      </div>
  )
}
