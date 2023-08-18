import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    const [title, setTitle] = useState(props.myNews.title);
    const [description, setDescription] = useState(props.myNews.description);
    const [category, setCategory] = useState(props.myNews.category);

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };
        Inertia.post("/news/update", data);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl m-2">
                <div className="p-4 text-2xl">Edit Berita</div>
                <div className="card-body">
                    <input
                        type="text"
                        placeholder="judul"
                        className="m-2 input input-bordered w-full"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="m-2 input input-bordered w-full"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="category"
                        className="m-2 input input-bordered w-full"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                    <button
                        className="btn btn-primary m-2"
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
