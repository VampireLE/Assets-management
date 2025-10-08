import { useEffect, useState } from "react";
import SideBar from "../Assets/Sidebar/SideBar";
import { useQuery } from "@tanstack/react-query";
import search from "./../../assets/search.png";
import "./Users.css";

export default function Users() {
    const [mode, setMode] = useState(false);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/users?page=${page}`)
            const json = await res.json();

            if (Array.isArray(json)) {
                return { data: json }
            }
            return json;
        }
    })

    useEffect(() => {
                const pages = document.querySelectorAll('.page');
                pages.forEach((value, index) => {
                    value.style.border = 'none'
                    value.style.color = 'black'
                    if (value.innerText == String(page)) {
                        value.style.border = '1px solid  #7140ff'
                        value.style.color = '#4200ff'
                    }
                })
            }, [data, page])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className={`layout ${mode ? "dark-mode" : ""}`}>
            <SideBar mode={{ mode, setMode }} />
            <div className="content">
                <div className="content-wrapper">
                    <div className="content-navigation">
                        <div className="navigation-wrapper">
                            <div className="navigation-add" >
                                <button>+ Add</button>
                            </div>
                            <div className="navigation-filtr">
                                <button>Show all</button>
                                <button>Select a Ornare</button>
                                <button>Select an Ultrices</button>
                                <button>Select an Erat</button>
                                <button>Clear All</button>
                            </div>
                        </div>
                        <div className="navigation-search">
                            <input placeholder="Search" />
                            <img src={search} alt="search" />
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
                            <tbody>
                                {
                                    data.data.map((value, _) => {
                                        const { _id, name, email, role, password } = value;
                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <div className="table-body-user-name">
                                                        {/* <div className="user-name-img">D</div> */}
                                                        <div className="user-name-wrapper">
                                                            <div className="user-name">{name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="asset-email">
                                                        <div>{email}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="asset-role">
                                                        <div>{role}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>{password}</div>
                                                </td>
                                                <td>
                                                    <div className="asset-navigation">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    <div className="nav-active">
                                                        <button>View more</button>
                                                        <button>Edit</button>
                                                        <button>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="footer-table-pagination" style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                        <div className="pagination">
                            <div className='pagination__wrapper'>
                                <div className="decrease" style={page === 1 ? { backgroundColor: "#c8ced5" } : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data.page)].map((_, index) => {
                                    return ((<div className="page" key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className="increase" style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}