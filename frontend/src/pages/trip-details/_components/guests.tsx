import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../_components/button";
import { api } from "../../../lib/axios";
import { ConfirmGuestsModal } from "./confirm-guests-modal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams(); // returns parameters that exist in the URL
  const [participants, setParticipants] = useState<Participant[]>();
  const [isConfirmGuestsModalOpen, setIsConfirmGuestsModalOpen] = useState(false);

  function openConfirmGuestsModalOpen() {
    setIsConfirmGuestsModalOpen(true);
  }

  function closeConfirmGuestsModalOpen() {
    setIsConfirmGuestsModalOpen(false);
  }


  // useEffect controls when something will execute upon state change [''], so as not to render repeatedly
  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants)); // Request to the backend and set the trip state with interface Participants data type
  }, [tripId]);

  return (
    <div>
      <div className="space-y-6">
        <h2 className="font-semibold text-xl">Convidados</h2>

        <div className="space-y-5">
          {participants?.map((participant, index) => {
            return (
              <div
                key={participant.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="font-medium text-zinc-100 block">
                    {participant.name ?? "Convidado " + index}
                  </span>
                  <span className="font-sm text-zinc-400 block truncat">
                    {/*truncate is a tailwind class that ... in text*/}
                    {participant.email}
                  </span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 text-green-400 shrink-0" />
                ) : (
                  //  {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  // {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                )}
              </div>
            );
          })}
        </div>

        <Button onClick={openConfirmGuestsModalOpen} variant="secondary" size="full">
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>

        {isConfirmGuestsModalOpen && (
          <ConfirmGuestsModal closeConfirmGuestsModalOpen={closeConfirmGuestsModalOpen} />
        )}
      </div>
    </div>
  );
}
