import { useState } from 'react'
import { initialFriends } from './Utils/util'
import Users from './components/Users'
import AddUser from './components/AddUser'
import Form from './components/Form'

function App() {

  const [users,setUsers] = useState(initialFriends)
  const [billWith,setBillWith] = useState(null)

  return (
    <>
      <div className='app'>
        <div className="sidebar">
            <Users users={users} setUsers={setUsers} setBillWith={setBillWith}/>
        </div>
        <Form billWith={billWith} users={users} setUsers={setUsers}/>
      </div>
    </>
  )
}

export default App
