import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { createTrip } from "./routes/create-trip";
import { confirmParticipants } from "./routes/confirm-participant";

const app = fastify();

app.register(cors, {
  origin: "*", // Allow only requests from localhost:
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip); // Register the createTrip route
app.register(confirmTrip); // Register the confirmTrip route
app.register(confirmParticipants); // Register the confirmParticipants route

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
