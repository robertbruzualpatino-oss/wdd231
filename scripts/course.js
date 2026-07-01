const courses = [
    {
        id: "CSE 110",
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true
    },
    {
        id: "WDD 130",
        title: "Wen Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        completed: true
    },
    {
        id: "CSE 111",
        title: "Programming with Functions",
        credits: 3,
        certificate: "Web and Computer Proggraming",
        completed: true
    },
    {
        id: "WDD 131",
        title: "Dynamic Web Fundamentals",
        credits: 3,
        certificate: "Web and Computer Programming",
        completed: true
    },
    {
        id: "WDD 231",
        title: "Web Fronted Development I",
        credits: 3,
        certificate: "Web and Computer Programming",
        completed: false
    },
    {
        id: "CSE 210",
        title: "Programming with Classes",
        credits: 3,
        certificate: "Web and Computer Programming",
        completed: true
    }
];

const courseContainer = document.getElementById("course-container");
const totalCreditsDisplay = document.getElementById("total-credits");

function displayCourses(filteredList) {
    courseContainer.innerHTML = "";

    filteredList.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-badge");

        if (course.completed) {
            courseCard.classList.add("course-completed");
        } else {
            courseCard.classList.add("course-incomplete");
        }

        courseCard.innerHTML = `<strong>${course.id}</strong>`;
        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredList.reduce((accumulator, currentCourse) => {
        return accumulator + currentCourse.credits;
    }, 0);

    totalCreditsDisplay.textContent = `Total Credits Required: ${totalCredits}`;
}

document.getElementById("btn-all").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("btn-cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.id.includes("CSE"));
    displayCourses(cseCourses);
});

document.getElementById("btn-wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.id.includes("WDD"));
    displayCourses(wddCourses);
});

displayCourses(courses);