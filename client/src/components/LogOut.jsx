import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import ConfirmModal from "./modal/ConfirmModal"

const LogOut = () => {
    const { logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const openModal = () => setShowLogoutModal(true);
    const closeModal = () => setShowLogoutModal(false);

    const handleLogout = () => {
        logout();
        closeModal();
    }

    return (
        <>
            <button
                className="nav-link"
                onClick={openModal}
                style={{ color: 'red' }}
            >
                <i className="icon-logout"></i>
            </button>

            {showLogoutModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleLogout}
                />
            )}
        </>
    )
}

export default LogOut