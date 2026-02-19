import { useQuery } from "@tanstack/react-query";
import style from "./Members.module.scss";
import { useMemo } from "react";

function Members() {

    const token = localStorage.getItem('token')
    const {data, isLoading, isError} = useQuery({
        queryKey: ["users", "count"],
        queryFn: async () => {
            const res = await fetch("http://server:3000/users/count/local", {
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await res.json();
            return json;
        }
    })
    
    const {data: usersData, isLoading: isLoadingUsersData} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://server:3000/users", {
                method: "GET", 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await res.json();
            return json;
        }
    })

    if (isLoading && isLoadingUsersData) return <div>Loading...</div>
    
    return (
        <section className={style.members}>
            <header className={style.members__header}>
                <h2 className={style.members__title}>Members</h2>
            </header>

            <div className={style.members__content}>
                <div className={style.members__top}>
                    <p className={style.members__description}>
                        Manage team members and invitations
                    </p>

                    <button className={style.members__invite}>
                        Invite members
                    </button>
                </div>

                <div className={style.members__stats}>
                    <div className={style.members__stat}>
                        Team Members Local <span className={style.members__count}>{data?.data}</span>
                    </div>
                    <div className={style.members__stat}>
                        Pending Invitations <span className={style.members__count}>0</span>
                    </div>
                    <div className={style.members__stat}>
                        Team Member AD (Soon) <span className={style.members__count}>0</span>
                    </div>
                </div>

                <div className={style.members__list}>
                        {usersData?.data.map((value) => (
                            <div className={style.members__item} key={value._id}>
                                <div className={style.members__user}>
                                    <div className={style.members__avatar}>{value.name[0].toUpperCase()}</div>

                                    <div className={style.members__info}>
                                        <div className={style.members__name}>{value.name}</div>
                                        <div className={style.members__email}>{value.email}</div>
                                    </div>
                                </div>

                                <div>
                                    <select className={style.members__role} value={value.role}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                
            </div>
        </section>
    );
}

export default Members;
