'use client';
import Drawer from '@/components/Drawer';
import { ProjectStore } from '@/store/project';
import { UserStore } from '@/store/user';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react'
import { Star, Plus, Search } from 'lucide-react';
const Dashboard = () => {
    const { projects, fetchProjects, setProjects, fetchTeams, createProject, selectedTeam, drawerTab } = ProjectStore()
    const { fetchUser, user } = UserStore()
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [search, setSearch] = useState('')
    const router = useRouter()
    useEffect(() => {
        fetchUser()

    }, [])

    useEffect(() => {
        if (user && user.id) {
            const userId = user.id
            fetchProjects(userId)
            fetchTeams(userId)
        }
    }
        , [user])

    const handleCreateProject = async () => {
        const project = await createProject()
        router.push(`/project/${project.id}`)
    }


    const handleFavorite = async (e, project) => {
        e.stopPropagation()
        try {
            const res = await fetch(`/api/project`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId: project.id, favorite: !project.favorite }),
            });
            const data = await res.json();
            const newProjects = projects.map((p) => p.id === data.project.id ? data.project : p)
            setProjects(newProjects)
        }
        catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        if (projects && projects.length === 0) return
        let newProjetct = [...projects]
        if (search) {
            newProjetct = newProjetct.filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))

        }

        if (selectedTeam) {
            newProjetct = newProjetct.filter((project) => project.teamId === selectedTeam.id)
        }

        if (drawerTab === 'favorites') {
            newProjetct = newProjetct.filter((project) => project.favorite)
        }
        setFilteredProjects(newProjetct)
    }
        , [search, projects, selectedTeam, drawerTab])




    return (
        <div className='w-full min-h-screen bg-zinc-900 flex'>
            <Drawer />
            <div className='min-h-screen flex-1 bg-zinc-900 flex flex-col'>
                <div className='h-16 bg-zinc-800/50 backdrop-blur-sm border-b border-white/5 sticky top-0 z-20'>
                    <div className='flex justify-between items-center w-full px-8 h-full'>
                        <div className='relative w-96'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4' />
                            <input 
                                type="text" 
                                placeholder='Search projects...' 
                                className='bg-zinc-700/40 text-white text-sm outline-none p-2 pl-10 w-full rounded-lg border border-white/5 focus:border-violet-500/50 transition-colors' 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='text-sm text-zinc-400'>Welcome back, <span className='text-white font-medium'>{user?.name}</span></div>
                            <Listbox>
                                <ListboxButton className="hover:ring-2 hover:ring-violet-500/20 transition-all rounded-full">
                                    <img className="w-9 h-9 rounded-full ring-2 ring-violet-500" src={user?.image} alt="user" />
                                </ListboxButton>
                                <ListboxOptions
                                    anchor="bottom"
                                    transition
                                    className={clsx(
                                        'w-48 rounded-xl border border-white/10 bg-zinc-800/90 backdrop-blur-sm p-1 shadow-xl [--anchor-gap:var(--spacing-1)] focus:outline-none',
                                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                    )}>
                                    <div className="p-1">
                                        <button 
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-zinc-700/70 transition-colors flex items-center gap-2"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </ListboxOptions>
                            </Listbox>
                        </div>
                    </div>
                </div>
                <div className='flex-1 px-8 py-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-xl font-semibold text-white'>Your Projects</h1>
                        <button 
                            onClick={handleCreateProject}
                            className='bg-violet-500 hover:bg-violet-600 transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium'
                        >
                            <Plus className='w-4 h-4' />
                            New Project
                        </button>
                    </div>

                    {filteredProjects.length === 0 ? (
                        <div className='text-white text-center gap-4 h-[60vh] flex flex-col items-center justify-center bg-zinc-800/30 rounded-xl border border-white/5'>
                            <img src='/sketchbook.png' className='w-32 opacity-80' alt="Empty state" />
                            <div>
                                <h1 className='text-xl font-medium mb-2'>No projects yet</h1>
                                <p className='text-zinc-400 text-sm'>Create your first project to get started</p>
                            </div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {filteredProjects.map((project) => (
                                <div 
                                    key={project.id} 
                                    onClick={() => router.push(`/project/${project.id}`)} 
                                    className='bg-zinc-800 hover:bg-zinc-700/80 transition-colors border border-white/5 rounded-xl overflow-hidden group cursor-pointer'
                                >
                                    <div className='relative aspect-video'>
                                        <div className='absolute inset-0 bg-black/30 hidden group-hover:flex justify-center items-center z-10' />
                                        <img src={project?.thumbnail} alt={project?.title} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='p-4 flex justify-between items-start'>
                                        <div>
                                            <h2 className='font-medium text-white'>{project?.title}</h2>
                                            <div className='text-sm text-zinc-400 mt-1'>
                                                Last modified: {new Date(project?.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <button 
                                            className='p-2 hover:bg-white/5 rounded-lg transition-colors'
                                            onClick={(e) => handleFavorite(e, project)}
                                        >
                                            <Star className={clsx(
                                                'w-5 h-5',
                                                project?.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-400'
                                            )} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard