import React from 'react'

interface Props {
  project: Project
}
interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg w-80">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h2>
      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
      <p className="text-sm text-gray-400 mt-2">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
 
    </div>
  )
}

export default ProjectCard
