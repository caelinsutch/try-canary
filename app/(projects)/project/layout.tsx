import { getUser } from "@/lib/ServerUtils/getUser";
import { Header } from "@/components/Organisms/Header";

const ProjectLayout = async ({ children }) => {
  const user = await getUser();

  return (
    <div className="mx-auto flex h-screen max-w-[1440px] flex-col space-y-6 overflow-hidden px-6">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
};

export default ProjectLayout;
