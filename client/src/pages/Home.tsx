import React, { useEffect, useState } from "react";
import { ExperienceCard } from "../components/ExperienceCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { experienceAPI } from "../services/api";
import type { Experience } from "../types";

export const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experienceAPI.getAll();
        setExperiences(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filtered = experiences.filter(exp =>
    exp.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-2">

          <span className="font-semibold text-lg">highway delite</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search experiences"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-pink-400 focus:outline-none px-3 py-2 rounded w-72"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded font-medium hover:bg-yellow-500">
            Search
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(exp => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </div>
      </main>
    </div>
  );
};
