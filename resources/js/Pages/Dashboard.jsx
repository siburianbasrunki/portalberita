import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setisNotif] = useState(false);
    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setisNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };
    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
        return;
    }, []);
    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {isNotif && (
                            <div class="alert alert-success">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="judul"
                            className=" m-2 input input-bordered w-full "
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className=" m-2 input input-bordered w-full "
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="category"
                            className="m-2 input input-bordered w-full "
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => (
                            <div
                                key={i}
                                className="card w-full lg:w-96 bg-base-100 shadow-xl m-2"
                            >
                                <div className="card-body">
                                    <h2 className="card-title">{news.title}</h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">
                                            {news.category}
                                        </div>
                                        <div className="badge badge-inline">
                                            <Link
                                                href={route("edit.news")}
                                                method="get"
                                                data={{ id : news.id}}
                                                as="button"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="badge badge-inline">
                                            <Link
                                                href={route("delete.news")}
                                                method="post"
                                                data={{ id : news.id}}
                                                as="button"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-4">Anda belum punya berita</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
