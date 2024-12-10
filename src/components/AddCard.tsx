import React from 'react';

interface AddCardProps {
    title: string;
    content: string;
    buttonText: string;
    backgroundColor?: string; 
    textColor?: string;     
    btnWhite?: boolean;
}

const AddCard= ({
    title,
    content,
    buttonText,
    backgroundColor,
    textColor = 'text-black',
    btnWhite
}: AddCardProps) => {
    return (
        <div
            className={`w-full max-w-xs rounded-lg shadow-lg p-4 
    ${backgroundColor === 'bg1' ? 'bg-customBlue1' :
                    backgroundColor === 'bg2' ? 'bg-navyBlue' :
                        'bg-customBlue'} 
    ${textColor} sm:w-1/2 md:w-64 lg:w-64`}
            style={{ maxWidth: '270px'  }}
        >

            <h2 className="text-[16px] font-semibold mb-2">{title}</h2>

            <p className="mb-5 text=[14px]">{content}</p>

            <button className={`w-full py-2 px-4 ${btnWhite ? 'bg-white text-customBlue': 'bg-blue-500 text-white'}  rounded hover:bg-blue-600 mt-5`}>
                {buttonText}
            </button>
        </div>
    );
};

export default AddCard;
