export default function WelcomeMessage() {
    return (
        <>
            <div className="text-center max-w-3xl space-y-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Welcome to <span className="text-zinc-900 dark:text-white">Git Gud</span>
                </h1>

                <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
                  Click the circles. But not to the beat.
                </p>
              </div>
        </>
    )
}