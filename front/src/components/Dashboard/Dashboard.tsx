import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import style from './Dashboard.module.scss'
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
    const [tab, setTab] = useState(1);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {data: assetsLength, isLoading: isLoadingAssets} = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/assets/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const json = await res.json();
            return json;
        }
    })

    const {data: licencesLength, isLoading: isLoadinglicences} = useQuery({
        queryKey: ["licences"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/licences/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: accessoriesLength, isLoading: isLoadingAccessories} = useQuery({
        queryKey: ["accessories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/accessories/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: componentsLength, isLoading: isLoadingComponents} = useQuery({
        queryKey: ["components"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/components/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token') 
                }
            });
            const json = await res.json();
            return json;
        } 
    })

    const {data: usersLength, isLoading: isLoadingUsers} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/users/count", {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    if (isLoadingAssets 
        && isLoadinglicences
        && isLoadingAccessories
        && isLoadingComponents
        && isLoadingUsers
    
    ) return <div>Loading</div>
    
    return (
        <div className={style.layout}>
            <SideBar />
        </div>
    )
}