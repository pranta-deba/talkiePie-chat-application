import { X } from 'lucide-react';
import React from 'react';

const Modals = ({ handleClosedModel }) => {
    return (
        <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] overflow-auto">
            <div
                className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.8)]"
                onClick={() => handleClosedModel(false)}
            ></div>

            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative z-10">
                <div className="flex items-center pb-3 border-b border-gray-300">
                    <h3 className="text-slate-900 text-xl font-semibold flex-1">Modal Title</h3>
                    <X
                        onClick={() => handleClosedModel(false)}
                        className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500"
                    />
                </div>

                <div className="my-6">
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
                        Maecenas Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.
                    </p>
                </div>

                <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                    <button
                        onClick={() => handleClosedModel(false)}
                        className="px-4 py-2 rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modals;