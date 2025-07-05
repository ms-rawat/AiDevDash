import React from 'react'
import ProjectCard from './ProjectCard'



const tasks: Task[] = [
  {
    title: "Design new landing page",
    description: "Create a modern and responsive landing page design",
    priority: "High",
    status: "In Progress",
    user: { name: "Sarah Chen", initials: "SC", color: "bg-indigo-500" },
  },
  {
    title: "Update user documentation",
    description: "Review and update all user guides",
    priority: "Medium",
    status: "To Do",
    user: { name: "Mike Johnson", initials: "MJ", color: "bg-green-600" },
  },
  {
    title: "Fix payment integration",
    description: "Debug and fix payment processing issues",
    priority: "High",
    status: "Done",
    user: { name: "Alex Kumar", initials: "AK", color: "bg-red-600" },
  },
  {
    title: "Implement AI chatbot",
    description: "Develop intelligent customer support system",
    priority: "High",
    status: "In Progress",
    user: { name: "Emma Davis", initials: "ED", color: "bg-purple-600" },
  },
  {
    title: "Optimize database queries",
    description: "Improve application performance and speed",
    priority: "Medium",
    status: "To Do",
    user: { name: "Ryan Park", initials: "RP", color: "bg-orange-500" },
  },
  {
    title: "Security audit",
    description: "Comprehensive security review and testing",
    priority: "High",
    status: "Done",
    user: { name: "Lisa Wong", initials: "LW", color: "bg-cyan-600" },
  },
];
function AllProjects() {
  return (
    <div className="flex flex-wrap gap-6 p-6  min-h-screen">
      {tasks.map((task, index) => (
        <ProjectCard key={index} task={task} />
      ))}
    </div>
  )
}

export default AllProjects



