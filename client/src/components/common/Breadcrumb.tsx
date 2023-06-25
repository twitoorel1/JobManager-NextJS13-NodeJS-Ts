import Link from 'next/link';

interface IBreadcrumbProps {
	pageName: string;
}

const Breadcrumb = ({ pageName }: IBreadcrumbProps) => {
	return (
		<div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
			<h2 className="font-semibold text-black text-title-md2">{pageName}</h2>

			<nav>
				<ol className="flex items-center gap-2">
					<li>
						<Link href="/">לוח הבקרה /</Link>
					</li>
					<li className="text-[#3C50E0]">{pageName}</li>
				</ol>
			</nav>
		</div>
	);
};

export default Breadcrumb;
