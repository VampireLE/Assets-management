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
        queryKey: ["users", page, showAll, debouncedSearch],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/users`, {
                headers: {
                    'Authorisation': 'Bearer ' + localStorage.getItem('token') 
                }
            });
            const json = await res.json();
            console.log(json)
            // const res = await fetch(`http://localhost:3000/users`, {
            //         headers: {
            //             'Authorization': 'Bearer ' + localStorage.getItem('token'),
            //             'Content-Type': 'application/json'
            //         }
            //     })
            // const json = await res.json();
            
            // if (Array.isArray(json)) {
            //     return { data: json }
            // }
            // return json;
        }
    })
    // console.log(data)            
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
        <div className={`layout ${mode ? "layout--dark" : ""}`}>
            <SideBar />
            <div className="content">
                <div className="content__wrapper">
                    <div className="navigation">
                        <div className="navigation__wrapper">
                            <div className="navigation__add" >
                                <button className="navigation__button">+ Add</button>
                            </div>
                            <div className="navigation__filter">
                            </div>
                        </div>
                        <div className="navigation__search">
                            <input
                                className="navigation__search-input"
                                value={search} 
                                placeholder="Search"
                                onChange={(e) => setSearch(e.target.value)} />
                            <img 
                                className="navigation__search-icon"
                                src={search_img} 
                                alt="search" />
                        </div>
                    </div>
                    <div className="table">
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
                    <div className="table__footer" style={paginationIsVisible 
                        ? { visibility: 'visible' } 
                        : { visibility: 'hidden' }}>
                        <div className="pagination">
                            <div className="perpage">
                                <label htmlFor="perpage">Per page</label>
                                {/* <select name="perpage" defaultValue={perpage} onChange={(value) => setPerpage(value.target.value)}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> */}
                            </div>
                            <div className='pagination__wrapper'>
                                <div className="pagination__control pagination__control--prev" style=
                                {page === 1
                                    ? { backgroundColor: "#c8ced5" } 
                                    : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data?.page)].map((_, index) => {
                                    return ((<div className="pagination__page pagination__page--active" 
                                        key={index} 
                                        onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className="pagination__control pagination__control--next" 
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