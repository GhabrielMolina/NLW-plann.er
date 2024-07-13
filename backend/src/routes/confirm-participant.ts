import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { prisma } from "../lib/prisma";

export async function confirmParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    // method get for the route because send link by email
    "/participants/:participantId/confirm", // :participantId is a parameter in the URL
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          participantId: z.string().uuid(), // validate the participantId parameter
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params; // get the participantId from the request parameters

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) {
        throw new Error("Participant not found");
      }

      if (participant.is_confirmed) {
        return reply.redirect(
          `http://localhost:3000/trips/${participant.trip_id}`
        );
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: { is_confirmed: true },
      });

      return reply.redirect(
        `http://localhost:3000/trips/${participant.trip_id}`
      );
    }
  );
}
