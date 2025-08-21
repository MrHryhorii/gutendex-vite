import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div style={{ padding: 20 }}>
            <nav style={{ display: "flex", gap: 12 }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/favorite">Favorite books</NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}