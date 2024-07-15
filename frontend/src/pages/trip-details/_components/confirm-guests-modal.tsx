import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Mail, User, X } from "lucide-react";
import { Button } from "../../../_components/button";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

interface ConfirmGuestsModalProps {
  closeConfirmGuestsModalOpen: () => void;
}

export function ConfirmGuestsModal({
  closeConfirmGuestsModalOpen,
}: ConfirmGuestsModalProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    // Fetch the participants for the trip when the component mounts
    api.get(`/trips/${tripId}/participants`)
      .then(response => setParticipants(response.data.participants))
  }, [tripId]);

  const confirmGuests = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const participantId = participants.find(p => p.email === email)?.id;

    if (!participantId) {
      alert('Participante não encontrado');
      return;
    }

    // try {
    //   const response = await api.patch(`/participants/${participantId}/confirm`);
    //   console.log(response.data);
    //   alert('Participante confirmado com sucesso!');
    // } catch (error) {
    //   console.error('Erro ao confirmar participante:', error);
    //   alert('Erro ao confirmar participante');
    // }
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Confirmar participação</h2>
            <button type="button" onClick={closeConfirmGuestsModalOpen}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Você foi convidado(a) para participar de uma viagem para{" "}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>
            .
            <br /> <br />
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </p>
        </div>

        <form onSubmit={confirmGuests} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
            />
          </div>

          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
