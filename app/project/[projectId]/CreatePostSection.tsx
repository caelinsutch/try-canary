'use client';

import { Button } from '@/components/Atoms/Button';
import toast from '@/components/Atoms/Toast';
import { FormInput } from '@/components/FormComponents/FormInput';
import { FormTextArea } from '@/components/FormComponents/FormTextArea';
import { CreatePostData, createPostSchema } from '@/lib/validations/post';
import { useCreatePost } from '@/prisma/hooks/useCreatePost';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';

type CreatePostSectionProps = {
  projectId: string;
};

export const CreatePostSection: React.FC<CreatePostSectionProps> = ({
  projectId,
}) => {
  const router = useRouter();
  const path = usePathname();
  const { status } = useSession();
  const { createPost, loading } = useCreatePost();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>({
    // resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostData) => {
    console.log(data);
    if (status !== 'authenticated') {
      return router.push(`/login?redirect=${encodeURI(path)}`);
    }
    try {
      const { post } = await createPost(
        projectId,
        data.title,
        data.description
      );

      toast({
        title: 'Post created!',
        type: 'success',
      });

      await router.push(`/project/${projectId}/post/${post.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: error.messsage,
        message: 'Project not created. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center grid gap-2">
      <h2 className="text-gray-600 text-sm">Create a Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <FormInput
          label="Title"
          placeholder="A short, concise title"
          error={errors?.title?.message}
          {...register('title')}
        />
        <FormTextArea
          label="Post"
          placeholder="Any additional details"
          error={errors?.description?.message}
          {...register('description')}
        />
        <div className="flex justify-between">
          <div />
          <Button type="submit" isLoading={loading}>
            Create Post
          </Button>
        </div>
      </form>
    </div>
  );
};
