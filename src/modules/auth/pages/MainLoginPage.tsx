import { useState } from "react";
import LabelInput from "../../../global/components/forms/LabelInputs";
import { useNavigate } from "react-router-dom";

const MainLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "root" && password === "root") {
            setError("");
            navigate("/");
            return;
        }

        setError("Invalid credentials");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-8
                    shadow-2xl
                "
            >
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white">
                        Sign In
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Access the administration panel
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-5"
                >
                    <LabelInput
                        label="Username"
                        placeholder="root"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <LabelInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <span className="text-sm text-red-500">
                            {error}
                        </span>
                    )}

                    <button
                        type="submit"
                        className="
                            mt-2
                            rounded-xl
                            bg-white
                            py-3
                            font-semibold
                            text-black
                            transition-all
                            duration-200
                            hover:scale-[1.01]
                            hover:bg-zinc-200
                        "
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-zinc-600">
                    Demo credentials: root / root
                </div>
            </div>
        </div>
    );
};

export default MainLoginPage;