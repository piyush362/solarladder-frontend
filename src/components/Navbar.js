import "./style.css";
import { NavLink } from "react-router-dom";

import { VscLayoutPanelRight } from 'react-icons/vsc';
import { GrTask, GrAnalytics } from 'react-icons/gr';
import { BsArrowBarRight, BsCreditCard2Back, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { IoIosGitNetwork, IoMdSettings } from 'react-icons/io';
import { BiNews } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';




const dataItem = [
  {
    name: "Project",
    logo: <VscLayoutPanelRight />,
  },
  {
    name: "Task",
    logo: <GrTask />,
  },
  {
    name: "Lead",
    logo: <BsArrowBarRight />,
  },
  {
    name: "Payments",
    logo: <AiOutlineDollarCircle />,
  },
  {
    name: "Monitring",
    logo: <IoIosGitNetwork />,
  },
  {
    name: "Subscription",
    logo: <BsCreditCard2Back />,
  },
  {
    name: "Analytics",
    logo: <GrAnalytics />,
  },
  {
    name: "Books",
    logo: <BsFillJournalBookmarkFill />,
    active: "active",
  },
  {
    name: "Setting ",
    logo: <IoMdSettings />,
  },
  {
    name: "News Letter",
    logo: <BiNews />,
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
        <div className="logoutBtn">
          <BiLogOut />
          <p>Logout</p>
        </div>
      </section>
      <section className="lower-nav">
        {dataItem.map((item, index) => (
          <div className="navitem" key={index}>
            {/* <img src="" alt="" /> */}
            {item.logo}
            <NavLink
              style={NavLinkStyle}
              to={item.name.toLowerCase() === "books" ? '/' : item.name.toLowerCase()}
              className={item.active ? "active" : ""}
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
