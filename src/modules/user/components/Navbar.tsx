import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { useAppSelector } from "../../../shared/hooks/reduxHooks";
import { useLogout } from "../../../shared/hooks/useLogout";
import { LogoutModal } from "../../../shared/components/LogoutModal";


export const Navbar: React.FC = () => {
  const { handleLogout } = useLogout();
  const { user } = useAppSelector(state => state.auth);
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

      {user ? (
        <div className="flex items-center gap-4">
          <span>Welcome, {user.name}</span>
          <Button onClick={openModal}>Logout</Button>
          <LogoutModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmLogout} />
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};
