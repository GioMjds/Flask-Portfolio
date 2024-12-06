/* eslint-disable react/jsx-key */
import { FaFreeCodeCamp, FaMicrosoft, FaHtml5, FaCss3, FaBootstrap, FaSass } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoJquery, BiLogoReact, BiLogoRedux } from "react-icons/bi";
import { SiD3Dotjs, SiCsharp } from "react-icons/si";
import { VscJson } from "react-icons/vsc";

import C1 from '../assets/certifications/cert-1.png';
import C2 from '../assets/certifications/cert-2.png';
import C3 from '../assets/certifications/cert-3.png';
import C4 from '../assets/certifications/cert-4.png';
import C5 from '../assets/certifications/cert-5.png';
import C6 from '../assets/certifications/cert-6.png';

export const Certs = [
    { 
        title: "Responsive Web Design",
        icon: <FaFreeCodeCamp />,
        issuer: "freeCodeCamp",
        skills: [ <FaHtml5 />, <FaCss3 /> ],
        image: C1,
        link: "https://www.freecodecamp.org/certification/GioMjds/responsive-web-design" 
    },
    { 
        title: "JavaScript Algorthms and Data Structures",
        icon: <FaFreeCodeCamp />,
        issuer: "freeCodeCamp",
        skills: [ <IoLogoJavascript /> ],
        image: C2,
        link: "https://www.freecodecamp.org/certification/GioMjds/javascript-algorithms-and-data-structures-v8"
    },
    { 
        title: "Front End Development Libraries",
        icon: <FaFreeCodeCamp />,
        issuer: "freeCodeCamp",
        skills: [ <FaBootstrap />, <BiLogoJquery />, <FaSass />, <BiLogoReact />, <BiLogoRedux /> ],
        image: C3,
        link: "https://www.freecodecamp.org/certification/GioMjds/front-end-development-libraries"
    },
    { 
        title: "Data Visualization",
        icon: <FaFreeCodeCamp />,
        issuer: "freeCodeCamp",
        skills: [ <SiD3Dotjs />, <VscJson /> ],
        image: C4,
        link: "https://www.freecodecamp.org/certification/GioMjds/data-visualization"
    },
    { 
        title: "Foundational C# with Microsoft",
        icon: <FaMicrosoft />,
        issuer: "Microsoft",
        skills: [ <SiCsharp /> ],
        image: C5,
        link: "https://www.freecodecamp.org/certification/GioMjds/foundational-c-sharp-with-microsoft"
    },
    { 
        title: "Meta Front End Developer",
        icon: <FaMeta />,
        issuer: "Meta",
        skills: [ <IoLogoJavascript />, <FaHtml5 />, <FaCss3 />, <FaBootstrap />, <BiLogoReact /> ],
        image: C6,
        link: "https://coursera.org/share/b0069cb6b80bdd9906e1887ddae708df"
    },
];

export default Certs;