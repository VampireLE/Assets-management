import { useState } from "react";
import SideBar from "../Assets/Sidebar/SideBar";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectMode, toggleMode } from "../../features/counter/themeSlice";


export default function Settings() {
    
    const darkMode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    
    return (
        <>
            <SideBar mode={{darkMode, toggle: () => dispatch(toggleMode())}}/>
            <div className="darkmode">
                        <input type="checkbox" id="toggle-button" className="toggle-button" onClick={() => dispatch(toggleMode())} />
                        <label htmlFor="toggle-button"></label>
                    </div>
        </>
    )
}