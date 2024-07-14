import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../../_components/button";

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
        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}