import { MapPin, Calendar, Settings2 } from "lucide-react";

export function DestinationAndDateHeader() {
  return (
    <div className="h-16 px-4 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">Florianópolis, Brasil</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex gap-2 items-center">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">16 a 14 de Agosto</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" /> {/* Vertical line */}
        <button className="bg-zinc-800 text-zinc-200 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-zinc-700">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      </div>
    </div>
  );
}
