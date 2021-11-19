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

let last_known_scroll_position = 0;

// Scroll to anchor ID using scrollTO event
function scrollToSection(evt) {
    if (evt.target.nodeName === 'A') {
        let sectionId = evt.target.getAttribute("data-sectionid");
       
        console.log('A link was clicked with text ' 
            + evt.target.textContent + ' sectionId=' + sectionId);

        let topCoord = window.scrollY + 
            document.querySelector('#' + sectionId).getBoundingClientRect().top;

        window.scrollTo({
            top: topCoord,
            behavior: 'smooth'
          });
    }
}

// Build the nav-bar - Navigation is built dynamically as an unordered list.
for(const section of sectionList){
    let sectionName = section.getAttribute("data-nav");
    let sectionId = section.id;

    console.log(`sectionName.id: ${sectionName}`);
    console.log(`sectionId: ${sectionId}`);

    let newLi = document.createElement("li");
    newLi.setAttribute("class", "menu__link");

    let newNavLink = document.createElement("a");
    newNavLink.setAttribute("data-sectionid", sectionId);
    newNavLink.innerHTML = sectionName;
    newLi.appendChild(newNavLink);
    navbarList.appendChild(newLi);
}

/* Listener to detect scroll movement on page and update highlighted nav-bar and
*  section depending on what section is currently viewable near top of page
*/
window.addEventListener('scroll', function(event) {
    last_known_scroll_position = window.scrollX;

    const sectionList = document.getElementsByTagName("section");
    for(const section of sectionList){  
        //Find section in viewport
        let sectionName = section.getAttribute("data-nav");        
        let sectionTop = section.getBoundingClientRect().top;
    
        if(last_known_scroll_position >= sectionTop - 20 
            && last_known_scroll_position <= sectionTop + 20){
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
            navItem.setAttribute("class", "menu__link highlight");
        } else {
            navItem.setAttribute("class", "menu__link");
        }
    }

    //Sections
    const sectionList = document.getElementsByTagName("section");
    for(const section of sectionList){
        let sectionName = section.getAttribute("data-nav");
        if(sectionName == highlightSectionName){
            section.setAttribute("class", "your-active-class");
        } else {
            section.removeAttribute("class");
        }
    }
}

navbarList.addEventListener('click', scrollToSection);