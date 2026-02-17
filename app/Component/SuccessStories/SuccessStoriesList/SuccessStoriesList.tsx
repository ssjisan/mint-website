"use client"
import { useEffect, useState } from 'react';
import './SuccessStoriesList.scss'
import axios from "../../../lib/axios";
import SuccessStoriesCard from '../../Home/SuccessStories/SuccessStoriesCard';

interface Story {
    _id: string;
    coverPhoto: string;
    createdAt: string;
    title: string;
}

export default function SuccessStoriesList() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    /* ---------------- Fetch Data ---------------- */
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get("/all-news");
                setStories(response.data);
            } catch {
                setError("Failed to load success stories.");
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading) return <p>Loading stories...</p>;
    if (error) return <p>{error}</p>;
    if (!stories.length) return <p>No stories found.</p>;

    // Filter stories based on search term
    const filteredStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='success-stories-list-container container'>
            <div className='success-stories-header-with-search'>
                <h4 className="success-stories-container-heading">Starlink Success Stories</h4>
                <input
                    type="text"
                    placeholder="Search stories by title..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredStories.length === 0 ? (
                <p className="mt-4">No stories match your search.</p>
            ) : (
                <div className='row g-5 mt-5'>
                    {filteredStories.map((story, index) => (
                        <div key={story._id} className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <SuccessStoriesCard
                                coverPhoto={story.coverPhoto}
                                createdAt={story.createdAt}
                                title={story.title}
                                id={story._id}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
