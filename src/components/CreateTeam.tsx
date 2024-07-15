import { ProjectStore } from '@/store/project'
import { UserStore } from '@/store/user'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Upload } from 'lucide-react'
import { use, useRef, useState } from 'react'

interface CreateTeamProps {
    isOpen: boolean
    close: () => void
}

export default function CreateTeam({ isOpen, close }: CreateTeamProps) {

    const fileInput = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<FileList | null>(null)
    const [teamName, setTeamName] = useState('')
    const { user } = UserStore()
    const { setTeams, teams } = ProjectStore()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files)
            console.log(e.target.files)
        }
    }

    const createTeam = async () => {
        if (teamName) {
            console.log(files, teamName)
            // get base64 of the image
            let teamImage = ''
            if (files && files[0]) {
                const reader = new FileReader()
                reader.onload = () => {
                    teamImage = reader.result as string
                }

                reader.readAsDataURL(files[0])
            }
            else {
                teamImage = `https://ui-avatars.com/api/?name=${teamName}&background=0D8ABC&color=fff`


            }
            try {
                // create team
                const newTeam = await fetch('/api/team', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamName, teamImage, userId: user?.id }),
                });
                const data = await newTeam.json();
                setTeams([...teams, data.team])
                close()
            } catch (error) {
                console.error(error)
            }

        }
        close()
    }

    const openFileInput = () => {
        fileInput.current?.click()
    }

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <DialogBackdrop className="fixed inset-0 bg-black/40" />
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-zinc-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-xl font-medium text-white">
                                Create Team
                            </DialogTitle>
                            <div className='flex gap-4 mt-6'>
                                <input type="file" className='hidden' ref={fileInput} onChange={handleFileChange} files={files} accept='image/*' />
                                <div className='w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center cursor-pointer' onClick={openFileInput}>
                                    <Upload className='p-.5' />
                                </div>
                                <div className='flex flex-col justify-evenly '>
                                    <div className='text-sm' >Profile Image</div>
                                    <div className='text-sm text-indigo-400 cursor-pointer' onClick={openFileInput} >{files && files[0]?.name || 'Upload Image'}</div>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <div className='text-xs font-medium text-white'>Team Name</div>
                                <input type="text" className='w-full bg-white/5 mt-1.5 rounded-lg p-2 text-sm outline-none text-white' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                            </div>

                            <button className='bg-violet-500 border  border-violet-500 float-right text-white p-1.5 px-10 text-sm rounded-md mt-8' onClick={createTeam}>Create</button>


                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}