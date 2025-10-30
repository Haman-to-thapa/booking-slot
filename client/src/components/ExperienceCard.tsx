import React from "react";
import { useNavigate } from "react-router-dom";
import type { Experience } from "../types";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/experience/${experience._id}`)}
    >
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{experience.title}</h3>
          <span className="text-xs bg-gray-200 text-gray-700 rounded px-2 py-0.5">
            {experience.location}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {experience.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-800 font-bold">From ₹{experience.price}</span>
          <button className="bg-yellow-400 text-black text-sm px-4 py-1.5 rounded font-medium hover:bg-yellow-500">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
