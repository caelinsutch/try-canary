'use client';

import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/FormComponents/FormInput";
import { FormTextArea } from "@/components/FormComponents/FormTextArea";
import { useSession } from "next-auth/react";

export const CreatePost = () => {
  const { status } = useSession();

  console.log(status)
  
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center grid gap-2">
          <h2 className="text-gray-600 text-sm">Create a Post</h2>
					<FormInput
						label="Title"
						placeholder='A short, concise title'
					/>
					<FormTextArea
						label="Post"
						placeholder='Any additional details'
					/>
					<div className="flex justify-between">
						<div/>
						<Button>
							Create Post
						</Button>
					</div>
        </div>
  );
};