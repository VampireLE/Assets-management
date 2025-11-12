import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import style from './Dashboard.module.scss'
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Content from "./Content/Content";

export default function Dashboard() {
    
    return (
        <div className={style.layout}>
            <SideBar />
            <Content />
        </div>
    )
}