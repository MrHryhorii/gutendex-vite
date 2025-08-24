import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="container">
            <nav className="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorite">Favorite books</NavLink>
                <div className="spacer" />
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}