document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    })
  }

  // Refresh AOS on window resize
  window.addEventListener("resize", () => {
    if (typeof AOS !== "undefined") {
      AOS.refresh()
    }
  })
})

// DOM Elements
const darkModeToggle = document.getElementById("dark-mode-toggle")
const body = document.body
const navLinks = document.querySelectorAll("nav a")
const moonIcon = document.querySelector(".fa-moon")

// Check for saved user preference
const darkMode = localStorage.getItem("darkMode")
if (darkMode === "enabled") {
  enableDarkMode()
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    disableDarkMode()
  } else {
    enableDarkMode()
  }
})

function enableDarkMode() {
  body.classList.add("dark-mode")
  moonIcon.classList.remove("fa-moon")
  moonIcon.classList.add("fa-sun")
  localStorage.setItem("darkMode", "enabled")
}

function disableDarkMode() {
  body.classList.remove("dark-mode")
  moonIcon.classList.remove("fa-sun")
  moonIcon.classList.add("fa-moon")
  localStorage.setItem("darkMode", null)
}

function addScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-pop, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.style.visibility = "visible"
        } else {
          entry.target.style.opacity = "0"
          entry.target.style.visibility = "hidden"

          if (entry.target.classList.contains("animate-slide-left")) {
            entry.target.style.transform = "translateX(-100px)"
          } else if (entry.target.classList.contains("animate-slide-right")) {
            entry.target.style.transform = "translateX(100px)"
          } else if (entry.target.classList.contains("animate-slide-up")) {
            entry.target.style.transform = "translateY(100px)"
          } else if (entry.target.classList.contains("animate-pop")) {
            entry.target.style.transform = "scale(0.5)"
          }
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.visibility = "hidden"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease, visibility 0.8s ease"
    observer.observe(element)
  })
}

// Smooth Scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    })
  })
})

// Mobile Navigation Toggle
const createMobileNav = () => {
  const header = document.querySelector("header")
  const nav = document.querySelector("nav")
  const navList = document.querySelector("nav ul")

  const mobileMenuBtn = document.createElement("button")
  mobileMenuBtn.classList.add("mobile-menu-btn")
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
  mobileMenuBtn.setAttribute("aria-label", "Toggle navigation menu")

  mobileMenuBtn.addEventListener("click", () => {
    navList.classList.toggle("active")
    if (navList.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    }
  })

  // Only add the button on mobile view
  if (window.innerWidth <= 768) {
    header.insertBefore(mobileMenuBtn, nav)
  }
}

// Call on load and resize
window.addEventListener("load", createMobileNav)
window.addEventListener("resize", () => {
  const existingBtn = document.querySelector(".mobile-menu-btn")
  if (existingBtn) {
    existingBtn.remove()
  }
  createMobileNav()
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const navList = document.querySelector("nav ul")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

  if (navList.classList.contains("active") && !e.target.closest("nav") && !e.target.closest(".mobile-menu-btn")) {
    navList.classList.remove("active")
    if (mobileMenuBtn) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    }
  }
})

// Add scroll animation for sections
const sections = document.querySelectorAll(".section")
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + window.innerHeight * 0.7

  sections.forEach((section) => {
    if (scrollPos > section.offsetTop) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
})

// Initialize section animations
sections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(20px)"
  section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Initialize first section
sections[0].style.opacity = "1"
sections[0].style.transform = "translateY(0)"

function toggleDarkModeWithAnimation() {
  const darkModeToggle = document.getElementById("dark-mode-toggle")

  darkModeToggle.addEventListener("click", function () {
    this.classList.add("rotate-animation")
    setTimeout(() => {
      this.classList.remove("rotate-animation")
    }, 500)
  })
}

function addTypingAnimation() {
  const homeTitle = document.querySelector("#home h2")
  const text = homeTitle.textContent
  homeTitle.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      homeTitle.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start typing animation after a delay
  setTimeout(typeWriter, 1000)
}

// Call the function after window load
window.addEventListener("load", addScrollAnimations)
window.addEventListener("load", toggleDarkModeWithAnimation)
window.addEventListener("load", addTypingAnimation)

// Add this CSS to the script for the rotate animation
const style = document.createElement("style")
style.textContent = `
  .rotate-animation {
    animation: rotate 0.5s ease;
  }
  
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
document.head.appendChild(style)
