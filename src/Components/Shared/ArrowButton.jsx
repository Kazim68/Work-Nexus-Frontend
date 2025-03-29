import React from "react";

const ArrowButton = ({ text , className }) => {
    return (
        <div className={`${className}`}>
            <button
                className="bg-teal-600 text-center w-full h-[52px] rounded-lg relative text-white text-xl font-semibold group transition-all duration-500 overflow-hidden"
                type="button"
            >
                {/* Arrow Box - Hidden by default, appears on hover */}
                <div
                    className="bg-white rounded-xl h-[52px] w-1/4 flex items-center justify-center absolute left-1 
          group-hover:w-[184px] group-hover:bg-white-600 group-hover:opacity-100 opacity-0 z-10 duration-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                        className="fill-teal group-hover:fill-teal transition-all duration-500"
                    >
                        <path d="M800 480H160a32 32 0 1 0 0 64h640a32 32 0 0 0 0-64z"></path>
                        <path d="M786.752 512 521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L786.752 512z"></path>
                    </svg>
                </div>

                {/* Button Text */}
                <p className="group-hover:translate-x-2 transition-all duration-500">
                    {text}
                </p>
            </button>
        </div>
    );
};

export default ArrowButton;
