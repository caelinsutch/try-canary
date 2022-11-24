import Link from "next/link";
import { Icons } from "@/components/Icons";
import { UserAccountNav } from "@/components/UserAccountNav";
import { User } from "next-auth";

type HeaderProps = {
	user?: Pick<User, "name" | "image" | "email">;
};

export const Header = ({ user }: HeaderProps) => (
	<header className="flex h-[64px] items-center justify-between pl-2">
		<Link href="/" className="flex items-center space-x-2">
			<Icons.logo className="dark:text-white text-slate-900" />
			<span className="text-lg font-bold dark:text-white text-slate-900">
				Try Canary
			</span>
		</Link>
		<UserAccountNav
			user={{
				name: user.name,
				image: user.image,
				email: user.email,
			}}
		/>
	</header>
);
