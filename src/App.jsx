import React, { useState } from 'react'
import illustration from './assets/illustration.svg'

export default function App() {
    const [repositoryData, setRepositoryData] = useState([])
    const [inputData, setInputData] = useState('')
    const [showIllustration, setShowIllustration] = useState(true)

    const findRepos = async (e) => {
        e.preventDefault()
        if (inputData.length) {
            const response = await (await fetch('https://api.github.com/users/' + inputData + '/repos')).json()
            setShowIllustration(false)
            setRepositoryData(response)
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen p-3">
            <div className="mx-auto max-w-screen-lg pt-6 space-y-5">
                <p className="text-lg text-center md:text-2xl font-bold">Find GitHub Repository by Username</p>
                <form onSubmit={(e) => findRepos(e)} >
                    <div className="bg-white flex rounded-lg px-4 py-2 max-w-screen-sm mx-auto" >
                        <input value={inputData} onChange={(e) => setInputData(e.target.value)} className="bg-transparent focus:outline-none w-full" type="text" placeholder="username goes here" />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {
                    showIllustration ? (
                        <div className="pt-16">
                            <img className="block md:max-w-screen-sm opacity-50 mx-auto" src={illustration} alt="" />
                        </div>
                    ) : (
                        <div className="py-2">
                            {
                                repositoryData.message ? <p className="text-center text-lg font-bold">{repositoryData.message}</p> : (
                                    repositoryData.length ? (
                                        <div className="space-y-3">
                                            <p className="font-bold text-gray-500 text-center md:text-right">{repositoryData.length} Repository Found</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {
                                                    repositoryData.map(repo => (
                                                        <div key={repo.id} className="p-3 border-2 rounded-lg bg-white space-y-2 shadow-md">
                                                            <div className="space-y-1">
                                                                <a className="text-blue-500 font-semibold" href={repo.html_url} rel="noreferrer" target="_blank" >{repo.name}</a>
                                                                <div className="h-16 overflow-auto text-gray-500 font-medium">
                                                                    {
                                                                        repo.description ? (
                                                                            <p>{repo.description}</p>
                                                                        ) : <p>This repo doesnt containt a description</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between text-gray-500 font-light">
                                                                <p>Language: {repo.language ? repo.language : 'Others'}</p>
                                                                <p>{repo.default_branch}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : <p className="text-center text-lg font-bold ">This user doesnt have any public repository :(</p>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
