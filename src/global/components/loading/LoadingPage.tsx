import IsotipoOrientarte from "../../../assets/IsotipoOrientartePNG.png";

interface LoadingPageProps {
  message?: string;
}

export default function LoadingPage({
  message = "Cargando...",
}: LoadingPageProps) {
  return (
    <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">

      <div className="flex flex-col items-center justify-center gap-6 py-8">

        <img
          src={IsotipoOrientarte}
          alt="Orientarte"
          className="w-16 h-16 animate-pulse"
        />

        {/* Skeleton */}

        <div className="w-full max-w-md space-y-4 animate-pulse">

          <div className="h-4 rounded-full bg-zinc-200" />

          <div className="h-4 w-3/4 rounded-full bg-zinc-200" />

          <div className="h-4 w-5/6 rounded-full bg-zinc-200" />

        </div>

        <p className="text-sm text-zinc-500 font-medium">
          {message}
        </p>

      </div>

    </div>
  );
}