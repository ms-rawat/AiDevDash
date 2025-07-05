import React from "react";

type Priority = "High" | "Medium" | "Low";
type Status = "In Progress" | "Done" | "To Do";

interface User {
  name: string;
  initials: string;
  color: string; // Tailwind class (e.g., bg-indigo-500)
}

interface Task {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  user: User;
}


const priorityColors: Record<Priority, string> = {
  High: "bg-pink-600",
  Medium: "bg-cyan-400",
  Low: "bg-gray-400",
};

const statusColors: Record<Status, string> = {
  "In Progress": "bg-yellow-500 text-black",
  Done: "bg-green-700 text-white",
  "To Do": "bg-slate-700 text-white",
};

interface ProjectCardProps {
  task: Task;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ task }) => (
  <div className="bg-background-primary p-5 rounded-xl shadow-xl w-full sm:w-[300px] border border-gray-600 dark:border-gray-100 ">
    <div className="flex justify-between items-center">
      <h3 className="text-text-primary font-bold text-lg leading-snug">{task.title}</h3>
      <span
        className={`text-sm  px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
    </div>
    <p className="text-text-secondary mt-2 text-sm">{task.description}</p>
    <div className="flex items-center justify-between mt-4">
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[task.status]}`}>
        {task.status}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full text-text-primary text-sm font-bold flex items-center justify-center ${task.user.color}`}>
          {task.user.initials}
        </div>
        <p className="text-text-primary text-sm">{task.user.name}</p>
      </div>
    </div>
  </div>
);


export default ProjectCard;
