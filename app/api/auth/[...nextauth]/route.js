import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //get the data about the user every single time to keep an existing and above running session.
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session; //to make sure which user is currently online
    },
    async signIn({ profile }) {
      // every nextjs route is a serverless route.
      //serverless route -> lambda function -> It opens up only when it gets called
      try {
        await connectToDb();
        //check if the user already exist
        const userExists = await User.findOne({
          email: profile.email,
        });

        //If not, create a new user and save it to the DB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
