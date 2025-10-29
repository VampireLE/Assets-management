import './Assets.scss'
import SideBar from '../Sidebar/SideBar';
import Content from './Content/Content';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMode, toggleMode } from '../../features/counter/themeSlice';
import { useNavigate } from 'react-router-dom';


export default function Assets() {
    const mode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    if (token === null) navigate('/')

    return (
        <div className={`layout ${mode ? "layout--dark" : ""}`}>
            <Content mode={mode} setMode={() => dispatch(toggleMode())}/>
        </div>
    )
}