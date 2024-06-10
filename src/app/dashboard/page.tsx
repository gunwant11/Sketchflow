'use client';
import { ProjectStore } from '@/store/project';
import { UserStore } from '@/store/user';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Dashboard = () => {
    const { projects, fetchProjects, createProject } = ProjectStore()
    const { fetchUser, user } = UserStore()
    const router = useRouter()
    useEffect(() => {
        fetchUser()

    }, [])

    useEffect(() => {
        if (user && user.id) {
            const userId = user.id
            fetchProjects(userId)
        }
    }
        , [user])

    const handleCreateProject = async () => {
        const project = await createProject()
        router.push(`/project/${project.id}`)
    }
    return (
        <div className='w-full min-h-screen bg-violet-300/10 font  flex flex-col'>
            <div className='w-full h-16 bg-zinc-900 border-b-2  border-violet-600/50 flex items-center justify-center'>
                <div className='flex justify-between items-center w-3/5'>
                    <h1 className='text-2xl  '>Sketchflow</h1>
                    <div className='flex items-center gap-2'>
                        <div className=''>Welcome, {user?.name}</div>
                        <button
                            className="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center ">
                            <img className="w-10 h-10 rounded-full" src={user?.image} alt="user" />
                            <div className="absolute shadow-lg -bottom-10 left-0 w-max h-max p-2  bg-zinc-800 rounded-lg flex flex-col gap-2">
                                <span className="flex flex-row gap-2 items-center text-sm cursor-pointer bg-zinc-700 py-1 px-6 rounded-lg" onClick={() => signOut({ callbackUrl: '/' })}>
                                    <p>Sign out</p>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-3/5 mx-auto mt-10'>

                <button onClick={handleCreateProject}
                    className='bg-yellow-300/60 border border-yellow-500 text-white p-2 px-10 rounded-md'
                >  create project +</button>
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    {
                        projects.map((project) => (
                            <div key={project.id} onClick={() => router.push(`/project/${project.id}`)} className='bg-violet-400/20 shadow p-4 rounded-md mt-4  flex flex-col  cursor-pointer'>
                                <img src={project?.thumbnail} alt={project?.title} className='rounded' />
                                <h2 className='mt-2' >{project?.title}</h2>
                                <div className='text-sm text-gray-300' > Last modified : {Date(project?.updatedAt).toString().split(' ').slice(0, 4).join(' ')}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard