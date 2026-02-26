import { useState, useEffect } from 'react'
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardTableHeader from './LeaderboardTableHeader';
import LeaderboardUserRow from './LeaderboardUserRow';

const ENDPOINT = "http://127.0.0/1:5000/"

async function getLeaderboardData() {
    try {
        const response = await fetch("/api/leaderboard");
    
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching leaderboard data: ${error}`);
    }
    
}

export default function Leaderboard() {
    const [scores, setScores] = useState();

    async function loadLeaderboard() {
        try {
            const data = await getLeaderboardData();
            const scores_array = [...data.rows];
            setScores(scores_array);
        } catch (error) {
            console.error(`Error loading leaderboard: ${error}`);
        }
    }

    useEffect(() => {
        loadLeaderboard();
    }, []);

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-zinc-200 overflow-hidden">
                   <LeaderboardHeader></LeaderboardHeader>
                    <table className="w-full text-sm">
                        <LeaderboardTableHeader></LeaderboardTableHeader>
                        <LeaderboardUserRow scores={scores}></LeaderboardUserRow>   
                    </table>

                    {!scores?.length && (
                    <div className="py-10 text-center text-sm text-zinc-500">
                        No runs submitted yet.
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}