import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationAndDateStep } from "./_components/_steps/destination-and-date-step.tsx";
import { InviteGuestStep } from "./_components/_steps/invite-guests-step.tsx";
import { ConfirmTripModal } from "./_components/confirm-trip-modal.tsx";
import { InviteGuestsModal } from "./_components/invite-guests-modal.tsx";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    "ghabrielmolina@hotmail.com",
    "ghabriel.m@edu.pucrs.br",
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    // The event is of type FormEvent, and the target is of type HTMLFormElement (generic)
    event.preventDefault(); // Prevents the page from reloading when submitting the form (default reload behavior)

    const data = new FormData(event.currentTarget); // To get event data from the form, you need to say that it is happening from an HTMLFormElement specifically
    const email = data.get("email")?.toString(); // Get the value of the email field and convert it to a string

    if (!email) return; // If the email is empty, return

    if (emailsToInvite.includes(email)) return; // If the email is already in the list, return

    setEmailsToInvite([...emailsToInvite, email]); // Spread the current emails and add the new email

    event.currentTarget.reset(); // Reset the form after adding the email
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate("/trips/123");
  }

  return (
    // {/* h-screen Occupies 100% of the div  */}
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}
    </div>
  );
}
