import "./style.css";
import { NavLink } from "react-router-dom";

const dataItem = [
  {
    name: "Project",
    logo: "",
  },
  {
    name: "Task",
    logo: "",
  },
  {
    name: "Lead",
    logo: "",
  },
  {
    name: "Payments",
    logo: "",
  },
  {
    name: "Monitring",
    logo: "",
  },
  {
    name: "Subscription",
    logo: "",
  },
  {
    name: "Analytics",
    logo: "",
  },
  {
    name: "Books",
    logo: "",
    active: "active",
  },
  {
    name: "Setting ",
    logo: "",
  },
  {
    name: "News Letter",
    logo: "",
  },
];

const Navbar = () => {
  const NavLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "Underline" : "none",
      color: isActive ? "skyblue" : "black",
    };
  };

  return (
    <nav className="navcontainer">
      <section className="upper-nav">
        <NavLink style={NavLinkStyle} to={"/"}>
          <img
            className="logo"
            src="https://www.solarladder.com/logo.png"
            alt="SoladLadder"
          />
        </NavLink>
        <p>Logout</p>
      </section>
      <section className="lower-nav">
        {dataItem.map((item, index) => (
          <div>
            <img src="" alt="" />
            <NavLink
              style={NavLinkStyle}
              to={item.name.toLowerCase()}
              className={item.active && "active"}
            >
              {item.name}
            </NavLink>
          </div>
        ))}
      </section>
    </nav>
  );
};

export default Navbar;
