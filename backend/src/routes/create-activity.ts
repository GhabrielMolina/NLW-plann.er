import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          tripId: z.string().uuid(), // check if the tripId is a valid uuid
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(), // coerce is used to convert the string to a date
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params; // get the tripId from the request params
      const { title, occurs_at } = request.body; // get information from the request body done by the validation

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (dayjs(occurs_at).isBefore(trip.starts_at)) {
        throw new Error("Invalid activity date");
      }

      if (dayjs(occurs_at).isAfter(trip.ends_at)) {
        throw new Error("Invalid activity date");
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          trip_id: tripId,
        },
      });

      return { activityId: activity.id };
    }
  );
}
