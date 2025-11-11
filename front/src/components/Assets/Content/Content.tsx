import search from "./../../../assets/search.png";
import processor from "./../../../assets/processor.png"
import { useEffect, useRef, useState } from "react";
import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from './Content.module.scss';
import SideBar from "../../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import Popup from "../../Popup/Popup";

export default function Content({ mode, setMode, onOpenPopup }) {
    const [overflow, setOverflow] = useState({});
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);

    const [nav, setNav] = useState(null);
    const [id, setId] = useState(null);
    const [perpage, setPerpage] = useState(10);
    const rowMenu = useRef(null);
    const table = useRef(null);
    const [showMenu, setShowMenu] = useState(false); 
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
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

    useEffect(() => {

        const menu = document.querySelector(`${style["table-row__menu"]}`)
        const menuActive = document.querySelector(`${style["table-row__menu--active"]}`)
        const buttons = document.querySelectorAll(`.${style['table-row__menu-toggle']}`);
        const rowMenu = document.querySelectorAll(`.${style["table-row__menu"]}`);

        const clickOutside = () => {
            const menuActive = document.querySelectorAll(`.${style["table-row__menu--active"]}`)
            menuActive.forEach((el) => {
                el.style.display = 'none'
            })
        }

        const openMenu = (event) => {
            const td = (((event.target).parentNode).parentNode)
            const btnActive = td.querySelector(`.${style["table-row__menu--active"]}`)
            rowMenu.forEach((el) => {
                el.style.display = 'none'
            })
            setShowMenu(true)
            btnActive.style.display = 'flex'
        }

        const toggleMenu = (event) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains(style['table-row__menu-toggle']) &&
                target !== menu &&
                target !== menuActive
            ) {
                setShowMenu(false)
                clickOutside()
            }
        }

        buttons.forEach((button, _) => {
            button.addEventListener('click', openMenu)
        })

        document.addEventListener('click', toggleMenu)

        return () => {
            buttons.forEach((el) => {
                el.removeEventListener('click', openMenu)
            })
            
            document.removeEventListener('click', toggleMenu)
        }
    }, [data])

    useEffect(() => {
        if (table.current)
        console.log((table.current).offsetHeight)
    }, [showMenu])

    const styleStatus = (status: string) => {
        switch (status) {
            case "Broken":
                return ({ backgroundColor: "#fcc3c3", width: '70px', height: '20px', borderRadius: '10px', lineHeight: '20px', border: '1px solid #ff4f4fff' });
            case "In stock":
                return ({ backgroundColor: "#e1e1e1", width: '70px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #5a5a5aff' });
            case "Issued":
                return ({ backgroundColor: "#c5c6fc", width: '70px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #5b5effff' });
            case "Ready for pickup":
                return ({ backgroundColor: "#fcedc5", width: '150px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #ffbb00ff' });
            default:
                return {}
        }
    }

    const updateMutation = useMutation({
        mutationKey: ["assets"],
        mutationFn: async ({ id, data }) => {
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
        updateMutation.mutate({ id: _id, data: { name: 'Monitor', company, contact, status } });
    }


    const showAllBtn = () => {
        setPaginationIsVisible(false);
        setShowAll(true)
        setOverflow({ overflowX: "auto" })
    }
    if (isLoading) return <>Loading</>

    return (
        <>
            <div className={style.content}>
                <div className={style.content__wrapper}>
                    <div className={style.navigation}>
                        <div className={style.navigation__wrapper}>
                            <div className={style.navigation__add} onClick={() => onOpenPopup(true)}>
                                <button>+ Add</button>
                            </div>
                            <div className={style.navigation__filter}>
                            </div>
                        </div>
                        <div className={style.navigation__search}>
                            <img src={search} alt="search" />
                            <input placeholder="Search" />
                        </div>
                    </div>
                    <div className={style.table__wrapper}>

                        <table ref={table} className={style.table} style={overflow}>
                            <thead>
                                <tr className={style.table__cell}>
                                    <th>ASSET NAME</th>
                                    <th>COMPANY</th>
                                    <th>CONTACT</th>
                                    <th>STATUS</th>
                                    <th>NAVIGATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.map((value, _) => {
                                        const { _id, name, company, contact, status } = value;
                                        return (
                                            <tr key={_id} className={style['table-row']}>
                                                <td className={style['table__row-item']}>
                                                    <div className={style["table-row__icon"]}>
                                                        <img src={processor} alt="#" />
                                                    </div>
                                                    <div>
                                                        <div className={style["table-row__element"]}>{name}</div>
                                                        <div className={style["table-row__element"]}>Intel i5 9400</div>
                                                    </div>
                                                </td>
                                                <td className={style["table__row-item"]}>
                                                    <div>{company}</div>
                                                </td>
                                                <td className={style["table__row-item"]}>
                                                    <div>{contact}</div>
                                                </td>
                                                <td className={style["table__row-item"]}>
                                                    <div className={style["table__row-wrapper"]}>
                                                        <div className={style["table-row__element"]} style={styleStatus(status)}>
                                                            {status}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={style["table__row-item"]}>
                                                    <div ref={rowMenu} className={style["table__row-wrapper"]}>
                                                        <div className={style["table-row__menu-toggle"]}>
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                    </div>
                                                    <div className={`${style["table-row__menu"]} ${style["table-row__menu--active"]}`}>
                                                        <div className={style["table-row__menu-item"]}>View more</div>
                                                        <div className={style["table-row__menu-item"]} data-id={_id} onClick={(event) => updateAsset(event.target.getAttribute('data-id'), event.target)}>Edit</div>
                                                        <div className={style["table-row__menu-item"]} data-id={_id} onClick={(event) => deleteMutation.mutate(event.target.getAttribute('data-id'))}>Delete</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className={style.table__footer} style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                        <div className={style.perpage}>
                            <label htmlFor={style.perpage}>Per page</label>
                            <select name="perpage" defaultValue={perpage} onChange={(value) => setPerpage(value.target.value)}>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="150">150</option>
                                <option value="200">200</option>
                            </select>
                        </div>
                        <div className={style.pagination}>
                            <div className={style.pagination__wrapper}>
                                <div className={`${style.pagination__control} ${style['pagination__control--prev']}`} style={page === 1 ? {} : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                {[...Array(data.page)].map((_, index) => {
                                    return ((<div className={`${style.pagination__page} ${style["pagination__page--active"]}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                })}

                                <div className={`${style.pagination__control} ${style["pagination__control--next"]}`} style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                            </div>
                        </div>
                    </div>

                    <div className={style.notifications}>
                        Asset has been added
                    </div>
                </div>
            </div>
        </>
    )
}