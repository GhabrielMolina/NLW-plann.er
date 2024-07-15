import { Link2, Plus } from "lucide-react";
import { Button } from "../../../_components/button";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openCreateLinkModalOpen() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModalOpen() {
    setIsCreateLinkModalOpen(false);
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  });

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-medium text-zinc-100 block">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  className="font-xs text-zinc-400 block truncate hover:text-zinc-200"
                >
                  {/* truncate is a tailwind class that ... in text */}
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 shrink-0" />
              {/* shrink-0 is a tailwind class that prevents the icon from shrinking*/}
            </div>
          );
        })}
      </div>

      <Button onClick={openCreateLinkModalOpen} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModalOpen={closeCreateLinkModalOpen}/>
      )}
    </div>
  );
}
