import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/links",
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          tripId: z.string().uuid(), // check if the tripId is a valid uuid
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params; // get the tripId from the request params

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          links: true,
        },
      });

      if (!trip) {
        throw new ClientError("Trip not found");
      }

      return { links: trip.links };
    }
  );
}
