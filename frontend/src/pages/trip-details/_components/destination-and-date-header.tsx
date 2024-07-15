import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../_components/button";
import { api } from "../../../lib/axios";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams(); // returns parameters that exist in the URL
  const [trip, setTrip] = useState<Trip | undefined>();

  // useEffect controls when something will execute upon state change [''], so as not to render repeatedly
  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip)); // Request to the backend and set the trip state with interface Trip data type
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.starts_at, "d'  de  'LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d'  de  'LLL"))
    : null;

  return (
    <div className="h-16 px-4 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex gap-2 items-center">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
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
