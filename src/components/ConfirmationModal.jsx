// src/components/ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        // Backdrop: Covers the entire screen and is clickable to close the modal
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} // Close modal on backdrop click
        >
            {/* Modal Content Box */}
            <div 
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside it
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    {/* Cancel Button */}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium"
                    >
                        Cancel
                    </button>
                    {/* Confirm (Logout) Button */}
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;