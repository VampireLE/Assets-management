import { useState } from "react";
import SideBar from "../Assets/Sidebar/SideBar";

export default function Dashboard() {
    const [mode, setMode] = useState(false);
    return (
        <>
            <SideBar mode={{mode, setMode}}/>
        </>
    )
}