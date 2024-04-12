let msg = "👋🚀⚡🔥🚀  TradeKeeper  👋🚀⚡🔥🚀";
let symbols = ` 
$ - Dollar Symbol (USD)
€ - Euro Symbol (EUR)
£ - Pound Symbol (GBP)
¥ - Yen Symbol (JPY)
₹ - Rupee Symbol (INR)`;

console.log(msg, symbols);

// Current time zone
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("Current Time Zone:", timeZone);

import { app } from "./app";
import { Database } from "./config/db/database";

const port = process.env.PORT || 8080;
const database = new Database();

// Connect to the database with retry mechanism
database
  .connectWithRetry()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  })
  .catch((error: Error) => {
    console.error("Error on Server", error);
  });
