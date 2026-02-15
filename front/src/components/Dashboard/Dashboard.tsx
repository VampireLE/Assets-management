import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import style from './Dashboard.module.scss'
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Content from "./Content/Content";

export default function Dashboard() {

    const {} = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const req = await fetch('http://localhost:3000/dashboard', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })

            const json = req.json();
            return json;
        }
    })
    
    return (
        <div className={style.layout}>
            <SideBar />
            <Content />
        </div>
    )
}