export default function LeaderboardUserRow({ scores }) {
    return (
        <>
            <tbody>
                {scores?.map((score, index) => {
                    const isTop3 = index < 3;
                    const acc = score.shots ? ((score.hits / score.shots) * 100).toFixed(1) : 0;

                    return (
                        <tr
                        key={`${score.username}-${index}`}
                        className="
                            border-t border-zinc-100
                            hover:bg-zinc-50
                            dark:hover:bg-zinc-800
                            transition-colors
                            text-center
                        "
                        >
                            <td className="px-6 py-4 font-semibold">
                                <span
                                className={[
                                    "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                                    index === 0 && "bg-yellow-100 text-yellow-700",
                                    index === 1 && "bg-gray-200 text-gray-700",
                                    index === 2 && "bg-amber-200 text-amber-800",
                                    index > 2 && "bg-zinc-100 text-zinc-600",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                >
                                {index + 1}
                                </span>
                            </td>

                            <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                                {score.username}
                            </td>

                            <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
                                {score.score.toLocaleString()}
                            </td>
                            
                            <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
                                {`${acc}%`}
                            </td>

                            <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-white">
                                {`${(score.hits / (score.duration_ms / 1000)).toFixed(1)}`}
                            </td>
                            
                        </tr>
                    );
                })}
            </tbody>
        </>
    )
}