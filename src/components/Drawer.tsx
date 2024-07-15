import { CheckIcon, ChevronDownIcon, LayoutPanelTop, PlusIcon, Star } from 'lucide-react'
import React, { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

import clsx from 'clsx'
import CreateTeam from './CreateTeam'
import { ProjectStore } from '@/store/project'

const Drawer = () => {

    const [createTeam, setCreateTeam] = useState(false)

    const { teams, selectedTeam, setSelectedTeam, drawerTab, setDrawerTab } = ProjectStore()
    return (
        <div className=' min-w-[300px]  bg-zinc-800 h-screen flex '>
            <div className='p-2 bg-zinc-900 flex flex-col gap-2 '>
                {teams && teams.map((team) => (
                    <div key={team.id} className='flex items-center  rounded-lg' onClick={() => setSelectedTeam(team)}>
                        <img src={team.image} alt={team.name} className={`w-10 h-10 rounded-lg border-2 ${team.id === selectedTeam.id ? 'border-violet-500' : 'border-transparent'} `} />
                    </div>
                ))}
                <div className='h-10 bg-zinc-500 w-10 rounded-md flex items-center justify-center'>
                    <PlusIcon className='h-10 w-10 text-white m-2' onClick={() => setCreateTeam(true)} />
                </div>
            </div>
            <div className='flex-1'>
                <div className='h-16 s flex items-center justify-center'>
                    <h1 className='text-2xl font-medium text-white'>Sketchflow</h1>
                </div>
                <div className='p-4'>
                    <Listbox value={selectedTeam} onChange={setSelectedTeam}>
                        <ListboxButton
                            className={clsx(
                                'relative block w-full rounded-lg bg-white/5 py-2 pr-8 pl-3 text-left text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        >
                            {selectedTeam && <div className="flex items-center gap-2">
                                <img src={selectedTeam.image} alt={selectedTeam.name} className="w-8 h-8 rounded-lg" />
                                <span>{selectedTeam.name}</span>
                            </div>}
                            <ChevronDownIcon
                                className="group pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                                'w-[var(--button-width)] rounded-xl border border-white/10 bg-zinc-800  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                        >
                            {teams.map((team) => (
                                <ListboxOption
                                    key={team.id}
                                    value={team}
                                    className="group flex cursor-default items-center gap-2 mb-1 rounded-lg py-2 px-2 select-none data-[focus]:bg-white/10 data-[selected]:bg-white/10"
                                >
                                    <img src={team.image} alt={team.name} className="w-8 h-8 rounded-lg" />
                                    <div className="text-sm/6 text-white   ">{team.name}</div>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                    <div className='mt-8' >
                        <div className={`w-full  text-white text-sm rounded-lg p-2 mt-2 flex items-center gap-2  cursor-pointer ${drawerTab == 'teams' ? 'bg-violet-500/20' : 'bg-white/5'}`}
                            onClick={() => setDrawerTab('teams')}><LayoutPanelTop className='p-0.5 ' />Projects</div>
                        <div className={`w-full  text-white text-sm rounded-lg p-2 mt-2 flex items-center gap-2  cursor-pointer ${drawerTab == 'favorites' ? 'bg-violet-500/20' : 'bg-white/5'}`}
                            onClick={() => setDrawerTab('favorites')}
                        ><Star className='p-0.5 ' />Favorites</div>
                    </div>
                </div>
                <CreateTeam isOpen={createTeam} close={() => setCreateTeam(false)} />
            </div>

        </div>
    )
}

export default Drawer