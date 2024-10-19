import React from 'react'

export default function About() {
  return (
    <div className="flex flex-row bg-white items-center mx-auto text-center" id="about">
        <svg width="400" height="400" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
          <path d="M1591,566.9999999999999C1588.6666666666667,687.749008116813,1393.212023612545,887.1871673099445,1267,978.6230410217217C1140.787976387455,1070.058914733499,978.7278583247305,1186.385749107617,833.7278583247305,1115.6152422706632C688.7278583247305,1044.8447354337095,399.7424098698053,727.3830627043799,397,554.0000000000001C394.2575901301947,380.61693729562035,669.9400657725657,125.29536732424384,817.273399105899,75.31686604438437C964.6067324392322,25.338364764524897,1152.0455665176494,172.18180332824068,1280.9999999999995,254.12899232084328C1409.9544334823497,336.0761813134459,1593.3333333333333,446.2509918831868,1591,566.9999999999999C1588.6666666666667,687.749008116813,1393.212023612545,887.1871673099445,1267,978.6230410217217" fill="#273036" />
          <text className={
            "bg-gradient-to-tl from-slate-600 via-slate-100 to-slate-600 bg-clip-text text-transparent"} x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="151">About</text>
        </svg>
        <div className="mt-4 max-w-screen-md items-center mx-auto">
          <h1 className={"text-bold text-2xl mb-2"}>Create beautiful graphs from JSON data in your browser</h1>
          <p className={"text-black text-bold text-xl opacity-95 italic"} >JSONtograph is a powerful JSON visualization and manipulation tool designed to simplify the process of understanding and working with JSON data.the tool's capability to edit JSON data directly within the 2D and 3D visualization with multiple direction, allowing users to modify and update data seamlessly</p>
        </div>
      </div>
  )
}
