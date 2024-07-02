import React, { useState } from 'react'
import { useDeleteTodoMutation, useDeleteUserMutation, useGetTodoQuery, useGetUsersQuery, useRegisterTodoMutation, useRegisterUserMutation, useUpdateTodoMutation, useUpdateUserMutation } from '../redux/api/adminApi'
import { useLogoutAdminMutation } from '../redux/api/authApi'

const AdminDash = () => {
    // user////////////////////////////////////////
    const { user } = useGetUsersQuery()
    const [addUser] = useRegisterUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [logout] = useLogoutAdminMutation()   
    const [userData, setUserData] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    const handleUserChange = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleUserSubmit = e => {
        e.preventDefault()
        addUser(userData)
    }



    const [todoData, setTodoData] = useState({})
    const [selectedTodo, setSelectedTodo] = useState({})
    const [addTodo] = useRegisterTodoMutation()
    const { data: todo } = useGetTodoQuery()
    const [deleteTodo] = useDeleteTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const handleTodoChange = e => {
        const { name, value } = e.target
        setTodoData({ ...todoData, [name]: value })
    }
    const handleTodoSubmit = e => {
        e.preventDefault()
        addTodo(todoData)
    }
    return <div className='container p-2'>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        {/* User  */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            ADD User
        </button>

        <Link to="/" onClick={logout} class="btn btn-primary ms-auto" >
                logout Admin
            </Link>

        <div className="modal fade" id="exampleModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">Signup</div>
                                        <form onSubmit={handleUserSubmit}>
                                            <div className="card-body">

                                                <div>
                                                    <label htmlFor="name" className="form-label">First name</label>
                                                    <input
                                                        onChange={handleUserChange}
                                                        type="text"
                                                        name='name'
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Enter your name"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please choose a username.</div>
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="email" className="form-label">First Email</label>
                                                    <input
                                                        onChange={handleUserChange}
                                                        name='email'
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Enter Your Email"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please choose a username.</div>
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input
                                                        onChange={handleUserChange}
                                                        name='password'
                                                        type="text"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Enter Your Password"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please choose a password.</div>
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                                    <input
                                                        onChange={handleUserChange}
                                                        name='mobile'
                                                        type="number"
                                                        className="form-control"
                                                        id="mobile"
                                                        placeholder="enter Mobile Number"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">
                                                        Please Recheck Your Password.
                                                    </div>
                                                </div>
                                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100 mt-3">
                                                    Signup
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <table className="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">team</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    user && user.result.map((item, i) => <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.teamId.map(c => <span key={c.name}>{c.name}</span>)}</td>
                        <td className='d-flex gap-2'>
                            <button data-bs-toggle="modal" data-bs-target="#editUserModal" data-bs-dismiss="modal" type="button" onClick={e => setSelectedUser(item)} className="btn btn-primary">
                                Edit
                            </button>
                            <button type="button" onClick={e => deleteUser(item._id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

        <div className="modal fade" id="editUserModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label htmlFor="name" className="form-label">First name</label>
                            <input
                                onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                value={selectedUser.name}
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Please choose a username.</div>
                        </div>
                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                value={selectedUser.email}
                                name="email"
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Please choose a username.</div>
                        </div>
                        <div>
                            <label htmlFor="team" className="form-label">Team name</label>
                            <input
                                onChange={e => setSelectedUser({ ...selectedUser, team: e.target.value })}
                                value={selectedUser.team}
                                name="team"
                                type="text"
                                className="form-control"
                                id="team"
                                placeholder="Enter your team"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Please choose a team name.</div>
                        </div>
                        <button type="submit" onClick={e => updateUser(selectedUser)} className="btn btn-primary">Edit User</button>
                    </div>
                </div>
            </div>
        </div>



        {/* Todo */}
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#todoModal">
            Add Todo
        </button>


        <div class="modal fade" id="todoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">Signup</div>
                                        <form onSubmit={handleTodoSubmit} >
                                            <div className='d-flex gap-2'>


                                                <select name="userId" class="form-select" onChange={handleTodoChange}>
                                                    <option selected>Select User</option>
                                                    {
                                                        user && user.result.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                                                    }
                                                </select>
                                            </div>

                                            <div class="card-body">
                                                <div>
                                                    <label for="task" class="form-label">First task</label>
                                                    <input
                                                        onChange={handleTodoChange}
                                                        name="task"
                                                        type="text"
                                                        class="form-control"
                                                        id="task"
                                                        placeholder="Enter your task"
                                                    />
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please choose a username.</div>
                                                </div>
                                                <div class="mt-2">
                                                    <label for="desc" class="form-label">Description</label>
                                                    <input
                                                        onChange={handleTodoChange}
                                                        name="desc"
                                                        type="text"
                                                        class="form-control"
                                                        id="desc"
                                                        placeholder="Enter Your Description"
                                                    />
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please choose a username.</div>
                                                </div>
                                                <div class="mt-2">
                                                    <label for="priority" class="form-label">Priority</label>
                                                    <input
                                                        onChange={handleTodoChange}
                                                        name="priority"
                                                        type="text"
                                                        class="form-control"
                                                        id="priority"
                                                        placeholder="Enter Your Priority"
                                                    />
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">Please choose a password.</div>
                                                </div>

                                                <button type="submit" data-bs-dismiss="modal" class="btn btn-primary w-100 mt-3">
                                                    Add TODO
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task</th>
                    <th scope="col">desc</th>
                    <th scope="col">User</th>
                    <th scope="col">priority</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    todo && todo.result.map((item, i) => <tr>
                        <td>{i + 1}</td>
                        <td>{item.task}</td>
                        <td>{item.desc}</td>
                        <td>{item.userId.map(pre => <span>{pre.name}</span>)}</td>
                        <td>{item.priority}</td>
                        <td className='d-flex gap-2'>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#editTodoModal" onClick={e => setSelectedTodo(item)} class="btn btn-primary">Edit</button>
                            <button type="button" onClick={e => deleteTodo(item._id)} class="btn btn-danger">Delete</button>
                        </td>

                    </tr>)
                }
            </tbody>
        </table>

        <div class="modal fade" id="editTodoModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="card">
                                        <div class="card-header">Edit Todo</div>
                                        <div class="card-body">
                                            <div>
                                                <label for="task" class="form-label"> Task </label>
                                                <input
                                                    onChange={e => setSelectedTodo({ ...selectedTodo, task: e.target.value })}
                                                    value={selectedTodo.task}
                                                    name="task"
                                                    type="text"
                                                    class="form-control"
                                                    id="task"
                                                    placeholder="Enter your task"
                                                />
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">Please choose a username.</div>
                                            </div>
                                            <div class="mt-2">
                                                <label for="desc" class="form-label">First Email</label>
                                                <input
                                                    onChange={e => setSelectedTodo({ ...selectedTodo, desc: e.target.value })}
                                                    value={selectedTodo.desc}
                                                    name='desc'
                                                    type="text"
                                                    class="form-control"
                                                    id="desc"
                                                    placeholder="Enter Your Email"
                                                />
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">Please choose a username.</div>
                                            </div>
                                            <div class="mt-2">
                                                <label for="user" class="form-label">User</label>
                                                <input
                                                    onChange={e => setSelectedTodo({ ...selectedTodo, user: e.target.value })}
                                                    value={selectedTodo.user}
                                                    name="user"
                                                    type="text"
                                                    class="form-control"
                                                    id="user"
                                                    placeholder="Enter Your user"
                                                />
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">Please choose a user.</div>
                                            </div>
                                            <div class="mt-2">
                                                <label for="priority" class="form-label"
                                                >Confirm priority</label>
                                                <input
                                                    onChange={e => setSelectedTodo({ ...selectedTodo, priority: e.target.value })}
                                                    value={selectedTodo.priority}
                                                    name='priority'
                                                    type="text"
                                                    class="form-control"
                                                    id="priority"
                                                    placeholder="Confirm Your priority"
                                                />
                                                <div class="valid-feedback">Looks good!</div>
                                                <div class="invalid-feedback">
                                                    Please Recheck Your Password.
                                                </div>
                                            </div>
                                            <button type="button" onClick={e => updateTodo(selectedTodo)} class="btn btn-primary w-100 mt-3">
                                                Signup
                                            </button>
                                            <p class="text-center mt-3">
                                                Already Have Account? <a href="#">Login</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminDash