import './Assets.css'
import SideBar from './Sidebar/SideBar';
import Content from './Content/Content';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMode, toggleMode } from '../../features/counter/themeSlice';


export default function Assets() {
    const mode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    
    return (
        <div className={`layout ${mode ? "dark-mode" : ""}`}>
            <Content mode={mode} setMode={dispatch(toggleMode())}/>
        </div>
    )
}
