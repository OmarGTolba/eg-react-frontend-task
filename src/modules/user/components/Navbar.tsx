import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { useLogout } from "../../../shared/hooks/useLogout";
import { LogoutModal } from "../../../shared/components/LogoutModal";

import { FaRegUserCircle } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const { handleLogout } = useLogout();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmLogout = () => {
    handleLogout();
    closeModal();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link to="/app" className="text-xl font-bold">MyApp</Link>

  
        <div className="flex items-center gap-4">
          <LogoutModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmLogout} />
        </div>
  
        <div className="flex gap-4 items-center">
         <FaRegUserCircle size={35} />
<div>

          <Button onClick={openModal}>Logout</Button>
</div>
   
        </div>
  
    </nav>
  );
};
