import WelcomeMessage from "./WelcomeMessage"
import AuthCard from "./AuthCard"

export default function GuestPage({ handleLogin, handleSignup }) {
    return (
        <>
            <div className="flex flex-col items-center pt-24 space-y-12">
                <WelcomeMessage></WelcomeMessage>
                <AuthCard
                onLogin={handleLogin}
                onSignup={handleSignup}
                />
            </div>
        </>
    )
}