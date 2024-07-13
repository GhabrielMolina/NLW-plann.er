import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { dayjs } from "../lib/dayjs";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
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
          activities: {
            orderBy: {
              occurs_at: "asc",
            },
          },
        },
      });

      if (!trip) {
        throw new ClientError("Trip not found");
      }

      // diff method returns the difference in days between the two dates (end date - start date of the trip)
      const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
        trip.starts_at,
        "days"
      );
      const activities = Array.from({
        length: differenceInDaysBetweenTripStartAndEnd + 1,
      }).map((_, index) => {
        // create an array and map over it with _ as the value and index as the index
        const date = dayjs(trip.starts_at).add(index, "days"); // add the index to the start date of the trip (DD/MM/YYYY)

        return {
          date: date.toDate(), // convert the date to a JS date object
          activities: trip.activities.filter((activity) => {
            // filter the activities that occur on the same day as the current date
            return dayjs(activity.occurs_at).isSame(date, "day"); // isSame method checks if the activity occurs on the same day as the current date
          }),
        };
      });

      return { activities };
    }
  );
}
