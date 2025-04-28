import React from "react";

const Card = ({ title, data, footer }) => {
    return (
        <div className="border border-orange-400 rounded-md bg-[#2f2f30] flex flex-col justify-between w-full h-[360px]">
            <div>
                <div className="bg-orange-400 text-black text-center font-bold py-2 rounded-t-md">{title}</div>
                <div className="p-4 space-y-3 text-sm">
                    {data.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <span>{item.label}</span>
                            <span className="text-orange-400">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            {footer && (
                <div className="border-t border-gray-500 p-3 font-semibold flex justify-between text-sm">
                    <span>{footer.label}</span>
                    <span className="text-orange-400">{footer.value}</span>
                </div>
            )}
        </div>
    );
};

export default Card;
