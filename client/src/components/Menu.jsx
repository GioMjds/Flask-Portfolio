import D1 from "../assets/design-works/design-1.png";
import D3_1 from "../assets/javascript-works/d3-1.png";
import D3_2 from "../assets/javascript-works/d3-2.png";
import D3_3 from "../assets/javascript-works/d3-3.png";
import D3_4 from "../assets/javascript-works/d3-4.png";
import R1 from "../assets/react-works/react-1.png";

const Menu = [
    {
        category: "JavaScript",
        projects: [
            {
                id: 1,
                image: D3_1,
                title: "Bar Graph Sample Illustration",
                description: "A simple bar graph illustration using D3.js and CSS. The challenging part here is to setup the scales and drawing axes for the graph. Also plotting the data points and styling them.",
                category: "JavaScript",
                techStack: "fa-brands fa-js",
                link: "https://github.com/GioMjds/fCC-Data-Visualization-Projects/tree/main/bar-chart"
            },
            {
                id: 2,
                image: D3_2,
                title: "Treemap Diagram Sample Illustration",
                description: "Treemap Diagram that illustrates the hierarchical data using D3.js library. Understanding how treemaps work and how to create them using some of the D3.js functions is very important in displaying the accurate data. Also, styling the treemap using CSS.",
                category: "JavaScript",
                techStack: "fa-brands fa-js",
                link: "https://github.com/GioMjds/fCC-Data-Visualization-Projects/tree/main/treemap-diagram"
            },
            {
                id: 3,
                image: D3_3,
                title: "Scatterplot Graph Sample Illustration",
                description: "A simple scatterplot graph illustration using D3.js and CSS. The challenging part here is to setup the scales and drawing axes for the graph. Also plotting the data points and styling them.",
                category: "JavaScript",
                techStack: "fa-brands fa-js",
                link: "https://github.com/GioMjds/fCC-Data-Visualization-Projects/tree/main/scatterplot-graph"
            },
            {
                id: 4,
                image: D3_4,
                title: "Choropleth Map Sample Illustration",
                description: "Using D3.js to create a simple choropleth map illustration, styled using CSS that contructs a map of the United States with each state colored based on the data. Also using GeoJSON and d assets using D3's data loading functionality.",
                category: "JavaScript",
                techStack: "fa-brands fa-js",
                link: "https://github.com/GioMjds/fCC-Data-Visualization-Projects/tree/main/choropleth-map"
            },
        ],
    },
    {
        category: "React",
        projects: [
            {
                id: 5,
                image: R1,
                title: "Real-Time Chat Application",
                description: "Made using React and Firebase. It has a simple login and registration system and a real-time chat feature.",
                category: "React",
                techStack: "fa-brands fa-react",
                link: "https://github.com/GioMjds/Chatify"
            },
        ],
    },
    {
        category: "Design",
        projects: [
            {
                id: 6,
                image: D1,
                title: "Light Mode Portfolio Design",
                description: "This was made using HTML, CSS and JavaScript. Light mode theme and implements a simple contact form interaction using MySQL to store the visitor credentials and PHP for MySQL connection.",
                category: "Design",
                techStack: "fa-brands fa-php",
                link: "https://github.com/GioMjds/personal-portfolio-using-php"
            }
        ]
    },
];

export default Menu;