import React from 'react'

export default function repositoryCard({ repo }) {
    return (
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
    )
}
