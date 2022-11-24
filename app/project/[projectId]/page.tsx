import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/Molecules/PostCard';
import { FormInput } from '@/components/FormComponents/FormInput';
import { FormTextArea } from '@/components/FormComponents/FormTextArea';
import { Button } from '@/components/Atoms/Button';
import { CreatePost } from './CreatePost';

const getProject = async (projectId: string) => {
  return db.project.findFirst({
    where: {
      id: projectId,
    },
  });
};

const getProjectPosts = async (projectId: string) => {
  return db.post.findMany({
    where: {
      projectId,
    },
    include: {
      upvotes: {
        select: {
          id: true,
        },
      },
    },
  });
};

type ProjectPageProps = {
  params: { projectId: string };
};

const ProjectPage = async ({ params: { projectId } }: ProjectPageProps) => {
  const project = await getProject(projectId);

  if (!project) return notFound();

  const posts = await getProjectPosts(projectId);

  return (
    <div>
      <div className="grid grid-cols-4">
        <CreatePost/>
        {posts.length === 0 ? (
          <div className="col-span-3 text-center justify-center items-center flex">
            <h2 className="text-gray-600 font-semibold text-md">
              No posts found :(
            </h2>
          </div>
        ) : (
          <div className="grid col-span-3 items-start gap-8">
            {posts.map(({ id, title, upvotes }) => (
              <PostCard
                id={id}
                title={title}
                upvotes={upvotes.length}
                key={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
