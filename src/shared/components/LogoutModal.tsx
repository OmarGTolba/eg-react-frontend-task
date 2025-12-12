import React from "react";
import { Button } from "./Button";


interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
        <p className="text-gray-600">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
