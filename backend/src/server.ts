import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { createTrip } from "./routes/create-trip";
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";

const app = fastify();

app.register(cors, {
  origin: "*", // Allow only requests from localhost:
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip); // Register the createTrip route
app.register(confirmTrip); // Register the confirmTrip route
app.register(confirmParticipants); // Register the confirmParticipants route
app.register(createActivity); // Register the createActivity route
app.register(getActivities); // Register the getActivities route
app.register(createLink); // Register the createLink route

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
