import { X, Tag, Link2 } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../_components/button";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinkModalOpen: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModalOpen,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // When there are only HTML inputs in the code, you can do it this way
    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    closeCreateLinkModalOpen();

    window.document.location.reload(); // Reloads the page to show the new activity in the list
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar link</h2>
            <button type="button" onClick={closeCreateLinkModalOpen}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-zinc-400 text-sm">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="url"
              name="url"
              placeholder="URL"
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
