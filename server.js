import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import schema from "./schema";

const app = express();

// Allow cross-origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
