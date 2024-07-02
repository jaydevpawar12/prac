import React from 'react'
import { useLogoutUserMutation } from '../redux/api/authApi'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
    const [logout]=useLogoutUserMutation()
    return <>
        <Link to="/" onClick={logout} type="button" class="btn btn-primary">Logout User</Link>
        {/* <pre > {JSON.stringify(complete, null, 2)}</pre > */}
        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User ID</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>

                </tr>
            </thead>
            <tbody>
                {
                    data && data.result.map((item, i) => <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{item._id}</td>
                        <td>{item.task}</td>
                        <td>{item.desc}</td>
                        <td>{item.priority}</td>

                    </tr>)
                }
            </tbody>
        </table>
    </>
}

export default UserDashboard