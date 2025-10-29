import { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import search from "./../../assets/search.png";
import { useQuery } from "@tanstack/react-query";
import './Licences.scss'
import { selectMode } from "../../features/counter/themeSlice";
import { useAppSelector } from "../../app/hooks";

export default function Licences() {
    const mode = useAppSelector(selectMode);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const styleStatus = (status: string) => {
        switch (status) {
            case "Expired":
                return ({ backgroundColor: "#fcc3c3" });
            case "Active":
                return ({ backgroundColor: "#e1e1e1" });
            case "Expiring":
                return ({ backgroundColor: "#c5c6fc" });
            default:
                return {}
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/licences?page=${page}`)
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
        <div className={`layout ${mode ? "layout--dark" : ""}`}>
            <SideBar />
            <div className="content">
                <div className="content__wrapper">
                    <div className="navigation">
                            <div className="navigation__wrapper">
                                <div className="navigation__add" >
                                    <button>+ Add</button>
                                </div>
                                <div className="navigation__filter">
                                </div>
                                <div className="navigation__search">
                                    <input placeholder="Search" />
                                    <img src={search} alt="search" />
                                </div>
                        </div>
                    </div>

                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ASSET NAME</th>
                                    <th>COMPANY</th>
                                    <th>EXPIRED DATE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.map((value, _) => {
                                        const { _id, name, type, expiration_date, status } = value;
                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <div className="table-row">
                                                        <div className="table-row__wrapper">
                                                            <div className="table-row__element-name">{name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-row">
                                                        <div>{type}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-row">
                                                        <div>{expiration_date}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-row">
                                                        <div className="table-row__element-status" style={styleStatus(status)}>{status}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-row">
                                                        <div className="table-row__menu-toggle">
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                        <div className="table-row__menu table__row__menu--active">
                                                            <button className="button table-row__menu-item">View more</button>
                                                            <button className="button table-row__menu-item">Edit</button>
                                                            <button className="button table-row__menu-item">Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="table__footer" style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                        <div className="perpage">
                            <label htmlFor="perpage">Per page</label>
                            <select name="perpage" defaultValue={perpage} onChange={(value) => setPerpage(value.target.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="pagination">
                            <div className='pagination__wrapper'>
                                <div className="pagination__control pagination__control--prev" style={page === 1 ? { backgroundColor: "#c8ced5" } : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data.page)].map((_, index) => {
                                    return ((<div className="pagination__page pagination__page--active" key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className="pagination__control pagination__control--next" style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}