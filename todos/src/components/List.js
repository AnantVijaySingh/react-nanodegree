import React from 'react';

export default function List(props) {
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>
                    <span
                        onClick={()=> {props.toggle && props.toggle(item.id)}} // && operator acts as a simple if statement which is checking is toggle is defined and if it is than it will assign the call to it
                        style={{textDecoration: item.complete ? 'line-through' : 'none'}}
                    >
                        {item.name}
                    </span>
                    <button onClick={() => props.remove(item)}>X</button>
                </li>
            ))}
        </ul>
    )
}