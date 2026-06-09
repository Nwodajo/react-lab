import { Link } from 'react-router-dom';

function NotFoundPage() {
return (
<div>
<h1>404 - Page Not Found</h1>

<p>
Sorry, the page you are looking for does not exist.
</p>

<p>
Use the link below to return to the home page.
</p>

<Link to="/">Go Home</Link>
</div>
);
}

export default NotFoundPage;
