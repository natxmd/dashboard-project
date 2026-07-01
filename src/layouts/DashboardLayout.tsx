import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import Sidebar from "../global/components/sidebar/Sidebat";
import { supabase } from "../lib/supabase";

const DashboardLayout = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-[#F7F7F7]">
                <div className="text-center">
                    <p className="text-zinc-500 font-medium animate-pulse">Cargando sesión...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex max-h-screen overflow-hidden">
            <Sidebar />

            <main className="flex-1 bg-white overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
