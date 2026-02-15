import { useEffect, useEffectEvent, useRef, useState } from "react";
import style from "./Profile.module.scss";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

function Profile() {
    const ref = useRef(null);
    const {register, handleSubmit} = useForm();
    const fileReader = new FileReader();

    const [preview, serPreview] = useState(null);
    const onSubmit = (data) => {
        console.log(data)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        serPreview(url);
    }
    const token = localStorage.getItem('token');
    
    const {data, isSuccess, isError} = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const data = await fetch('http://localhost:3000/profile', {
                method: 'POST',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await data.json();
            return json
        }
    })
    
    if (!isSuccess) return
    const {_id, email, name, role, status} = data.body;

    return (
        <section className={style.section}>
            <div className={style.section__wrapper}>
                <div className={style.section__header}>
                    <div className={style.section__text}>
                        <h2>Profile</h2>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)} 
                    className={style.form}
                >
                    <div className={style.form__title}>
                        <div>
                            <div className={style.form__icon}
                                onClick={() => ref.current.click()}
                            >
                                {preview ? <div className={style['form__icon--name']}>
                                    <img src={preview}/>
                                </div> : <div className={style['form__icon--name']}>D</div>}
                                <input
                                    {...register("icon")} 
                                    onChange={handleFileChange}
                                    ref={ref} 
                                    style={{display: 'none'}} 
                                    type="file" 
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className={style.field__container}>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Name</label>
                                <input className={style.form__input} type="text" value={name}/>
                            </div>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Surname</label>
                                <input className={style.form__input} type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={style.form__info}>
                        <div className={style.form__field}>
                            <label className={style.form__label} htmlFor="">Location</label>
                            <input className={style.form__input} type="text" />
                        </div>
                        <div className={style.form__field}>
                            <label className={style.form__label} htmlFor="">Email</label>
                            <input className={style.form__input} type="mail" value={email}/>
                        </div>
                        <div className={style.form__field}>
                            <label className={style.form__label} htmlFor="">Language</label>
                            <select className={style.form__input} name="" id="">
                                <option value="">English</option>
                                <option value="">Russian</option>
                            </select>
                        </div>
                        <div className={style.form__field}>
                            <label className={style.form__label} htmlFor="">Number</label>
                            <input className={style.form__input} type="text" />
                        </div>
                        <div className={style.form__field}>
                            <div className={style.submit}>Update</div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile;