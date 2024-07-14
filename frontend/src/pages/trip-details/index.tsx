import { Plus } from "lucide-react";
import { useState } from "react";
import { Activities } from "./_components/activities";
import { CreateActivityModal } from "./_components/create-activity-modal";
import { DestinationAndDateHeader } from "./_components/destination-and-date-header";
import { Guests } from "./_components/guests";
import { ImportantLinks } from "./_components/important-links";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModalOpen() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModalOpen() {
    setIsCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModalOpen}
              className="bg-lime-300 text-lime-950 rounded-lg font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar Atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" /> {/* Horizontal line */}
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModalOpen={closeCreateActivityModalOpen}
        />
      )}
    </div>
  );
}
