import { AiOutlineGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { ImFire } from "react-icons/im";

const footerLinks = [
  {
    logo: <AiFillInstagram size={40} color="#f8f9fa" />,
    href: "https://www.instagram.com/dev_forge_hub",
  },
  {
    logo: <AiOutlineGithub size={40} color="#f8f9fa" />,
    href: "https://github.com/Dreyrk",
  },
  {
    logo: <AiFillLinkedin size={40} color="#f8f9fa" />,
    href: "https://www.linkedin.com/in/lucas-rondepierre-b9b215237/",
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col">
        <div className="flex justify-around py-6">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank">
              {link.logo}
            </a>
          ))}
        </div>
        <h3 className="flex font-semibold text-xs justify-center items-center gap-4 text-slate-200">
          <ImFire size={15} color="#ffc100" />
          Made by a Yu-Gi-Oh player for Yu-Gi-Oh players
          <ImFire size={15} color="#ffc100" />
        </h3>
      </div>
    </footer>
  );
}
