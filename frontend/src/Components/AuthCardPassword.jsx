import { useState, useEffect } from 'react';

export default function AuthCardPassword({ password, onChange, mode }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
    }, [mode]);

    return (
        <>
            <div>
                <label className="text-base font-medium text-zinc-700 dark:text-white">Password</label>
                <div className="relative mt-1">
                     <input
                        className="mt-1 w-full rounded-xl border border-zinc-200 bg-white dark:bg-zinc-800 px-3 py-2 text-base outline-none focus:ring-2 
                        focus:ring-zinc-300 dark:placeholder-white dark:text-white"
                        value={password}
                        onChange={onChange}
                        type={show ? "text" : "password"}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        placeholder="min 8 characters"
                    />
                    <label className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 select-none">
                        <input
                        type="checkbox"
                        checked={show}
                        onChange={(e) => setShow(e.target.checked)}
                        className="
                            h-4 w-4 rounded border-zinc-300 text-zinc-900
                            focus:ring-zinc-300 dark:border-zinc-600 dark:bg-zinc-800
                        "
                        />
                        Show password
                    </label>
                </div>
            </div>
        </>
    )
}