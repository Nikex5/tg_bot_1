import React, { useState } from "react";

function Delete() {

    const [id, setId] = useState([])
    const sendToBek = () => {
        console.log(id);
        fetch(`/delete_user?id_user=${id}`)
            .then(res => res.json())
            .then(res => console.log(res))
    }
    return (
        <>
            <input placeholder="id" type="number" onChange={(e) => setId(e.target.value)} />
            <button onClick={() => sendToBek()}>Удалить</button>
        </>
    )
}

export default Delete;
