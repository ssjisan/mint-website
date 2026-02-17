"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios"; // adjust path to your axios instance
import "./SuccessStoriesDetails.scss";
import ContentRenderer from "../../../lib/html2text"
import Image from "next/image";
interface Story {
    _id: string;
    title: string;
    coverPhoto: string;
    createdAt: Date;
    contentHTML: string
}

export default function SuccessStoriesDetails() {
    const params = useParams();
    const id = params?.id;

    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return; // nothing to fetch

        const fetchStory = async () => {
            try {
                const res = await axios.get<Story>(`/news/${id}`);
                setStory(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch story.");
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [id]);

    if (loading) return <p>Loading story...</p>;
    if (error) return <p>{error}</p>;
    if (!story) return <p>Story not found.</p>;
    const date = new Date(story.createdAt);

    const formattedDate = `${date.getDate().toString().padStart(2, "0")} 
        ${date.toLocaleString("en-GB", { month: "short" })}, 
        ${date.getFullYear()}`;


    return (
        <div className="success-story-details-container container">
            <div className="details-container">
                <h1>{story.title}</h1>
                <p>Published on {formattedDate}</p>
            </div>
            {story.coverPhoto && (
                <div className="details-thumbnail">
                    <Image src={story.coverPhoto} alt={story.title} fill />
                </div>
            )}
            <ContentRenderer html={story.contentHTML} />
        </div>
    );
}
