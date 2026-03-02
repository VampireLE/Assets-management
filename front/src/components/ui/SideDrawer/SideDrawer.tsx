import style from "./SideDrawer.module.scss"

function SideDrawer({
    open,
    onClose,
    title,
    children,
    actions,
    width = 520
}) {

    if (!open) return null;

    return (
        <div className={style.drawer}>

            <div
                className={style.drawer__wrapper}
                onClick={onClose}
            />

            <div
                className={style.drawer__panel}
                style={{ width }}
            >

                <div className={style.drawer__header}>

                    <h2 className={style.drawer__title}>
                        {title}
                    </h2>

                    <div className={style.drawer__actions}>
                        {actions}
                    </div>

                </div>

                <div className={style.drawer__body}>
                    {children}
                </div>

            </div>

        </div>
    );

}

export default SideDrawer;