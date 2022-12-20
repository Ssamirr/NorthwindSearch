import React, { useEffect, useState } from 'react'

function Fetch() {

    const [todos, setTodos] = useState([]);
    // const [text, setText] = useState("");
    const [length, setLength] = useState("");
    const [filtered, setFiltered] = useState([]);


    useEffect(() => {
        fetch("https://northwind.vercel.app/api/orders")
            .then(res => res.json())
            .then(data => {
                setTodos(data);
                setFiltered(data);
            })
    }, []);

    const SearchValue = (event) => {
        // setText(event.target.value);
        let filteredData = todos.filter(q => q.customerId.toLowerCase().includes(event.target.value));
        setFiltered(filteredData);
    }

    const getLength = (event) => {
        setLength(event.target.value);
    }

    const getData = () => {
        if (length) {
            setFiltered(todos.slice(0, length));
        } else {
            setFiltered(todos);
        }
    }

    return (<>
        <div className='top-inputs'>
            <input placeholder='Search' onChange={SearchValue} type="text" />
            <div>
                <input min={0} placeholder='Length' onChange={getLength} value={length} type="number" />
                <button onClick={getData}>Get</button>
            </div>
        </div>

        <h1>Lenght:{filtered.length}</h1>
        <table className="w3-table-all w3-centered">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Customer Id</td>
                    <td>Ship Name</td>
                    <td>Shipped Date</td>
                </tr>
            </thead>
            <tbody>
                {
                    filtered.map((item, key) => {
                        return <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.customerId}</td>
                            <td>{item.shipName}</td>
                            <td>{item.shippedDate}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
    )
}

export default Fetch