import { gql, useQuery } from '@apollo/client'
import './App.css'

const Hello_Query = gql`
query{
 hello
}`;
export default function App() {
  const {loading,data}=useQuery(Hello_Query)
  if (loading) return <div className='p-4'>Loading...</div>
  return (
    <h1 className="text-3xl bg-blue-500 font-bold underline">
      Hello world! {data?.hello}
    </h1>
  )
}