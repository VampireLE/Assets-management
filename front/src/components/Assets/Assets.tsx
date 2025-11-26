// import './Assets.scss'
import SideBar from '../Sidebar/SideBar';
import Content from './Content/Content';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMode, toggleMode } from '../../features/counter/themeSlice';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import style from "./Assets.module.scss";
import { Tooltip } from 'chart.js';
import SideDrawer from './Tooltip/SideDrawer';

export const SideDrawerContext = createContext(null);
export const CellDataContext = createContext(null);
export const TypeActionContext = createContext(null);

export default function Assets() {
    const mode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [typeAction, setTypeAction] = useState(null);
    
    const [showPopup, setShowPopup] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const token = localStorage.getItem('token');
    const sideDrawerOverlay = useRef(null);

    const [cellData, setCellData] = useState({});

    if (token === null) navigate('/')

    useEffect(() => {
        const outSedeDrawerClick = ((event) => {
            if (sideDrawerOverlay.current && !sideDrawerOverlay.current.contains(event.target)) {
                setShowSideDrawer(false)
            }
        })
        
        document.addEventListener('mousedown', outSedeDrawerClick);

        return (() => {
            document.removeEventListener('mousedown', outSedeDrawerClick)
        })
    }, [])

    return (
        <div className={`${style.layout} ${mode ? style["layout--dark"] : ""}`}>
            <SideDrawerContext value={{showSideDrawer, setShowSideDrawer, typeAction, setTypeAction}}>
                <CellDataContext value={{cellData, setCellData}}>
                    <Popup popupIsShow={showPopup} onClosePopup={() => setShowPopup(false)}/>
                    <SideBar mode={mode} toggleMode={() => dispatch(toggleMode())} />
                    <Content
                        mode={mode} 
                        setMode={() => dispatch(toggleMode())}
                        onOpenPopup={() => setShowPopup(true)}
                        />
                    {showSideDrawer && (<SideDrawer
                        setShowSideDrawer={() => setShowSideDrawer(false)}
                        sideDrawerOverlay={sideDrawerOverlay}
                    />)}
                </CellDataContext>
            </SideDrawerContext>
        </div>
    )
}