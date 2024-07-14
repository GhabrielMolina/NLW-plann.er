import { CircleDashed, UserCog } from "lucide-react";

export function Guests() {
  return (
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
  );
}
