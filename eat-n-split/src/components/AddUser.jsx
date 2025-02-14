import { useState } from 'react';

function AddUser({ setUsers, isOpen }) {
    
    const [form, setForm] = useState({ name: '', image: '' });

    function handleInput(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function submitForm(e) {

        e.preventDefault();

        // Check if the required fields are filled
        if (!form.name || !form.image) {
            alert('Please fill all inputs');
            return;
        }

        setUsers((users) => [...users, form]);

        setForm({ name: '', image: '' });

    }

    return (
        <>
            {isOpen && (
                <form className="form-add-friend" onSubmit={submitForm}>
                    <label>🧑‍🤝‍🧑 Friend name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInput}
                        required
                    />

                    <label>🐼 Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleInput}
                        required
                    />

                    <button className="button">✅ Create</button>
                </form>
            )}
        </>
    );
}

export default AddUser;