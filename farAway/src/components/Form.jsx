import { useState } from "react";

export default function Form({items,setItems}) {

    const [form, setForm] = useState({});

    function formHndeler(item) {   
        setForm({ ...form, [item.name] : item.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(items);
        setItems((current) => [...current, {...form, id: Date.now()}]);
    }

    return (
        <>
            <form className="add-form" onSubmit={handleSubmit}>
                <h3>What do you need for your 😍 trip?</h3>
                <select
                    name="quantity"
                    value={form.quantity}
                    onChange={(e) => formHndeler(e.target)}
                >
                    <option value="">chose one</option>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <option value={num} key={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <input
                    name="description"
                    type="text"
                    placeholder="Item..."
                    value={form.description}
                    onChange={(e) => formHndeler(e.target)}
                />
                <button>Add</button>
            </form>
        </>
    )

}