import React, { useState } from "react";
import { useLogout } from "../../../shared/hooks/useLogout";
import { LogoutModal } from "../../../shared/components/LogoutModal";

export const Sidebar: React.FC = () => {
  const { handleLogout } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  return (
    <aside className="w-64 fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between">

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Admin</h2>
      </div>


      <div className="p-6 border-t border-gray-200">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-left bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg text-gray-700 font-medium"
        >
          Logout
        </button>
      </div>



       
           <LogoutModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmLogout} />
          

    </aside>
  );
};
