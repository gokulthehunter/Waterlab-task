import React from 'react'
import './UserResult.scss';

export const UserResult = (props) => {
    return (
        <div className="result">
            <ul className="result_list">
                {props.results.map((result,index) =>(
                    <li className="result_list--each" key={`result-${index}`}>
                        <h3>{result.name}</h3>
                        <p>Age: {result.age}</p>
                        <div>Email: {result.email}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default UserResult;
