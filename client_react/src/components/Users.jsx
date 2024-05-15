import React, { useEffect, useState } from "react";
import { Card, Flex, Table, message, Modal, Input } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";


function Users() {
    const [users, setUsers] = useState([])


    useEffect(() => {
        getUsers()
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updateUser, setUpdateUser] = useState(null)

    const [changeName, setChangeName] = useState('')

    const [changeLastName, setChangeLastName] = useState('')

    const handleOk = () => {
        console.log(changeName);
        console.log(changeLastName);
        fetch(`/update_user?name=${changeName}&lastname=${changeLastName}&id_user=${updateUser.id}`)
            .then(res => res.json())
            .then(res => {
                if (res.response.length === 0) {
                    getUsers()
                } else (
                    console.log(res)
                )
            })
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUsers(res.response)
            })
    }


    const update = (user) => {
        console.log(user);
        setUpdateUser(user)
        setIsModalOpen(true);



    }

    const info = () => {
        message.info('This is a normal message');
    };

    const deleteUser = (id_user_for_delete) => {
        fetch(`/delete_user?id_user=${id_user_for_delete}`)
            .then(res => res.text())
            .then(res => {
                if (res.response.length === 0) {
                    message.info('Пользователь успешно удален')
                }
                getUsers()
            })

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'tg_login',
            dataIndex: 'tg_login',
            key: 'tg_login',
        },
        {
            title: 'Action',
            key: 'action',
            render: (rec) => <div>
                <EditOutlined onClick={() => update(rec.id)} />
                <CloseOutlined onClick={() => deleteUser(rec.id)} />
            </div >
        },
    ];



    return (
        <>
            <div>
                <h1>Создание пользователя</h1>

                <CreateUser refresh={getUsers} />
            </div>

            <div>
                <h1>простая отрисовка!</h1>
                {users.length > 0 &&

                    users.map((item) => {
                        return <div>
                            {item.id} {item.name} {item.lastname} {item.age} {item.tg_login} <EditOutlined onClick={() => update(item)} />
                            <CloseOutlined onClick={() => deleteUser(item.id)} />
                        </div>
                    })
                }
            </div>

            <div>
                <h1>Отрисовка через карточки</h1>
                {users.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        {users.map((itemCard) => {
                            return (
                                <Card title={itemCard.id} bordered={false} style={{ width: 300 }}>
                                    {itemCard.name} {itemCard.lastname} {itemCard.age} {itemCard.tg_login} <EditOutlined onClick={() => update(itemCard.id)} />
                                    <CloseOutlined onClick={() => deleteUser(itemCard.id)} />
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>


            {/* таблица */}
            <h1>Отрисовка c помощью таблицы</h1>
            < Table dataSource={users} columns={columns} />;
            <div>
                <Modal title="Обновление данных пользователя!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    {/* если updateUser не равен null */}
                    <p>Имя</p>
                    {updateUser !== null &&
                        <div>
                            {/* <input key={updateUser !== null && updateUser.name} type="text" defaultValue={updateUser !== null && updateUser.name} onChange={(e) => setChangeName(e.target.value)} />
                            <input key={updateUser !== null && updateUser.lastname} type="text" defaultValue={updateUser !== null && updateUser.lastname} onChange={(e) => setChangeLastName(e.target.value)} /> */}
                            {/* <UpdateUser /> */}
                            <p>{updateUser.name} <input key={updateUser.name} type="text" onChange={(e) => setChangeName(e.target.value)} /></p>
                            <p>{updateUser.lastname} <input key={updateUser.lastname} type="text" onChange={(e) => setChangeLastName(e.target.value)} /></p>
                        </div>
                    }
                </Modal>
            </div>

        </>
    )

}

export default Users