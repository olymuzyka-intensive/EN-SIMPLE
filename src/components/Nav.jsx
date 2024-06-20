import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="nav">
            <ul>
                <li><Link to="/"><img src="src/components/img/home.png" width="50px"/></Link></li>
                <li><Link to="/other"><img src="src/components/img/next.png" width="50px"/></Link></li>
            </ul>
        </nav>
    )
}

export default Nav