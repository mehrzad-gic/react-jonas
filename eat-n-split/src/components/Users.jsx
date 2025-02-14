import { useState } from 'react'
import User from './User'
import AddUser from './AddUser';


function Users({users,setUsers,setBillWith}) {

    const [isOpen, setOpen] = useState(true);

    function handleClick() {
        setOpen(!isOpen); // Toggle the state
    }

    return (
        <>
            <ul>
                {users ? users.map((user) => <User setBillWith={setBillWith} user={user} key={user.id} />) : (<h1 style={{ color: 'red' }}>The friends list is empty</h1>)}
                <button className="button" style={{ width: '40%' , marginTop : '12px' , marginBottom : '12px' }} onClick={handleClick} >
                    {isOpen ? 'Close' : 'Add New Friend'}
                </button>
                <AddUser isOpen={isOpen} setUsers={setUsers}/>
            </ul>
        </>
    )
}

export default Users
