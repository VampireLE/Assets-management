import search from "./../../../assets/search.png";
import processor from "./../../../assets/processor.png"
import { useEffect, useRef, useState } from "react";
import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import './Content.scss';
import SideBar from "../../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import Popup from "../../Popup/Popup";

export default function Content({ mode, setMode }) {
    const [overflow, setOverflow] = useState({});
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);
    
    const [nav, setNav] = useState(null);
    const [id, setId] = useState(null);
    const [perpage, setPerpage] = useState(5);
    
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll, perpage],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/assets?page=${page}&&count=${perpage}`)
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
        const handleClick = (e) => {
            const td = e.target.parentNode;
            const navActive = td.querySelector('.nav-active');
            
            if (e.target === nav) {
                navActive.style.display = 'flex'
            } else {
                navActive.style.display = 'none'
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [nav]);

    const updateMutation = useMutation({
        mutationKey: ["assets"],
        mutationFn: async ({id, data}) => {
            await fetch(`http://localhost:3000/assets/${id}`, {
                method: 'PATCH',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
        }, onSuccess() {
            queryClient.invalidateQueries(['assets'])
        }, onError(error) {
            console.log(error)
        }
    })

    const updateAsset = (_id: number, child) => {
        const parent = ((child.parentNode).parentNode).parentNode;
        const name = parent.querySelector('.asset-name').textContent;
        const company = parent.querySelector('.asset-company').textContent;
        const contact = parent.querySelector('.asset-contact').textContent;
        const status = parent.querySelector('.status').textContent;
        updateMutation.mutate({id: _id, data: {name: 'Monitor', company, contact, status}});
    }


    const showAllBtn = () => {
        setPaginationIsVisible(false);
        setShowAll(true)
        setOverflow({ overflowX: "auto" })
    }
    if (isLoading) return <>Loading</>

    return (
        <>
            <div className="content">
                <div className="content__wrapper">
                    <div className="navigation">
                        <div className="navigation__wrapper">
                            <div className="navigation__add" onClick={() => setShowPopup(true)}>
                                <button>+ Add</button>
                            </div>
                            <div className="navigation__filter">
                            </div>
                        </div>
                        <div className="navigation__search">
                            <input placeholder="Search" />
                            <img src={search} alt="search" />
                        </div>
                    </div>

                    <div className="table" style={overflow}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ASSET NAME</th>
                                    <th>COMPANY</th>
                                    <th>CONTACT</th>
                                    <th>STATUS</th>
                                    <th>NAVIGATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.map((value, _) => {
                                        const { _id, name, company, contact, status } = value;
                                        return (
                                            <tr key={_id} className="table-row">
                                                <td className="table__row-item">
                                                    <div className="table-row__icon">
                                                        <input type="checkbox" />
                                                        <img src={processor} alt="#" />
                                                    </div>
                                                    <div className="table-row__element">{name}</div>
                                                    <div className="table-row__element">Intel i5 9400</div>
                                                </td>
                                                <td className="table__row-item">
                                                        <div>{company}</div>
                                                </td>
                                                <td className="table__row-item">
                                                    <div>{contact}</div>
                                                </td>
                                                <td className="table__row-item">
                                                    <div className="table-row__element" style={styleStatus(status)}>{status}</div>
                                                </td>
                                                <td className="table__row-item">
                                                    <div className="table-row__menu-toggle" onClick={(e) => setNav(e.target)}>
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    <div className="table-row__menu table__row__menu--active">
                                                        <button>View more</button>
                                                        <button data-id={_id} onClick={(event) => updateAsset(event.target.getAttribute('data-id'), event.target)}>Edit</button>
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

                    <div className="notifications">
                        Asset has been added
                    </div>
                </div>
            </div>
        </>
    )
}