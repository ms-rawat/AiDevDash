import React from 'react'
import { gql, useQuery } from '@apollo/client'
import ProjectCard from './ProjectCard'

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      createdAt
    }
  }
`

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
}
interface GetProjectsResponse {
  projects: Project[]
}


const AllProjects: React.FC = () => {
  const { data, loading, error } = useQuery<GetProjectsResponse>(GET_PROJECTS)
console.log(data)
  if (loading) return <p>Loading projects...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="flex flex-wrap gap-6 p-6 min-h-screen">
      {data?.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default AllProjects
