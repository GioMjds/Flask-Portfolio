import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../scss/sidebar.scss";
import ConfirmModal from "./modal/ConfirmModal";
import LogOut from "./LogOut";

const Sidebar = () => {
    const [toggle, showMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('blur-background', toggle);
        document.body.classList.toggle('no-scroll', toggle);
    }, [toggle]);

    return (
        <>
            <aside className={toggle ? "aside show-menu" : "aside"}>
                <Link to='/' >
                    <h1 className='logo-name'>G</h1>
                </Link>

                <nav className="nav">
                    <div className="nav-menu">
                        <ul className="nav-list">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">
                                    <i className="fas fa-house"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/blog" className="nav-link">
                                    <i className="fas fa-layer-group"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/certificates" className="nav-link">
                                    <i className="fas fa-certificate"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/users" className="nav-link">
                                    <i className="fas fa-users"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/profile" className="nav-link">
                                    <i className="fas fa-address-card"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <LogOut />
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="nav-footer">
                    <span className="copyright">&copy; giomjds | {new Date().getFullYear()} </span>
                </div>
            </aside>

            {showLogoutModal && (
                <ConfirmModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={() => {
                        setShowLogoutModal(false);
                    }}
                />
            )}

            <div className={toggle ? "nav-toggle nav-toggle-open" : "nav-toggle"} onClick={() => showMenu(!toggle)}>
                <i className={toggle ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
            </div>
        </>
    )
}

export default Sidebar