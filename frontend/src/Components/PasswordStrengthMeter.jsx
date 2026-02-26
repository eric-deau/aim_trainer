import { passwordRules, passwordScore } from "../utility/utils.js";

export default function PasswordStrengthMeter({ password }) {
  const { lengthOk, upperOk, specialOk } = passwordRules(password);
  const score = passwordScore(password);

  const barClass =
    score === 0 ? "w-0" :
    score === 1 ? "w-1/3" :
    score === 2 ? "w-2/3" : "w-full";

  const barColor =
    score <= 1 ? "bg-red-500" :
    score === 2 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div className={`h-full ${barClass} ${barColor} transition-all`} />
      </div>

      <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
        <li className={lengthOk ? "text-green-600 dark:text-green-400" : ""}>• At least 5 characters</li>
        <li className={upperOk ? "text-green-600 dark:text-green-400" : ""}>• At least one uppercase letter</li>
        <li className={specialOk ? "text-green-600 dark:text-green-400" : ""}>• At least one special character</li>
      </ul>
    </div>
  );
}