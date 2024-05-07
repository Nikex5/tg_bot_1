import React, { useEffect, useState } from "react";



function Update() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/update_user')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUsers(res.response)
            })
    }, [])

    return (
        <>
            {users.map((item) => (
                <div>
                    {item.id} {item.name}
                </div>
            ))}
        </>
    )

}

export default Update