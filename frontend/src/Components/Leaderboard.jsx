import { useState, useEffect } from 'react'
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardTableHeader from './LeaderboardTableHeader';
import LeaderboardUserRow from './LeaderboardUserRow';
import { getLeaderboardData } from '../utility/utils.js'


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
            <div>
                <div className="rounded-2xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-900 p-4 shadow-sm">
                    <div className="text-base text-zinc-600"></div>
                        <div className="w-full flex justify-center">
                            <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-zinc-200 overflow-hidden">
                            <LeaderboardHeader></LeaderboardHeader>
                                <table className="w-full text-base">
                                    <LeaderboardTableHeader></LeaderboardTableHeader>
                                    <LeaderboardUserRow scores={scores}></LeaderboardUserRow>   
                                </table>

                                {!scores?.length && (
                                <div className="py-10 text-center text-base text-zinc-500">
                                    No runs submitted yet.
                                </div>
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}