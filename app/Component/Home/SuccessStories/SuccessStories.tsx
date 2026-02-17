"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "../../../lib/axios";
import SuccessStoriesCard from "./SuccessStoriesCard";
import "./SuccessStories.scss";
import { ArrowLeft, ArrowRight } from "../../Assets/IconSet";
import { motion } from "framer-motion";
import Link from "next/link";

interface Story {
  _id: string;
  coverPhoto: string;
  createdAt: string;
  title: string;
}

export default function SuccessStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true); // Track if we should animate


  /* ---------------- Screen Detection ---------------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 2;

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

  /* ---------------- Create Infinite Structure ---------------- */
  const extendedStories = useMemo(() => {
    if (!stories.length) return [];
    // Clone items at start and end for seamless loop
    return [
      ...stories.slice(-visibleCount),
      ...stories,
      ...stories.slice(0, visibleCount),
    ];
  }, [stories, visibleCount]);

  /* ---------------- Initial Position ---------------- */
  useEffect(() => {
    if (stories.length) {
      setCurrentIndex(visibleCount);
    }
  }, [stories, visibleCount]);

  /* ---------------- Navigation ---------------- */
  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  /* ---------------- The "Magic" Reset ---------------- */
  const handleAnimationComplete = () => {
    if (!stories.length) return;

    // If we reach the end clone, jump to the real start instantly
    if (currentIndex >= stories.length + visibleCount) {
      setIsTransitioning(false); // Turn off animation
      setCurrentIndex(visibleCount);
    }

    // If we reach the start clone, jump to the real end instantly
    if (currentIndex <= 0) {
      setIsTransitioning(false); // Turn off animation
      setCurrentIndex(stories.length);
    }
  };

  if (loading) return <p>Loading stories...</p>;
  if (error) return <p>{error}</p>;
  if (!stories.length) return null;

  return (
    <div className="container success-stories-container">
      <div className="success-stories-heading">
        <h4 className="success-stories-container-heading">Starlink Success Stories</h4>
        <Link className="success-stories-view-all-button" href={`/success-stories`}>View All</Link>
      </div>
      <div className="slider-wrapper">
        <motion.div
          className="slider-track"
          initial={false}
          animate={{
            // Note: We use 50% for 2 items, 100% for 1 item
            x: `-${currentIndex * (100 / visibleCount)}%`,
          }}
          transition={
            isTransitioning
              ? { duration: 0.5, ease: "easeInOut" }
              : { duration: 0 } // Jump instantly
          }
          onAnimationComplete={handleAnimationComplete}
        >
          {extendedStories.map((story, index) => (
            <div key={index} className="slider-item">
              <SuccessStoriesCard
                coverPhoto={story.coverPhoto}
                createdAt={story.createdAt}
                title={story.title}
                id={story._id}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="card-navigator-controller">
        <div className="card-item-bullet">
          {stories.map((_, index) => {
            const realIndex =
              (currentIndex - visibleCount + stories.length) % stories.length;
            return (
              <div
                key={index}
                className={`card-item-bullet-point ${index === realIndex ? "active-card-item-bullet-point" : ""
                  }`}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index + visibleCount);
                }}
              />
            );
          })}
        </div>

        <div className="navigator-deck">
          <div className="arrow-left controller-arrow" onClick={prevSlide}>
            <ArrowLeft size="24px" color="#FFF" />
          </div>
          <div className="arrow-right controller-arrow" onClick={nextSlide}>
            <ArrowRight size="24px" color="#FFF" />
          </div>
        </div>
      </div>
    </div>
  );
}
