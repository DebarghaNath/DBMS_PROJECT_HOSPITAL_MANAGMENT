export default function AddUser(props){
    return <>
     <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                        <button className="btn-primary py-2 px-6 rounded-md flex items-center justify-center" id="addUserBtn" onClick={()=>{props.setOpenModal(true)
                            // console.log("hi")
                        }}>
                            <i className="fas fa-plus-circle mr-2"></i> Add New User
                        </button>
                        
                        <div className="flex">
                        <select
                            className="form-input py-2 mx-2 rounded-md w-full md:w-64"
                            value={props.selectedRole}
                            onChange={(e) => props.setSelectedRole(e.target.value)} // Update selectedRole state
                        >
                            <option value="all">All Users</option>
                            <option value="admin">Admin</option>
                            <option value="fdo">Front Desk Operator</option>
                            <option value="doctor">Doctor</option>
                            <option value="deo">Data Entry Operator</option>
                        </select>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="search"
                                    value={props.searchQuery}
                                    onChange={(e) => props.setSearchQuery(e.target.value)}
                                    placeholder="Search users..." 
                                    className="form-input pl-10 py-2 rounded-md w-full md:w-64"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                    </div>
    </>
}