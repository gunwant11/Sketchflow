import { CheckIcon, ChevronDownIcon, LayoutPanelTop, PlusIcon, Star, FolderKanban } from 'lucide-react'
import React, { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import CreateTeam from './CreateTeam'
import { ProjectStore } from '@/store/project'

const Drawer = () => {
    const [createTeam, setCreateTeam] = useState(false)
    const { teams, selectedTeam, setSelectedTeam, drawerTab, setDrawerTab } = ProjectStore()

    return (
        <div className='w-[280px] bg-zinc-800/50 backdrop-blur-sm border-r border-white/5 flex'>
            {/* Teams Sidebar */}
            <div className='w-[70px] bg-zinc-900/50 backdrop-blur-sm flex flex-col items-center py-4 gap-2 border-r border-white/5'>
                <div className='mb-4'>
                    <FolderKanban className='w-8 h-8 text-violet-500' />
                </div>
                
                <div className='flex-1 flex flex-col items-center gap-2 w-full px-3'>
                    {teams && teams.map((team) => (
                        <button
                            key={team.id}
                            onClick={() => setSelectedTeam(team)}
                            className={clsx(
                                'w-full aspect-square rounded-xl transition-all duration-200 group relative',
                                'hover:bg-white/5',
                                selectedTeam?.id === team.id ? 'ring-2 ring-violet-500' : 'ring-transparent'
                            )}
                        >
                            <img 
                                src={team.image} 
                                alt={team.name} 
                                className='w-full h-full rounded-xl object-cover'
                            />
                            {/* Tooltip */}
                            <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {team.name}
                            </div>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => setCreateTeam(true)}
                    className='w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-zinc-400 hover:text-white'
                >
                    <PlusIcon className='w-5 h-5' />
                </button>
            </div>

            {/* Content Area */}
            <div className='flex-1 flex flex-col'>
                <div className='h-16 flex items-center px-4 border-b border-white/5'>
                    <h1 className='text-lg font-medium text-white'>Workspace</h1>
                </div>

                <div className='p-4 flex flex-col gap-4'>
                    {/* Team Selector */}
                    <Listbox value={selectedTeam} onChange={setSelectedTeam}>
                        <div className="relative">
                            <ListboxButton
                                className={clsx(
                                    'relative w-full rounded-lg bg-zinc-900/50 py-2 pr-8 pl-3 text-left',
                                    'border border-white/5 hover:border-white/10 transition-colors',
                                    'focus:outline-none focus:ring-2 focus:ring-violet-500/50'
                                )}
                            >
                                {selectedTeam ? (
                                    <div className="flex items-center gap-2">
                                        <img src={selectedTeam.image} alt={selectedTeam.name} className="w-6 h-6 rounded-md" />
                                        <span className="text-sm text-white truncate">{selectedTeam.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-zinc-400">Select a team...</span>
                                )}
                                <ChevronDownIcon
                                    className="absolute top-2.5 right-2.5 h-5 w-5 text-zinc-400"
                                    aria-hidden="true"
                                />
                            </ListboxButton>
                            <ListboxOptions
                                anchor="bottom"
                                transition
                                className={clsx(
                                    'w-[var(--button-width)] rounded-lg border border-white/10',
                                    'bg-zinc-800/90 backdrop-blur-sm shadow-xl p-1',
                                    '[--anchor-gap:var(--spacing-1)] focus:outline-none',
                                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                )}
                            >
                                {teams.map((team) => (
                                    <ListboxOption
                                        key={team.id}
                                        value={team}
                                        className={clsx(
                                            'group flex items-center gap-2 rounded-md py-2 px-2 cursor-default select-none',
                                            'text-sm text-white',
                                            'data-[focus]:bg-white/10 data-[selected]:bg-violet-500/20'
                                        )}
                                    >
                                        <img src={team.image} alt={team.name} className="w-6 h-6 rounded-md" />
                                        <span className="truncate">{team.name}</span>
                                        {selectedTeam?.id === team.id && (
                                            <CheckIcon className="ml-auto h-4 w-4 text-violet-500" />
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </Listbox>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        <button
                            onClick={() => setDrawerTab('teams')}
                            className={clsx(
                                'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                                'transition-colors duration-200',
                                drawerTab === 'teams' 
                                    ? 'bg-violet-500/20 text-white' 
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            <LayoutPanelTop className='w-4 h-4' />
                            Projects
                        </button>
                        <button
                            onClick={() => setDrawerTab('favorites')}
                            className={clsx(
                                'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm',
                                'transition-colors duration-200',
                                drawerTab === 'favorites' 
                                    ? 'bg-violet-500/20 text-white' 
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            <Star className='w-4 h-4' />
                            Favorites
                        </button>
                    </nav>
                </div>

                <CreateTeam isOpen={createTeam} close={() => setCreateTeam(false)} />
            </div>
        </div>
    )
}

export default Drawer