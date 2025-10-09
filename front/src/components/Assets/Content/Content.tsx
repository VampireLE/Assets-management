import search from "./../../../assets/search.png";
import processor from "./../../../assets/processor.png"
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import './Content.css';
import SideBar from "../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";

export default function Content({ mode, setMode }) {
    const [overflow, setOverflow] = useState({});
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [nav, setNav] = useState(null);
    const [id, setId] = useState(null);
    
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/assets?page=${page}`)
            const json = await res.json();

            if (Array.isArray(json)) {
                return { data: json }
            }
            return json;
        }
    })

    const deleteMutation = useMutation({
        mutationKey: ["assets"],
        mutationFn: async (_id) => {
            await fetch(`http://localhost:3000/assets/${_id}`, {
                method: "DELETE"
            })
        }, onSuccess() {
            queryClient.invalidateQueries(["assets"]);
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

    useEffect(() => {
        const assetsNavigation = document.querySelectorAll('.asset-navigation');
        assetsNavigation.forEach((assetNavigation) => {
            assetNavigation.addEventListener('mouseover', (event) => {
                const td = event.currentTarget.parentNode;
                const navActive = td.querySelector('.nav-active');
                
                if (event.currentTarget === nav || event.currentTarget === navActive) {
                    navActive.style.display = 'flex'
                }
            })
            assetNavigation.addEventListener('mouseout', (event) => {
                
                const td = event.target.parentNode;
                const navActive = td.querySelector('.nav-active');
                setTimeout(() => {
                    if (navActive) navActive.style.display = 'none';
                        setNav(null);
                    }, 1000)
                })
        })
    }, [nav])


    const showAllBtn = () => {
        setPaginationIsVisible(false);
        setShowAll(true)
        setOverflow({ overflowX: "auto" })
    }
    if (isLoading) return <>Loading</>

    return (
        <>
            <Popup popupIsShow={showPopup} onClosePopup={() => setShowPopup(false)}/>
            <SideBar mode={{ mode, setMode }} />
            <div className="content">
                <div className="content-wrapper">
                    <div className="content-navigation">
                        <div className="navigation-wrapper">
                            <div className="navigation-add" onClick={() => setShowPopup(true)}>
                                <button>+ Add</button>
                            </div>
                            <div className="navigation-filtr">
                            </div>
                        </div>
                        <div className="navigation-search">
                            <input placeholder="Search" />
                            <img src={search} alt="search" />
                        </div>
                    </div>

                    <div className="content-table" style={overflow}>
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
                                        const { _id, name, company, contact, status } = value;
                                        return (
                                            <tr key={_id}>
                                                <td>
                                                    <div className="table-body-asset-name">
                                                        <div className="asset-name-img"><img src={processor}
                                                            alt="#" /></div>
                                                        <div className="asset-name-wrapper">
                                                            <div className="asset-name">{name}</div>
                                                            <div className="asset-name-model">Intel i5 9400</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="asset-company">
                                                        <div>{company}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="asset-contact">
                                                        <div>{contact}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div></div>
                                                    <div className="status" style={styleStatus(status)}>{status}</div>
                                                </td>
                                                <td>
                                                    {/* onMouseOut={() => console.log(123)} */}
                                                    <div className="asset-navigation" onMouseOverCapture={(e) => setNav(e.target)}>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    <div className="nav-active">
                                                        <button>View more</button>
                                                        <button>Edit</button>
                                                        <button data-id={_id} onClick={(event) => deleteMutation.mutate(event.target.getAttribute('data-id'))}>Delete</button>
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
                    <div className="notifications">
                        Asset has been added
                    </div>
                </div>
            </div>
        </>
    )
}