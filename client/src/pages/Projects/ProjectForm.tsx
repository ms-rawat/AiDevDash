import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

// GraphQL mutation
const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String) {
    addProject(name: $name, description: $description) {
      id
      name
      description
      createdAt
    }
  }
`;

// Yup schema
const ProjectSchema = Yup.object().shape({
  name: Yup.string().trim().required('Project name is required'),
  description: Yup.string().trim().nullable(),
});

const ProjectForm = () => {
  const navigate = useNavigate();

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT, {
    onCompleted: () => navigate('/tasks'),
    onError: (err) => console.error('GraphQL Error:', err.message),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: ProjectSchema,
    onSubmit: async (values) => {
      await addProject({ variables: values });
    },
  });

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border bg-surface border-input-border">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-text-primary ">Create New Project</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className='text-tex t-secondary'>Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., AiDevDash Backend"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className='text-text-secondary'>Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="A brief overview of the project..."
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>

            {error && (
              <p className="text-red-500 text-center text-sm">Error: {error.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectForm;
