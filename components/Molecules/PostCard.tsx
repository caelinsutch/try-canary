import { db } from '@/lib/db';
import { Post } from '@/lib/prisma';

type PostCardProps = {
  id: string;
  title: string;
  upvotes: number;
};

export const PostCard = ({ id, title, upvotes }: PostCardProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2>{title}</h2>
    </div>
  );
};
