import { useState } from "react";
import LabelInput from "../../../global/components/forms/LabelInputs";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

const MainLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: username,
                password: password,
            });

            if (signInError) {
                if (signInError.message === "Invalid login credentials") {
                    setError("Credenciales incorrectas. Verifique su correo y contraseña.");
                } else if (signInError.message === "Email not confirmed") {
                    setError("El correo electrónico aún no ha sido confirmado.");
                } else {
                    setError(signInError.message);
                }
                return;
            }

            navigate("/");
        } catch (err: unknown) {
            console.error(err);
            setError("Ocurrió un error inesperado al iniciar sesión.");
        } finally {
            setLoading(false);
        }
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
                        Iniciar Sesión
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Accede al panel de administración
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-5"
                >
                    <LabelInput
                        label="Correo Electrónico"
                        placeholder="ejemplo@correo.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required
                    />

                    <LabelInput
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />

                    {error && (
                        <span className="text-sm text-red-500">
                            {error}
                        </span>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                            mt-2
                            rounded-xl
                            bg-white
                            py-3
                            font-semibold
                            text-black
                            transition-all
                            duration-200
                            ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.01] hover:bg-zinc-200"}
                        `}
                    >
                        {loading ? "Iniciando Sesión..." : "Ingresar"}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-zinc-600">
                    Panel de Administración de Citas
                </div>
            </div>
        </div>
    );
};

export default MainLoginPage;