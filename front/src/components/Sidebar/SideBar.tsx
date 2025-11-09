import dashboard from './../../assets/dashboard.svg'
import assets from './../../assets/assets.svg'
import licences from './../../assets/certificate.svg'
import accessories from './../../assets/accessories.svg'
import logout from "./../../assets/logout.svg";
import users from "./../../assets/user.svg"
import settings from "./../../assets/settings.svg"
import dashboardDark from "./../../assets/dashboard-dark.svg"
import assetsDark from "./../../assets/assets-dark.svg"
import licencesDark from "./../../assets/certificate-dark.svg"
import accessoriesDark from "./../../assets/accessories-dark.svg"
import usersDark from "./../../assets/user-dark.svg"
import settingsDark from "./../../assets/settings-dark.svg"
import logoutDark from "./../../assets/logout-dark.svg"
import components from "./../../assets/components.svg"
import componentsDark from "./../../assets/components-dark.svg"

import style from './Sidebar.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectMode } from '../../features/counter/themeSlice';

export default function SideBar() {
    const currentMode = useAppSelector(selectMode);
    const navigate = useNavigate();
    const location = useLocation();
    const btnDropDownMenu = useRef(null);
    const others = useRef(null);
    const [dropDownMenu, setDropDownMenu] = useState('')
    const [menu, setMenu] = useState(false)
    
    useEffect(() => {
        if (!menu) return

        const closePopup = (event) => {
            if (!(others.current).contains(event?.target) && 
                !(btnDropDownMenu.current).contains(event?.target)) {
                    console.log(123)
                    setMenu(false)
                }
        }
        addEventListener('click', () => closePopup)
        
    
        return () => document.removeEventListener('click', () => closePopup)
    }, [menu])
    
    return (
        <div className={`${style.sidebar} ${currentMode ? style['sidebar--dark'] : ""}`}>
            <div className={style.sidebar__wrapper}>
                <div className={style.menu}>
                    <div className={style.menu__title}>
                        <p>MENU</p>
                    </div>
                    <div className={style.menu__wrapper}>
                        <div className={`${style.menu__item} ${location.pathname === '/dashboard' && style['menu__item--active']}`} onClick={() => navigate('/dashboard')}><img src={currentMode ? dashboardDark : dashboard} alt="" style={{ width: "20px" }} /><a
                        >Dashboard</a></div>
                        <div className={`${style.menu__item} ${location.pathname === '/assets' && style['menu__item--active']}`} onClick={() => navigate('/assets')}><img src={currentMode ? assetsDark : assets} alt="assets" style={{ width: "20px" }} /><a
                        >Assets</a></div>
                        <div className={`${style.menu__item} ${location.pathname === '/licences' && style['menu__item--active']}`} onClick={() => navigate('/licences')}><img src={currentMode ? licencesDark : licences} alt="" style={{ width: "20px" }} /><a
                        >Licences</a></div>
                        <div className={`${style.menu__item} ${location.pathname === '/accessories' && style['menu__item--active']}`} onClick={() => navigate('/accessories')}><img src={currentMode ? accessoriesDark : accessories} alt="" style={{ width: "20px" }} /><a
                        >Accessories</a></div>
                        <div className={`${style.menu__item} ${location.pathname === '/components' && style['menu__item--active']}`} onClick={() => navigate('/components')}><img src={currentMode ? components : componentsDark} alt="" style={{ width: "20px" }} /><a
                        >Components</a></div>
                        <div className={`${style.menu__item} ${location.pathname === '/users' && style['menu__item--active']}`} onClick={() => navigate('/users')}><img className={style['menu-img-users']} src={currentMode ? usersDark : users} style={{ width: "20px" }} /><a>Users</a></div>
                    </div>
                </div>
                <div ref={others} className={style.others}>
                    <div className={style.others__menu} onClick={(event) => {
                        if (event.currentTarget) {
                            setMenu(true)
                        }
                    }}>
                        <div className={style.others__avatar}>D</div>
                        <p className={style['others__menu--title']}>Delicious Burger</p>
                    </div>

                    <div ref={btnDropDownMenu} className={style.others__dropdown} style={menu ? { display: 'flex' } : { display: 'none' }}>
                            <div className={`${style.others__item} ${location.pathname === '/settings' && style['others__item--active']}`} onClick={() => navigate('/settings')}>
                                <img src={currentMode ? settingsDark : settings} alt="" />
                                <a href="">Settings</a>
                            </div>
                            <div className={style.others__item} onClick={() => navigate('/')}>
                                <img className={style['others__item-img']} src={currentMode ? logoutDark : logout} />
                                <a>Logout</a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}