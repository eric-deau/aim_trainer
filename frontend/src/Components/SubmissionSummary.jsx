
import StatSummaryRow from "./StatSummaryRow"
import StatStack from "./StatStack";


export default function SubmissionSummary({ run }) {
    return (
        <>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:bg-zinc-800">
            <StatStack>
              <StatSummaryRow label={"Score"} value={run?.score} valueClassName={"font-medium"}></StatSummaryRow>
              <StatSummaryRow label={"Hits / Shots"} value={`${run?.hits} / ${run?.shots}`} valueClassName={"font-medium"}></StatSummaryRow>
              <StatSummaryRow label={"Duration"} value={`${Math.round((run?.duration ?? 0) / 1000)}s`} valueClassName={"font-medium"}></StatSummaryRow>
              <StatSummaryRow label={"Accuracy"} value={`${run?.shots ? Math.round((run.hits / run.shots) * 100) : 0}%`} valueClassName={"font-medium"}></StatSummaryRow>
            </StatStack>
          </div>
        </>
    )
}