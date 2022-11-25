import { withAuthentication } from "@/lib/api-middlewares/with-authentication";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const upvotePostHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const { postId } = req.query;

  if (req.method === "POST") {
    try {
      const post = await db.postUpvote.create({
        data: {
          postId: postId as string,
          creatorId: session.user.id,
        }
      })

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default withMethods(["POST"], withAuthentication(upvotePostHandler));