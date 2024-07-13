import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { dayjs } from "../lib/dayjs";
import { prisma } from "../lib/prisma";

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          tripId: z.string().uuid(), // check if the tripId is a valid uuid
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(), // coerce is used to convert the string to a date
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params; // get the tripId from the request params
      const { destination, starts_at, ends_at } = request.body; // get information from the request body done by the validation

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (dayjs(starts_at).isBefore(new Date())) {
        // check if the start date is before the current date with dayjs
        throw new Error("Invalid trip start date");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        // check if the end date is before the start date with dayjs
        throw new Error("Invalid trip end date");
      }

      await prisma.trip.update({
        where: { id: tripId },
        data: {
          destination,
          starts_at,
          ends_at,
        },
      });

      return { tripId: trip.id };
    }
  );
}
