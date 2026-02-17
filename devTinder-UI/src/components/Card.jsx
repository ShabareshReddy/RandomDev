import React from 'react'
import img from '../../public/image.png'

const Card = ({ arrow = 'right' }) => {
    return (
        <div className="relative w-52 bg-white rounded-3xl p-4 shadow-md">

            {/* ARROW */}
            {arrow === 'right' && (
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 
          border-t-8 border-b-8 border-l-8 
          border-t-transparent border-b-transparent border-l-white" />
            )}

            {arrow === 'left' && (
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 
          border-t-8 border-b-8 border-r-8 
          border-t-transparent border-b-transparent border-r-white" />
            )}

            {arrow === 'top' && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-8 border-r-8 border-b-8 
          border-l-transparent border-r-transparent border-b-white" />
            )}

            {arrow === 'bottom' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
          border-l-8 border-r-8 border-t-8 
          border-l-transparent border-r-transparent border-t-white" />
            )}

            {/* IMAGE */}
            <div className="h-30 w-3/4 mx-auto overflow-hidden bg-blue-300 rounded-2xl">
                <img src={img} alt="" className="h-full w-full object-cover" />
            </div>

            {/* TEXT */}
            <h3 className="mt-3 font-semibold text-gray-900 text-sm">
                Mohan Reddy
            </h3>

            <p className="text-gray-500 text-xs mt-1">
                Software Developer
            </p>

            {/* TAG */}
            <div className="flex items-center gap-2 mt-3 bg-red-100 px-3 py-1 rounded-full w-fit">
                <div className="h-5 w-5 bg-red-400 rounded-full flex items-center justify-center text-white text-xs">
                    🛍️
                </div>
                <span className="text-red-500 font-medium text-sm">$26.72</span>
            </div>

        </div>
    )
}

export default Card