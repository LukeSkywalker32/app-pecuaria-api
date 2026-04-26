/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import app from "./app";
import { connectDataBase } from "./config/database";
import { PORT } from "./config/env";

async function bootStrap() {
   try {
      // Connect to the database
      await connectDataBase();
      // Start the server
      app.listen(PORT, () => {
         console.log(`🚀 Server running on port ${PORT}`);
         console.log(`🌎 Environment: ${process.env.NODE_ENV}`);
      });
   } catch (error) {
      console.error(`Bootstrap error:`, error);
      process.exit(1);
   }
}

bootStrap();
