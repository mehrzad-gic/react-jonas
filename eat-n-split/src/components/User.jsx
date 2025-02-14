import { useEffect, useState } from 'react'


function User({ user,setBillWith }) {

    useEffect(() => {
        const situation = user.balance > 0 ? 'owes' : user.balance < 0 ? `owe` : `even`
        setStatus(situation);
    }, [user])

    const [status,setStatus] = useState('');

    return (
        <>
            <li>
                <img src={user.image} alt={user.name} />

                <h3>{user.name}</h3>

                {/*condition  */}
                <p className={status == 'owes' ? 'green' : status == 'owe' ? 'red' : ''}>
                {status == 'owes' ? `${user.name} owes You ${user.balance} ` : status == 'owe' ? `You owe ${user.name} ${user.balance * -1}` : `You and ${user.name} are even`}
                </p>

                <button className='button' onClick={(e) => setBillWith(user)}>select</button>
            </li>
            
        </>
    )

}

export default User
