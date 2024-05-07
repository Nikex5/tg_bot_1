import React from "react";
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

function Test() {

    const update = () => {
        alert("fjfjfj")
        console.log("dlfd");
    }
    return (
        <>
            <EditOutlined onClick={() => update()} />
            <CloseOutlined />
        </>
    )
}

export default Test;