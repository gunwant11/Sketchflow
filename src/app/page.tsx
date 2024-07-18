'use client';
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Home = () => {
    const { data: session } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (session && session.user) {
            router.push('/dashboard')
        }
    }
        , [session])
    const handleSignIn = async () => {
        const res = await signIn('google', { callbackUrl: '/dashboard' });
    }
    return (
        <div className='wrapper'>
            <div className=" relative h-screen grid place-items-center">
                <div className='hero'></div>
                <div className="relative content container m-auto px-6 text-zinc-900 md:px-12 xl:px-40">
                    <div className="m-auto md:w-7/12 lg:w-5/12 xl:w-5/12">
                        <div className="rounded-xl bg-zinc-800 shadow-xl">
                            <div className="p-6 sm:p-16">
                                <div className="flex w-full gap-6">
                                    <div className='h-10' ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 245 258" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M153.188 28.6609L152.11 28.0385C133.546 17.3205 110.674 17.3205 92.1096 28.0385L50 52.3504C31.4359 63.0684 20 82.876 20 104.312V152.936C20 174.372 31.4359 194.179 50 204.897L92.1096 229.209C110.674 239.927 133.546 239.927 152.11 229.209L194.219 204.897C212.783 194.179 224.219 174.372 224.219 152.936V104.312C224.219 88.5372 218.026 73.6442 207.356 62.6066C212.586 58.1397 216.424 52.0912 218.129 45.2018C234.557 60.1837 244.219 81.5599 244.219 104.312V152.936C244.219 181.517 228.971 207.927 204.219 222.218L162.11 246.53C137.357 260.821 106.862 260.821 82.1096 246.53L40 222.218C15.2479 207.927 0 181.517 0 152.936V104.312C0 75.7307 15.2479 49.3206 40 35.0299L82.1096 10.718C106.862 -3.57267 137.357 -3.57267 162.11 10.718L163.801 11.6943C158.701 16.0724 154.932 21.9584 153.188 28.6609Z" fill="#d1d1d1" />
                                        <path d="M63.1096 129.124C63.1096 96.8153 89.301 70.6239 121.61 70.6239V70.6239C153.918 70.6239 180.11 96.8153 180.11 129.124V129.124C180.11 161.433 153.918 187.624 121.61 187.624V187.624C89.301 187.624 63.1096 161.433 63.1096 129.124V129.124Z" fill="#d1d1d1" />
                                        <rect x="163.11" y="13.624" width="45" height="45" rx="22.5" fill="rgb(124 58 237)" />
                                    </svg>
                                    </div>
                                    <h2 className=" text-2xl text-white font-bold">Sign in to unlock the <br /> best of <span className="text-violet-600">Sketchflow.</span></h2>
                                </div>
                                <div className="mt-8 grid space-y-4">
                                    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-violet-600 focus:bg-blue-50 active:bg-blue-100" onClick={() => handleSignIn()}>
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-5" alt="google logo" />
                                            <span className="block w-max font-semibold tracking-wide text-white text-sm transition duration-300 group-hover:text-violet-600 sm:text-base">Continue with Google</span>
                                        </div>
                                    </button>
                                    {/* <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Github</span>
                                        </div>
                                    </button>
                                    <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg" className="absolute left-0 w-5" alt="Facebook logo" />
                                            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Facebook</span>
                                        </div>
                                    </button> */}
                                </div>

                                <div className="mt-14 space-y-4 text-gray-600 text-center sm:-mb-8">
                                    <p className="text-xs">By proceeding, you agree to our <a href="#" className="underline">Terms of Use</a> and confirm you have read our <a href="#" className="underline">Privacy and Cookie Statement</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home