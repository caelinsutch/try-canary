import { Post } from "@/lib/prisma";
import { useState } from "react";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);

const createPost = async (projectId: string, title: string, description: string): Promise<{ post: Post }> => {
	setLoading(true);
  
  const response = await fetch(`/api/project/${projectId}/post`, {
		method: "POST",
		body: JSON.stringify({
			title,
			description,
		}),
	});

	const data = await response.json();

  setLoading(false);

	if (!response?.ok) {
		throw new Error(data.message || "Something went wrong");
	}


	return data as { post: Post };
}


  return {
    loading,
    createPost,
  };
}