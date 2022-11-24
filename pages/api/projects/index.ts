import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import * as z from "zod";

import { db } from "@/lib/db";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { withAuthentication } from "@/lib/api-middlewares/with-authentication";

const projectCreateSchema = z.object({
  name: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const posts = await db.project.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        where: {
          creatorId: session.user.id,
        },
      });

      return res.json(posts);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    try {
      const body = projectCreateSchema.parse(JSON.parse(req.body));

      const post = await db.project.create({
        data: {
          name: body.name,
          creatorId: session.user.id,
        },
        select: {
          id: true,
        },
      });

      return res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      console.log(error);

      return res.status(500).end();
    }
  }
};

export default withMethods(["GET", "POST"], withAuthentication(handler));
