const courses = [
    {
        id: "CSE 110",
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce the basic concepts of computer programming using Python.",
        technology: ["Python"],
        completed: true
    },
    {
        id: "WDD 130",
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and to build basic websites using HTML and CSS.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        id: "CSE 111",
        title: "Programming with Functions",
        credits: 3,
        certificate: "Web and Computer Programming",
        description: "Students learn how to write functions and build modular programs in Python.",
        technology: ["Python"],
        completed: true
    },
    {
        id: "WDD 131",
        title: "Dynamic Web Fundamentals",
        credits: 3,
        certificate: "Web and Computer Programming",
        description: "Students will learn to create dynamic websites using JavaScript, focusing on DOM manipulation and responsive design.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        id: "WDD 231",
        title: "Web Fronted Development I",
        credits: 3,
        certificate: "Web and Computer Programming",
        description: "Focuses on fronted development using HTML, CSS, and modern JavaScript including APIs, async functions, and dynamic UI elements.",
        technology: ["HTML", "CSS", "JavaScript", "APIs"],
        completed: false
    },
    {
        id: "CSE 210",
        title: "Programming with Classes",
        credits: 3,
        certificate: "Web and Computer Programming",
        description: "This course introduces Object-Oriented Programming (OOP) principles using C# or Python.",
        technology: ["C#", "OOP"],
        completed: true
    }
];

const courseContainer = document.getElementById("course-container");
const totalCreditsDisplay = document.getElementById("total-credits");
const courseDetails = document.getElementById("course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" aria-label"Close modal">❌</button>
        <h2>${course.id}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description || "No description available."}</p>
        <p><strong>Techonlogies</strong>: ${course.technology ? course.technology.join(", ") : "N/A"}</p>
    `;

    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

    courseDetails.addEventListener("click", (event) => {
        const dialogBounds = courseDetails.getBoundingClientRect();
        if (
            event.clientX < dialogBounds.left ||
            event.clientX > dialogBounds.right ||
            event.clientY < dialogBounds.top ||
            event.clientY > dialogBounds.bottom
        ) {
            courseDetails.close();
        }
    });
}

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

        courseCard.style.cursor = "pointer";

        courseCard.addEventListener("click", () => {
            displayCourseDetails(course);
        });
        
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