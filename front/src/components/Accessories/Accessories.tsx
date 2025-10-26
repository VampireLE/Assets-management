import { useEffect, useState } from "react";
import SideBar from "../Sidebar/SideBar";
import { useQuery } from "@tanstack/react-query";
import search from "./../../assets/search.png";
import { selectMode } from "../../features/counter/themeSlice";
import { useAppSelector } from "../../app/hooks";

export default function Accessories() {
    const mode = useAppSelector(selectMode);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const styleStatus = (status: string) => {
        switch (status) {
            case "Broken":
                return ({ backgroundColor: "#fcc3c3" });
            case "In stock":
                return ({ backgroundColor: "#e1e1e1" });
            case "Issued":
                return ({ backgroundColor: "#c5c6fc" });
            case "Ready for pickup":
                return ({ backgroundColor: "#fcedc5", width: "150px" });
            default:
                return {}
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/accessories?page=${page}`)
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
                    <div className="navigations">
                        <div className="navigations__wrapper">
                            <div className="navigations__add" >
                                <button>+ Add</button>
                            </div>
                            <div className="navigations__filtr">
                            </div>
                        </div>
                        <div className="navigations__search">
                            <input placeholder="Search" />
                            <img src={search} alt="search" />
                        </div>
                    </div>

                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ASSET NAME</th>
                                    <th>COMPANY</th>
                                    <th>CONTACT</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.map((value, _) => {
                                        const { _id, name, category, company, status } = value;
                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <div className="table__asset-name">
                                                        <div className="table__asset__name-img"><img/></div>
                                                        <div className="table__asset-name-wrapper">
                                                            <div className="table__asset-name">{name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table__asset-company">
                                                        <div>{category}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table__asset-contact">
                                                        <div>{company}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div></div>
                                                    <div className="table__status" style={styleStatus(status)}>{status}</div>
                                                </td>
                                                <td>
                                                    <div className="table__asset-navigation">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    <div className="table__nav-active-btns">
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

                    <div className="table__footer" style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                        <div className="pagination">
                            <div className='pagination__wrapper'>
                                <div className="pagination__decrease" style={page === 1 ? { backgroundColor: "#c8ced5" } : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data.page)].map((_, index) => {
                                    return ((<div className="pagination__page" key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className="pagination__increase" style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}