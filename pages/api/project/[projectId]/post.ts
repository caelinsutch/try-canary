import { withAuthentication } from "@/lib/api-middlewares/with-authentication";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { createPostSchema } from "@/lib/validations/post";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";



const ProjectPostHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { projectId } = req.query;

  if (req.method === "POST") {
    try {
      const body = createPostSchema.parse(JSON.parse(req.body));

      const post = await db.post.create({
        data: {
          projectId: projectId as string,
          creatorId: session.user.id,
          title: body.title,
          description: body.description,
        },
      });

      return res.status(200).json({ post });

    } catch (error) {
        if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).json({ message: error.message });
    }
  }
}

export default withMethods(["POST"], withAuthentication(ProjectPostHandler));