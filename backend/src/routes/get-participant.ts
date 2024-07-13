import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { prisma } from "../lib/prisma";

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId",
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          participantId: z.string().uuid(), // check if the tripId is a valid uuid
        }),
      },
    },
    async (request) => {
      const { participantId } = request.params; // get the tripId from the request params

      const participant = await prisma.participant.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          is_confirmed: true,
        },
        where: {
          id: participantId,
        },
      });

      if (!participant) {
        throw new Error("Participant not found");
      }

      return { participant };
    }
  );
}
