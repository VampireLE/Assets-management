import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import style from "./Settings.module.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectMode, toggleMode } from "../../features/counter/themeSlice";
import Profile from "./Profile/Profile";
import General from "./General/General";
import Members from "./Members/Members";
import Integration from "./Integration/Integration";


export default function Settings({integration, setIntegration}) {

    const [activeTab, setActiveTab] = useState("profile");
    
    const darkMode = useAppSelector(selectMode);
    const dispatch = useAppDispatch()
    
    return (
        <div className={style.layout}>
            <SideBar mode={{darkMode, toggle: () => dispatch(toggleMode())}}/>
            <div className={style.content}>
                <div className={style.content__wrapper}>
                    <div className={style.header}>
                        <div>
                            <h1>Settings</h1>
                        </div>
                        <div className={style.navigation}>
                            <div
                                className={`${style.navigation__element} ${activeTab === "profile" && style['element--active']}`}
                                onClick={() => setActiveTab("profile")}
                                >Profile</div>
                            <div 
                                className={`${style.navigation__element} ${activeTab === "general" && style['element--active']}`}
                                onClick={() => setActiveTab("general")}
                                >General</div>
                            <div
                                className={`${style.navigation__element} ${activeTab === "integration" && style['element--active']}`}
                                onClick={() => setActiveTab("integration")}
                                >Integration</div>    
                            <div 
                                className={`${style.navigation__element} ${activeTab === "members" && style['element--active']}`}
                                onClick={() => setActiveTab("members")}
                                >Members</div>
                            {/* <div 
                                className  ={style.navigation__element}
                                onClick={() => setActiveTab("profile")}
                                >Integrations</div> */}
                        </div>
                        <hr />
                    </div>
                    <div className={style.section}>
                        {activeTab === "profile" && <Profile />}
                        {activeTab === "general" && <General />}
                        {activeTab === "members" && <Members />}
                        {activeTab === "integration" && <Integration integration={integration} setIntegration={setIntegration} />}
                    </div>
                </div>
                {/* <div className="darkmode">
                            <input type="checkbox" id="toggle-button" className="toggle-button" onClick={() => dispatch(toggleMode())} />
                            <label htmlFor="toggle-button"></label>
                        </div> */}
                </div>
        </div>
    )
}