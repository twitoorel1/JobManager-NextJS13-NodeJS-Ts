import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
	return (
		<div>
			<h1>AdminPage</h1>
			<Link href={'/'} className="underline underline-black">
				Go Home
			</Link>

		</div>
	);
};

export default AdminPage;
