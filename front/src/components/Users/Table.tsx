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
                                        <div className="table-body-user-name">
                                            {/* <div className="user-name-img">D</div> */}
                                            <div className="user-name-wrapper">
                                                <div className="user-name">{name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="asset-email">
                                            <div>{email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="asset-role">
                                            <div>{role}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status"
                                            style={styleStatus(status)}>{status}</div>
                                    </td>
                                    <td>
                                        <div className="asset-navigation">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div className="nav-active">
                                            <button>View more</button>
                                            <button>Edit</button>
                                            <button>Delete</button>
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