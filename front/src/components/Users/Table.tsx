export default function Table({ data, isLoading }) {

    const styleStatus = (status: string) => {
        switch (status) {
            case "active":
                return ({ backgroundColor: "#c5c6fc" });
            case "block":
                return ({ backgroundColor: "#fcc3c3" });
            default:
                return {}
        }
    }

    return (
        <tbody>
            {
                data?.data?.map((value, _) => {
                    const { _id, name, email, role, status, password } = value;
                    if (!isLoading) {

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
                                            <div>{email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-row">
                                            <div>{role}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-row"
                                            style={styleStatus(status)}>{status}</div>
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
                    }
                })
            }
        </tbody>
    )
}