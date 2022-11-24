import "styles/globals.css";
import { Toaster } from "@/components/Atoms/Toast";
import React from "react";

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
	<html
		lang="en"
		className="dark:bg-black bg-white text-slate-900 dark:text-white antialiased"
	>
		<head />
		<body className="min-h-screen">{children}</body>
		<Toaster position="bottom-right" />
	</html>
);

export default RootLayout;
