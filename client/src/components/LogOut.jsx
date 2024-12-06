import { useState } from "react";
import ConfirmModal from "./modal/ConfirmModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useMyContext } from "../contexts/MyContext";

const LogOut = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const openModal = () => setShowLogoutModal(true);
    const closeModal = () => setShowLogoutModal(false);
    const { setIsAuthenticated } = useMyContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
    }

    const logOut = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
                credentials: 'include',
            })
            if (response.ok) {
                localStorage.removeItem('session_id');
                setIsAuthenticated(false);
                navigate('/login');
            }
        } catch (e) {
            alert(`An error occurred during logout: ${e}`);
        }
    }

    return (
        <>
            <NavLink
                className="nav-link"
                onClick={openModal}
                style={{ color: 'red' }}
            >
                <i className="icon-logout"></i>
            </NavLink>

            {showLogoutModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleLogout}
                    prompt='Are you sure you want to log out?'
                />
            )}
        </>
    )
}

export default LogOut