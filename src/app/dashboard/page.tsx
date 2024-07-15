'use client';
import Drawer from '@/components/Drawer';
import { ProjectStore } from '@/store/project';
import { UserStore } from '@/store/user';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react'
import { Star } from 'lucide-react';
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
        <div className='w-full min-h-screen bg-zinc-900   flex '>
            <Drawer />
            <div className=' min-h-screen flex-1 bg-zinc-900 font  flex flex-col'>
                <div className=' h-16 bg-zinc-800 border- flex items-center justify-center'>
                    <div className='flex justify-between items-center w-full mx-[12%]'>
                        <input type="text" placeholder='Search' className='bg-zinc-700/70 text-white text-sm outline-none p-2 px-4 w-1/2 rounded-md' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className='flex items-center  gap-2'>
                            <div className='text-sm '>Hi, {user?.name}</div>
                            <Listbox >
                                <ListboxButton
                                    className="">
                                    <img className="w-10 h-10 rounded-full border-2 border-violet-500" src={user?.image} alt="user" />
                                </ListboxButton>
                                <ListboxOptions anchor="bottom"
                                    transition
                                    className={clsx(
                                        'w-42 rounded-xl border border-white/10 bg-zinc-800  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                    )}>
                                    <div className=" w-max h-max p-2  bg-zinc-800 rounded-lg flex flex-col gap-2">
                                        <span className="flex flex-row gap-2 items-center text-sm cursor-pointer bg-zinc-700 py-1 px-6 rounded-lg" onClick={() => signOut({ callbackUrl: '/' })}>
                                            <p>Sign out</p>
                                        </span>
                                    </div>
                                </ListboxOptions>

                            </Listbox>
                        </div>
                    </div>
                </div>
                <div className=' mx-[12%] flex-1 mt-10'>
                    <button onClick={handleCreateProject}
                        className='bg-violet-500/40  border border-violet-500 text-white p-2 px-10 rounded-md'
                    >  Create Project +</button>
                    {filteredProjects.length === 0 ? <div className='text-white text-center gap-2 h-full flex flex-col items-center justify-center'>

                        <img src='/sketchbook.png' className=' w-32 opacity-80' />
                        <h1 className='text-2xl mb-10'> Create your first project! </h1>
                    </div> :
                        <div className='grid grid-cols-3  gap-4 mt-4'>
                            {filteredProjects.map((project) => (
                                <div key={project.id} onClick={() => router.push(`/project/${project.id}`)} className='bg-zinc-700 shadow  overflow-hidden relative rounded-lg  group  flex flex-col  cursor-pointer'>
                                    <div className='relative w-full '>
                                        <div className='bg-black/30 hidden group-hover:flex justify-center items-center w-full h-full  absolute z-10' />

                                        <img src={project?.thumbnail} alt={project?.title} className='' />
                                    </div>
                                    <div className='px-4 py-3 flex justify-between'>
                                        <div>
                                            <h2  >{project?.title}</h2>
                                            <div className='text-sm text-gray-300' > Last modified : {Date(project?.updatedAt).toString().split(' ').slice(0, 4).join(' ')}</div>
                                        </div>
                                        <div className='hidden group-hover:flex' onClick={(e) => handleFavorite(e, project)}>
                                            {project?.favorite ? <Star className='fill-yellow-400 text-yellow-400' /> : <Star className='text-white w-5 h-5 ' />}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard