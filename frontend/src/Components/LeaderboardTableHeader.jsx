export default function LeaderboardTableHeader() {
    return (
        <>
            <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-800 dark:text-white">
                <tr className="">
                    <th className="px-6 py-3 font-medium">#</th>
                    <th className="px-6 py-3 font-medium">Player</th>
                    <th className="px-6 py-3 font-medium">Score</th>
                    <th className="px-6 py-3 font-medium">Aim</th>
                    <th className="px-6 py-3 font-medium">Hits/sec</th>
                </tr>
            </thead>
        </>
    );
}