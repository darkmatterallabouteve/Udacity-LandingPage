/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
*/

//Global Variables
const sectionList = document.getElementsByTagName("section");
const navbarList = document.getElementById("navbar__list");

let scroll_position = 0;

// Scroll to anchor ID using scrollTO event
function scrollToSection(evt) {
    if (evt.target.nodeName === 'A') {
        let sectionId = evt.target.getAttribute("data-sectionid");
        let topCoord = window.scrollY + 
            document.querySelector('#' + sectionId).getBoundingClientRect().top;

        // Minus 20 is so it shows Section title 
        //properly on phone screen
        window.scrollTo({
            top: topCoord - 20,
            behavior: 'smooth'
          });
    }
}

/* Build the nav-bar - Navigation is built dynamically as 
*  an unordered list.
*/
for(const section of sectionList){
    let sectionName = section.getAttribute("data-nav");
    let sectionId = section.id;
    let newLi = document.createElement("li");

    newLi.setAttribute("class", "menu__link navhover");

    let newNavLink = document.createElement("a");
    newNavLink.setAttribute("data-sectionid", sectionId);
    newNavLink.innerHTML = sectionName;
    newLi.append(newNavLink);
    navbarList.appendChild(newLi);
}

/* Listener to detect scroll movement on page and update highlighted nav-bar and
*  section depending on what section is currently viewable near top of page
*/
window.addEventListener('scroll', function(event) {
    scroll_position = window.scrollX;

    const sectionList = document.getElementsByTagName("section");
    for(const section of sectionList){  
        //Find section in viewport
        let sectionName = section.getAttribute("data-nav");        
        let sectionTop = section.getBoundingClientRect().top;
    
        if(scroll_position >= sectionTop - 120 
            && scroll_position <= sectionTop + 120){
            highlighterToggle(sectionName);
        }
    }
});

/* Highlight toggle for Nav-Bar and Section class="your-active-class"
*  Nav-Bar - highlights one and removes highlight from others
*  Sections - Adds class="your-active-class" and removes from others
*/
function highlighterToggle(highlightSectionName) {
    //Navbar
    const navItemList = document.getElementsByClassName("menu__link");
    for(const navItem of navItemList){
        if(navItem.textContent == highlightSectionName){
            navItem.classList.add("highlight");
            navItem.classList.remove("navhover");            
        } else {
            navItem.classList.remove("highlight");
            navItem.classList.add("navhover");
        }
    }

    //Sections
    const sectionList = document.getElementsByTagName("section");
    for(const section of sectionList){
        let sectionName = section.getAttribute("data-nav");
        if(sectionName == highlightSectionName){
            section.classList.add("your-active-class");
        } else {
            section.classList.remove("your-active-class");
        }
    }
}

navbarList.addEventListener('click', scrollToSection);