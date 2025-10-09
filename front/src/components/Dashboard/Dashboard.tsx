import { useState } from "react";
import SideBar from "../Sidebar/SideBar";

export default function Dashboard() {
    const [mode, setMode] = useState(false);
    return (
        <>
            <SideBar mode={{mode, setMode}}/>
        </>
    )
}