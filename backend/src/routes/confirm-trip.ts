import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library

export async function confirmTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/confirm", // :tripId is a parameter in the URL
    {
      // schema is the validation for the request body by ZodTypeProvider
      schema: {
        params: z.object({
          tripId: z.string().uuid(), // validate the tripId parameter
        }),
      },
    },
    async (request) => {
      return { tripId: request.params.tripId };
    }
  );
}
