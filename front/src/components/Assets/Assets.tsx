// import './Assets.scss'
import SideBar from '../Sidebar/SideBar';
import Content from './Content/Content';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMode, toggleMode } from '../../features/counter/themeSlice';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';

export default function Assets() {
    const {mode, setMode} = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    const [showPopup, setShowPopup] = useState(false);

    const token = localStorage.getItem('token');
    if (token === null) navigate('/')

    return (
        <div className={`layout ${mode ? "layout--dark" : ""}`}>
            {/* <Popup popupIsShow={showPopup} onClosePopup={() => setShowPopup(false)}/> */}
            <SideBar mode={{ mode, setMode }} />
            <Content mode={mode} setMode={() => dispatch(toggleMode())}/>
        </div>
    )
}