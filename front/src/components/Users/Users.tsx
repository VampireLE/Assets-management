import { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import { defaultScheduler, useQuery } from "@tanstack/react-query";
import search_img from "./../../assets/search.png";
import { selectMode } from "../../features/counter/themeSlice";
import { useAppSelector } from "../../app/hooks";
import Table from "./Table";

export default function Users() {
    const mode = useAppSelector(selectMode);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedSearch(search)
        }, 400)
        return () => clearTimeout(timeOut)
    }, [search])
    
    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll, debouncedSearch],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/users?page=${page}${debouncedSearch 
                ? '&q=' + debouncedSearch 
                : ''}`)
            const json = await res.json();
            
            if (Array.isArray(json)) {
                return { data: json }
            }
            return json;
        }
    })
                
                // useEffect(() => {
                    //             const pages = document.querySelectorAll('.page');
                    //             pages.forEach((value, index) => {
                        //                 value.style.border = 'none'
                        //                 value.style.color = 'black'
                        //                 if (value.innerText == String(page)) {
                            //                     value.style.border = '1px solid  #7140ff'
                            //                     value.style.color = '#4200ff'
                            //                 }
                            //             })
                            //         }, [data, page])
                            
    
                            
    return (
        <div className={`layout ${mode ? "dark-mode" : ""}`}>
            <SideBar />
            <div className="content">
                <div className="content-wrapper">
                    <div className="content-navigation">
                        <div className="navigation-wrapper">
                            <div className="navigation-add" >
                                <button>+ Add</button>
                            </div>
                            <div className="navigation-filtr">
                            </div>
                        </div>
                        <div className="navigation-search">
                            <input 
                                value={search} 
                                placeholder="Search" 
                                onChange={(e) => setSearch(e.target.value)} />
                            <img 
                                src={search_img} 
                                alt="search" />
                        </div>
                    </div>

                    <div className="content-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>USER NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <Table data={data} isLoading={isLoading}/>
                        </table>
                    </div>
                    <div className="footer-table-pagination" style={paginationIsVisible 
                        ? { visibility: 'visible' } 
                        : { visibility: 'hidden' }}>
                        <div className="pagination">
                            <div className='pagination__wrapper'>
                                <div className="decrease" style=
                                {page === 1 
                                    ? { backgroundColor: "#c8ced5" } 
                                    : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data?.page)].map((_, index) => {
                                    return ((<div className="page" 
                                        key={index} 
                                        onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className="increase" 
                                    style={page === data?.page 
                                    ? { backgroundColor: "#c8ced5" } 
                                    : {}} onClick={() => data?.page !== page ? setPage(page + 1) : page}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}