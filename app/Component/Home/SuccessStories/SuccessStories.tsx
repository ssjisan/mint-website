"use client";
import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import SuccessStoriesCard from "./SuccessStoriesCard";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/all-news");
        setStories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load success stories.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);
  console.log(stories);

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="container">
      <h2 className="heading-h2">Starlink Success Stories</h2>
      <div className="row g-3" style={{ border: "1px solid red" }}>
        {stories.map((story) => (
          <div
            key={story._id || story.id}
            className="col-12 col-sm-6 col-md-4 col-lg-4"
            style={{ border: "1px solid red" }}
          >
            <SuccessStoriesCard
              coverPhoto={story.coverPhoto}
              createdAt={story.createdAt}
              title={story.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
