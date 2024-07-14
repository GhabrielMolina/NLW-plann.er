import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  Tag,
  UserCog,
  X,
} from "lucide-react";
import { useState } from "react";

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

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline ">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia 17
                </span>
                <span className="text-xs text-zinc-500">Sábado</span>
              </div>
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline ">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia 18
                </span>
                <span className="text-xs text-zinc-500">Domingo</span>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Academia em grupo</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {/* ml-auto replaces space-between when I only have one item that needs to be on the right*/}
                    08:00h
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Academia em grupo</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {/* ml-auto replaces space-between when I only have one item that needs to be on the right*/}
                    08:00h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="font-medium text-zinc-100 block">
                    Reserva do AirBnB
                  </span>
                  <a
                    href="#"
                    className="font-xs text-zinc-400 block truncate hover:text-zinc-200"
                  >
                    {/*truncate is a tailwind class that ... in text*/}
                    https://www.airbnb.com.br/rooms/104700011
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0" />
                {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="font-medium text-zinc-100 block">
                    Reserva do AirBnB
                  </span>
                  <a
                    href="#"
                    className="font-xs text-zinc-400 block truncate hover:text-zinc-200"
                  >
                    {/*truncate is a tailwind class that ... in text*/}
                    https://www.airbnb.com.br/rooms/104700011
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0" />
                {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
              </div>
            </div>

            <button className=" w-full justify-center bg-zinc-800 text-zinc-200 rounded-lg font-medium px-5 h-11 flex items-center gap-2 hover:bg-zinc-700">
              <Plus className="size-5" />
              Cadastrar novo link
            </button>
          </div>
          <div className="w-full h-px bg-zinc-800" /> {/* Horizontal line */}
          <div>
            <div className="space-y-6">
              <h2 className="font-semibold text-xl">Convidados</h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="font-medium text-zinc-100 block">
                      Jessica White
                    </span>
                    <span className="font-sm text-zinc-400 block truncat">
                      {/*truncate is a tailwind class that ... in text*/}
                      jessica.white44@yahoo.com
                    </span>
                  </div>
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="font-medium text-zinc-100 block">
                      Jessica White
                    </span>
                    <span className="font-sm text-zinc-400 block truncat">
                      {/*truncate is a tailwind class that ... in text*/}
                      jessica.white44@yahoo.com
                    </span>
                  </div>
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="font-medium text-zinc-100 block">
                      Jessica White
                    </span>
                    <span className="font-sm text-zinc-400 block truncat">
                      {/*truncate is a tailwind class that ... in text*/}
                      jessica.white44@yahoo.com
                    </span>
                  </div>
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="font-medium text-zinc-100 block">
                      Jessica White
                    </span>
                    <span className="font-sm text-zinc-400 block truncat">
                      {/*truncate is a tailwind class that ... in text*/}
                      jessica.white44@yahoo.com
                    </span>
                  </div>
                  <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                  {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
                </div>
              </div>

              <button className=" w-full justify-center bg-zinc-800 text-zinc-200 rounded-lg font-medium px-5 h-11 flex items-center gap-2 hover:bg-zinc-700">
                <UserCog className="size-5" />
                Gerenciar convidados
              </button>
            </div>
          </div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Cadastrar atividade</h2>
                <button type="button" onClick={closeCreateActivityModalOpen}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-zinc-400 text-sm">
                Todos convidados podem visualizar as atividades.
              </p>
            </div>

            <form className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="text-zinc-400 size-5" />
                <input
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

                <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Calendar className="text-zinc-400 size-5" />
                  <input
                    type="datetime-local"
                    name="occurs-at"
                    placeholder="Seu e-mail pessoal"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"
                  />
                </div>

              <button
                type="submit"
                className="w-full bg-lime-300 text-lime-950 rounded-lg font-medium px-5 h-11 flex items-center gap-2 hover:bg-lime-400 justify-center"
              >
                Salvar atividade
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
