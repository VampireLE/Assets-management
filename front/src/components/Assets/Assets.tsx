// import './Assets.scss'
import SideBar from '../Sidebar/SideBar';
import Content from '../Content/Content';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMode, toggleMode } from '../../features/counter/themeSlice';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import style from "./Assets.module.scss";
import { Tooltip } from 'chart.js';
import SideDrawer from '../Tooltip/SideDrawer';
import { useQuery } from '@tanstack/react-query';

export const SideDrawerContext = createContext(null);
export const CellDataContext = createContext(null);
export const TypeActionContext = createContext(null);

type ActionType = 'create' | 'update' | 'clone' | null;

export default function Assets() {
    const mode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [typeAction, setTypeAction] = useState<ActionType>(null);
    
    const [showPopup, setShowPopup] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const token = localStorage.getItem('token');
    const sideDrawerOverlay = useRef(null);
    const [cellData, setCellData] = useState({});
    
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token])

    const {isError, isSuccess, data} = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const req = await fetch('http://localhost:3000/assets',{
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        })
            if (req.status === 401) {
                throw new Error("Unauthorized");
            }
            return req.json();
        }
        
    })
   

    useEffect(() => {
        const outSideDrawerClick = ((event) => {
            if (sideDrawerOverlay.current && !sideDrawerOverlay.current.contains(event.target)) {
                setShowSideDrawer(false)
            }
        })
        
        document.addEventListener('mousedown', outSideDrawerClick);

        return (() => {
            document.removeEventListener('mousedown', outSideDrawerClick)
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