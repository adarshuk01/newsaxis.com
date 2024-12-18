// newsData.js

// Function to generate a random number within a specified range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate a random image URL
const getRandomImageUrl = () => `https://picsum.photos/seed/${getRandomNumber(1, 1000)}/200/300`;

export const newsData = [
  {
    id: 1,
    title: "'He deserves a lot more' Verstappen backs Alonso",
    description: "Max Verstappen believes his fellow two-time world champion Fernando Alonso 'deserves a lot more' victories in Formula 1 and has backed the Spaniard...",
    imageUrl: getRandomImageUrl(),
    category: "Sport",
    timeAgo: "3 hours ago",
    source: "Formula 1",
    articleLink: "#",
  },
  {
    id: 2,
    title: "Liverpool hammer Leeds for first win in five games",
    description: "Mohamed Salah and Diogo Jota both scored twice as Liverpool claimed a first league win in five games by inflicting a second successive home hammering...",
    imageUrl: getRandomImageUrl(),
    category: "Sport",
    timeAgo: "12 hours ago",
    source: "BBC",
    articleLink: "#",
  },
  {
    id: 3,
    title: "Papua: At least one killed in hunt for kidnapped NZ pilot...",
    description: "At least one Indonesian soldier has been killed in a rebel attack while searching for a kidnapped New Zealand pilot in the Papua region...",
    imageUrl: getRandomImageUrl(),
    category: "Crime",
    timeAgo: "April 17, 2023",
    source: "IDN Times",
    articleLink: "#",
  },
  {
    id: 4,
    title: "Jeremy Bowen: Israel's unclear road ahead",
    description: "Tensions between Israel and the Palestinians are on the rise once more, with hopes of peace and a two-state solution as far away as ever...",
    imageUrl: getRandomImageUrl(),
    category: "Middle East",
    timeAgo: "April 15, 2023",
    source: "BBC",
    articleLink: "#",
  },
];



