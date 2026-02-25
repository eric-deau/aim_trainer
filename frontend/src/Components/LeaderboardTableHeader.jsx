export default function LeaderboardTableHeader() {
    return (
        <>
            <thead className="bg-zinc-50 text-zinc-600">
                <tr className="text-left">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Player</th>
                <th className="px-6 py-3 font-medium">Score</th>
                <th className="px-6 py-3 font-medium text-right">Aim</th>
                </tr>
            </thead>
        </>
    );
}