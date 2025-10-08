import dashboard from './../../../assets/dashboard.svg'
import assets from './../../../assets/assets.svg'
import licences from './../../../assets/certificate.svg'
import accessories from './../../../assets/accessories.svg'
import logout from "./../../../assets/logout.svg";
import users from "./../../../assets/user.svg"
import settings from "./../../../assets/settings.svg"
import dashboardDark from "./../../../assets/dashboard-dark.svg"
import assetsDark from "./../../../assets/assets-dark.svg"
import licencesDark from "./../../../assets/certificate-dark.svg"
import accessoriesDark from "./../../../assets/accessories-dark.svg"
import usersDark from "./../../../assets/user-dark.svg"
import settingsDark from "./../../../assets/settings-dark.svg"
import logoutDark from "./../../../assets/logout-dark.svg"

import './Sidebar.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBar({mode}) {
    const {darkMode: currentMode, toggleMode} = mode;
    const navigate = useNavigate();
    const location = useLocation();
    const btnDropDownMenu = useRef(null);
    const [dropDownMenu, setDropDownMenu] = useState('')
    const [menu, setMenu] = useState(false)
    
    
    useEffect(() => {
        const handleDropDownmenu = (event) => {
            if (event.target !== btnDropDownMenu.current && event.target !== document.querySelector('.btn-drop-down-menu')) {
                setMenu(false)
            }
        }
        if (menu) {
            window.removeEventListener('click', (event) => handleDropDownmenu())
        }
        window.addEventListener('click', (event) => handleDropDownmenu(event))
    }, [menu])

    return (
        <div className={`sidebar ${currentMode ? "mode-dark" : ""}`}>
            <div className="sidebar-menu">
                <div className="menu-text">
                    <p>MENU</p>
                </div>
                <div className="menu-wrapper">
                    <div className={`menu ${location.pathname === '/dashboard' && 'active'}`} onClick={() => navigate('/dashboard')}><img src={currentMode ? dashboardDark : dashboard} alt="" style={{width: "20px"}}/><a
                        >Dashboard</a></div>
                    <div className={`menu ${location.pathname === '/assets' && 'active'}`} onClick={() => navigate('/assets')}><img src={currentMode ? assetsDark : assets} alt="assets" style={{width: "20px"}}/><a
                        >Assets</a></div>
                    <div className={`menu ${location.pathname === '/licences' && 'active'}`} onClick={() => navigate('/licences')}><img src={currentMode ? licencesDark : licences} alt="" style={{width: "20px"}}/><a
                        >Licences</a></div>
                    <div className={`menu ${location.pathname === '/accessories' && 'active'}`} onClick={() => navigate('/accessories')}><img src={currentMode ? accessoriesDark : accessories} alt="" style={{width: "20px"}}/><a
                        >Accessories</a></div>
                    <div className={`menu ${location.pathname === '/users' && 'active'}`} onClick={() => navigate('/users')}><img className='menu-img-users' src={currentMode ? usersDark : users} style={{width: "20px"}}/><a>Users</a></div>
                </div>
            </div>
            <div className="sidebar-others">
                {/* <div className="others-text">
                                <p>OTHERS</p>
                            </div>
                            <div className="others-wrapper">
                                <div className="menu-others"><img src={setting} alt="" /><a
                                    href="#">Settings</a></div>
                                <div className="menu-others"><img src="/assets/images/accounts.png" alt="" /><a
                                    href="#">Accounts</a></div>
                            </div> */}
                <div ref={btnDropDownMenu} className="drop-down-menu" style={menu ? {display: 'block'} : {display: 'none'}}>
                    <div className={`menu menu-settings ${location.pathname === '/settings' && 'active'}`} onClick={() => navigate('/settings')}>
                        <img src={currentMode ? settingsDark : settings} alt="" />
                        <a href="">Settings</a>
                    </div>
                    <div className="menu" onClick={() => navigate('/')}>
                        <img className="logout-img" src={currentMode ? logoutDark : logout} />
                        <a>Logout</a>
                    </div>
                </div>
                <div className="menu btn-drop-down-menu" onClick={() => setMenu(true)}>
                    <div className="sidebar-name-circle">D</div>
                    <p>Delicious Burger</p>
                </div>
            </div>
        </div>
    )
}