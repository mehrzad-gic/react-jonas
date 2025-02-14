import { useState } from 'react';

function Form({ billWith,users,setUsers }) {

    const [bill, setBill] = useState({
        bill_value: 0,
        my_expense: 0,
        friend_expense: 0,
        whoPays: '',
    });

    function handleInput(e) {

        const { name, value } = e.target;
        const newBill = { ...bill, [name]: value };

        // Calculate friend_expense if bill_value and my_expense are valid numbers
        if (name === 'my_expense' || name === 'bill_value') {
            const billValue = parseFloat(newBill.bill_value);
            const myExpense = parseFloat(newBill.my_expense);

            if (!isNaN(billValue) && !isNaN(myExpense) && myExpense <= billValue) {
                newBill.friend_expense = (billValue - myExpense).toFixed(2);
            } else {
                newBill.friend_expense = '';
            }
        }

        setBill(newBill);
    }

    function handleSelect(e) {
        setBill({ ...bill, whoPays: e.target.value });
    }

    function submit(e) {

        e.preventDefault();

        if (!bill.bill_value || !bill.whoPays) {
            alert('Please fill all fields');
            return;
        }

        // Log the bill (or handle bill splitting logic here)
        const payer = bill.whoPays;
        const bill_value = parseInt(bill.bill_value);
        const my_expense = parseInt(bill.my_expense);
        const friend_expense = parseInt(bill.friend_expense);
        let friend = {};        
        
        if(payer == 'you') {
            // not even
            if(!(bill_value - my_expense == 0)){
                friend = users.find((user) => user.name === billWith.name)
                console.log(typeof friend_expense);
                console.log(friend.balance);
                friend = {...friend,balance : friend.balance + friend_expense};                
            }
        } else {
            // not even
            if(!(bill_value - friend_expense == 0)){
                friend = users.find((user) => user.name === billWith.name)
                friend = {...friend,balance : friend.balance - my_expense};
            }
        }

        console.log(friend);
        let newUsers = users.filter((user) => user.name !== billWith.name);
        newUsers = [...newUsers,friend];
        setUsers(newUsers);
    }


    return (
        <>
            {billWith && (
                <form className="form-split-bill" onSubmit={submit}>
                    <h2>Split bill with {billWith.name}</h2>

                    <label>💵 Bill value</label>
                    <input
                        onChange={handleInput}
                        name="bill_value"
                        type="number"
                        value={bill.bill_value}
                    />

                    <label>👨‍💼 Your expense</label>
                    <input
                        onChange={handleInput}
                        name="my_expense"
                        type="number"
                        value={bill.my_expense}
                    />

                    <label>👨 {billWith.name}'s expense</label>
                    <input
                        name="friend_expense"
                        type="number"
                        value={bill.friend_expense}
                        disabled
                    />

                    <label>💰 Who is paying the bill?</label>
                    <select name="whoPays" value={bill.whoPays} onChange={handleSelect}>
                        <option value="">Choose</option>
                        <option value="you">You</option>
                        <option value={billWith.name}>{billWith.name}</option>
                    </select>

                    <button className="button">Split Bill</button>
                </form>
            )}
        </>
    );
}

export default Form;