/* eslint-disable react-refresh/only-export-components */
import P1 from '../assets/python-works/python-1.png';
import P2 from '../assets/python-works/python-2.png';
import P3 from '../assets/python-works/python-3.png';
import P4 from '../assets/python-works/python-4.png';
import P5 from '../assets/python-works/python-5.png';

export const Menu = [
    {
        category: "Prelim",
        projects: [
            {
                id: 1,
                image: P1,
                title: "Activity #1 (Prelim)",
                description: "Simple student introduction using the concept of Object-Oriented Programming in Python.",
                category: "Python",
                techStack: "fa-brands fa-python",
                link: ""
            },
            {
                id: 2,
                image: P2,
                title: "Activity #2 (Prelim)",
                description: "A activity that each students will select a number and will finishing the activity in Python Basics.",
                category: "Python",
                techStack: "fa-brands fa-python",
                link: ""
            },
        ],
    },
    {
        category: "Midterm",
        projects: [
            {
                id: 3,
                image: P3,
                title: "Activity #3 (Midterm)",
                description: "Grade calculator that computes the prelim, midterm and final grades and throws a final overall average and a result if pass or not using error handling with OOP approach.",
                category: "Python",
                techStack: "fa-brands fa-python",
                link: ""
            },
            {
                id: 4,
                image: P4,
                title: "Activity #4 (Midterm)",
                description: "Output calculator that computes the raw quiz, attendance, activity and exam grades first and prompting the maximum / total score of each category. Then, it will compute the student's final grade and will output the result if pass or not using Python Modules and Importing using OOP approach.",
                category: "Python",
                techStack: "fa-brands fa-python",
                link: ""
            },
        ],
    },
    {
        category: "Finals",
        projects: [
            {
                id: 5,
                image: P5,
                title: "Activity #5 (Final)",
                description: "Simple student management tool that organizes and displays a weekly class schedule while also calculating the student's age and providing word count analysis of the output.",
                category: "Python",
                techStack: "fa-brands fa-python",
                link: ""
            },
        ]
    },
];

export default Menu