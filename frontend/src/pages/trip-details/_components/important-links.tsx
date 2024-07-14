import { Link2, Plus } from "lucide-react";

export function ImportantLinks() {
  return (
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
  )
}