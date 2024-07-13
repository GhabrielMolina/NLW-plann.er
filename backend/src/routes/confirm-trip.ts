import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from "zod"; // validation library
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    // method get for the route because send link by email
    "/trips/:tripId/confirm", // :tripId is a parameter in the URL
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          tripId: z.string().uuid(), // validate the tripId parameter
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params; // get the tripId from the request parameters

      const trip = await prisma.trip.findUnique({
        // find the trip by the id
        where: {
          id: tripId,
        },
        include: { // include = join the participants table to get the participants of the trip
          participants: {
            where: {
              is_owner: false,
            }
          }
        }
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (trip.is_confirmed) {
        // check if the trip is already confirmed and redirect to the frontend
        return reply.redirect(`http://localhost:3000/trips/${tripId}`);
      }

      await prisma.trip.update({
        // update the trip to confirm by the id and set is_confirmed to true in db
        where: { id: tripId },
        data: { is_confirmed: true },
      });


      const formattedStartDate = dayjs(trip.starts_at).format("LL");
      const formattedEndDate = dayjs(trip.ends_at).format("LL");

      // send an email to the owner of the trip with the information
      const mail = await getMailClient();

      await Promise.all([
        trip.participants.map(async (participant) => {
          const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`;

          const message = await mail.sendMail({
            from: {
              name: "Equipe Trip Planner",
              address: "dev@plann.er",
            },
            to: participant.email,
            subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate}`,
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
              <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
              <p></p>
              <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
              <p></p>
              <p>
                <a href=${confirmationLink}>Confirmar viagem</a>
              </p>
              <p></p>
              <p>Caso você não saiba do que se trata esse e-mail, apenas ignore esse e-mail.</p>
            </div>
            `.trim(),
          });
    
          console.log(nodemailer.getTestMessageUrl(message)); // log the email url to see the email sent
    
        })
      ])

      return reply.redirect(`http://localhost:3000/trips/${tripId}`);
    }
  );
}
