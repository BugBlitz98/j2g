import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export default function InfoModal({setIsOpen,isOpen,setStarted}) {


  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false);
    
};

const handleImageClick = (action) => {
    alert(`You clicked: ${action}`);
    setIsOpen(false);
};

  return (
    <>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl bg-gray-400 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
               Choose Style
              </DialogTitle>
            {/* Grid with clickable images */}
            <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className="cursor-pointer group rounded-lg overflow-hidden border border-gray-700 hover:shadow-lg hover:scale-105 transition-transform"
                                        onClick={() =>{
                                            setStarted(true)
                                            setIsOpen(false)
                                        }}
                                    >
                                        <img
                                            src="https://ik.imagekit.io/qsj9rwkvv/Screenshot%202024-12-17%20at%2010.24.50%E2%80%AFPM.png?updatedAt=173445455508"
                                            alt="Option 1"
                                            className="object-cover w-full h-32"
                                        />
                                        <p className="text-center mt-2 text-sm text-white group-hover:text-yellow-400">
                                           Graph
                                        </p>
                                    </div>
                                    <div
                                        className="cursor-pointer group rounded-lg overflow-hidden border border-gray-700 hover:shadow-lg hover:scale-105 transition-transform"
                                        onClick={() => {
                                            window.location.href = 'https://jsonviewer.tools/editor';
                                        }}
                                    >
                                        <img
                                            src="https://ik.imagekit.io/qsj9rwkvv/Screenshot%202024-12-17%20at%2010.27.14%E2%80%AFPM.png?updatedAt=1734454658079"
                                            alt="Option 2"
                                            className="object-cover w-full h-32"
                                        />
                                        <p className="text-center mt-2 text-sm text-white group-hover:text-yellow-400">
                                           Flow
                                        </p>
                                    </div>
                                </div>

                                {/* Footer Button */}
                                <div className="mt-6 text-center">
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
