import Link from 'next/link';

function MainHeader() {
	return (
		<nav className="navbar navbar-expand navbar-dark bg-primary shadow-sm">
			<Link className='navbar-brand' href="/">
				<a className='navbar-brand'>
					Actividades
					<span className='badge badge-pill badge-light ml-2'>
						{/* { this.state.activities.length } */}
					</span>
				</a>
			</Link>

			<ul className="navbar-nav mt-2 mt-0 ml-auto">
				<li className="nav-item active">
					<p className='nav-link m-0'>Administrador</p>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#" title='Cerrar Sesión'>❌</a>
				</li>
			</ul>
		</nav>
	);
}

export default MainHeader;
