import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar2 from "./Navbar2";

function Job() {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState("Loading job requirements...")

    const token = localStorage.getItem("token");
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {

        fetch(`https://domaincer-backend.herokuapp.com/getter/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        })
            .then(res => { return res.json() })
            .then(res => {
                setTimeout(() => {
                    setdata([res.data]);
                    setloading(false);
                }, 500);
            })

    }, [id, token])

    const Apply = () => {
        history.push(`/${id}/apply`);
    }

    return (
        <Fragment>
            <Navbar2 />
            {data.length === 0 ? (<h5 className="d-flex justify-content-center text-secondary">{loading}</h5>) : (
                <Fragment>
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="card mb-5">
                                <div className="card-header pt-5 pb-5">
                                    <h3 className="d-flex justify-content-center pb-2">Job Recuirements</h3>
                                    <div className="p-2">
                                        <b>Name of the Company :</b>
                                        <div className="ml-5">{item.Name}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Website :</b>
                                        <div className="ml-5">{item.Website}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Title :</b>
                                        <div className="ml-5">{item.Title}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>About :</b>
                                        <div className="ml-5">{item.About}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Role :</b>
                                        <div className="ml-5">{item.Role}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Description :</b>
                                        <div className="ml-5">{item.Des}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Package :</b>
                                        <div className="ml-5">{item.Ctc}</div>
                                    </div>
                                    <div className="p-2">
                                        <b>Posted Date :</b>
                                        <div className="ml-5">{item.Dates}</div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-center">
                                    <button type="button" className="btn btn-success" onClick={Apply}>Apply to {item.Name}</button>
                                </div>
                            </div>
                        )
                    })}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Job

