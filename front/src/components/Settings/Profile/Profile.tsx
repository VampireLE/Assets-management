    import { useEffect, useEffectEvent, useRef, useState } from "react";
    import style from "./Profile.module.scss";
    import { useForm } from "react-hook-form";
    import { useMutation, useQuery } from "@tanstack/react-query";

    function Profile() {
        const ref = useRef(null);
        const token = localStorage.getItem('token');
        const [preview, serPreview] = useState(null);
        const fileReader = new FileReader();

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

        const {_id, 
            icon,
            name,
            surname,
            email,
            role,
            status,
            number,
            language,
            password,
        } = isSuccess ? data.body : {};

        const {register, handleSubmit, setValue, reset} = useForm({
                defaultValues: {
                    name,
                    surname,
                    email,
                    number
                }
            });

        useEffect(() => {
            if (isSuccess && data?.body) {
                reset(data.body)
            }
        }, [isSuccess, data, reset])

        const onSubmit = (data) => {
            const formData = data
            // const formData = new FormData();
            // formData.append("profile_id", _id)
            // formData.append("data", data)
            // Object.keys(data).forEach((key) => {
            //     if (key !== "icon") {
            //         formData.append(key, data[key])
            //     }
            // })
            mutation.mutate(formData)
        }
        
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            setValue("icon", file)
            const url = URL.createObjectURL(file);
            
            serPreview(url);
        }

        const mutation = useMutation({
            mutationKey: ["profile"],
            mutationFn: async (formData) => {
                const response = await fetch('http://localhost:3000/profile', {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                return await response.json()
            },
            onSuccess: (ans) => {
                console.log(ans)
            }
        })
        
        if (!isSuccess) return
        
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
                            <div className={style.title__wrapper}>
                                <div className={style.form__icon}
                                    onClick={() => ref.current.click()}
                                >
                                    {preview ? <div className={style['form__icon--name']}>
                                        <img src={preview}/>
                                    </div> : <div className={style['form__icon--name']}>D</div>}
                                    <input
                                        // {...register("icon")} 
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
                                    <input
                                    {...register("name")}
                                    className={style.form__input} type="text"/>
                                </div>
                                <div className={style.form__field}>
                                    <label className={style.form__label} htmlFor="">Surname</label>
                                    <input 
                                    {...register("surname")}
                                    className={style.form__input} type="text" />
                                </div>
                            </div>
                        </div>
                        <div className={style.form__info}>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Location</label>
                                <select
                                className={style.form__input} name="" id="">
                                    <option value="Ru">Ru</option>
                                    <option value="Eng">Eng</option>
                                </select>
                            </div>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Email</label>
                                <input
                                {...register("email")}
                                className={style.form__input} type="mail"/>
                            </div>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Language</label>
                                <select
                                {...register("language")}
                                className={style.form__input} name="" id="">
                                    <option value="English">English</option>
                                    <option value="Russian">Russian</option>
                                </select>
                            </div>
                            <div className={style.form__field}>
                                <label className={style.form__label} htmlFor="">Number</label>
                                <input
                                {...register("number")}
                                className={style.form__input} type="tel"/>
                            </div>
                            <div className={style.form__field}>
                                <input className={style.submit} type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }

    export default Profile;