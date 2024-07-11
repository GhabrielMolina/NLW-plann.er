import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"; // validation library
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import { getMailClient } from "../lib/mail";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/trips', {
    // schema is the validation for the request body by ZodTypeProvider
    schema: {
      body: z.object({
        destination: z.string().min(4),
        starts_at: z.coerce.date(), // coerce is used to convert the string to a date
        ends_at: z.coerce.date(),
        owner_name: z.string(),
        owner_email: z.string().email(),
      })
    }
  }, async (request) => {
    const { destination, starts_at, ends_at, owner_name, owner_email } = request.body; // get information from the request body done by the validation

    if (dayjs(starts_at).isBefore(new Date())) { // check if the start date is before the current date with dayjs
      throw new Error('Invalid trip start date');
    }

    if(dayjs(ends_at).isBefore(starts_at)) { // check if the end date is before the start date with dayjs
      throw new Error('Invalid trip end date');
    }

    const trip = await prisma.trip.create({ // create a new trip in the database passing the data
      data: {
        destination,
        starts_at,
        ends_at
      }
    })
    
    // send an email to the owner of the trip with the information
    const mail = await getMailClient();
    const message = await mail.sendMail({
      from: {
        name: 'Trip Planner',
        address: 'dev@plann.er',
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: 'Trip Created',
      html: `Your trip to ${destination} has been created!`
    });

    console.log(nodemailer.getTestMessageUrl(message)) // log the email url to see the email sent

    return { tripId: trip.id}
  })
}