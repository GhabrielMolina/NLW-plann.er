import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import nodemailer from "nodemailer";
import { z } from "zod"; // validation library
import { dayjs } from "../lib/dayjs";
import { getMailClient } from "../lib/mail";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(), // coerce is used to convert the string to a date
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
          emails_to_invite: z.array(z.string().email()), // array of emails to invite
        }),
      },
    },
    async (request) => {
      const {
        destination,
        starts_at,
        ends_at,
        owner_name,
        owner_email,
        emails_to_invite,
      } = request.body; // get information from the request body done by the validation

      if (dayjs(starts_at).isBefore(new Date())) {
        // check if the start date is before the current date with dayjs
        throw new ClientError("Invalid trip start date");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        // check if the end date is before the start date with dayjs
        throw new ClientError("Invalid trip end date");
      }

      const trip = await prisma.trip.create({
        // create a new trip in the database passing the data
        data: {
          destination,
          starts_at,
          ends_at,
          participants: {
            createMany: {
              data: [
                {
                  name: owner_name,
                  email: owner_email,
                  is_owner: true,
                  is_confirmed: true,
                },
                ...emails_to_invite.map((email) => {
                  return { email };
                }),
              ],
            },
          },
        },
      });

      const formattedStartDate = dayjs(starts_at).format("LL");
      const formattedEndDate = dayjs(ends_at).format("LL");

      const confirmationLink = `${env.API_BASE_URL}/trips/${trip.id}/confirm`;

      // send an email to the owner of the trip with the information
      const mail = await getMailClient();
      const message = await mail.sendMail({
        from: {
          name: "Equipe Trip Planner",
          address: "dev@plann.er",
        },
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: `Confirme sua viagem para ${destination} em ${formattedStartDate}`,
        html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p></p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
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

      return { tripId: trip.id };
    }
  );
}
