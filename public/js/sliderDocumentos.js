/*SLIDER CONFIGURATION*/
const slides = [
	{
		url:
			"/img/documentos1.JPG",
		heading: "Tu Espacio, Tu Comodidad",
		tagline: "Aquí, cada momento cuenta, tu bienestar es nuestra prioridad."
	},
	{
		url:
			"/img/documentos2.jpg",
		heading: "Cuidando lo Nuestro",
		tagline: "Promoviendo la convivencia y el respeto en cada rincón."
	},
	{
		url:
			"/img/documentos3.JPG",
		heading: "Conéctate con la Naturaleza",
		tagline:
			"Explora y disfruta de lo que nos rodea."
	}
];

const options = {
    font_shadow: "1px 1px 5px black",
	tagline_font: "Raleway",
	heading_color: "#f9a310",
	tagline_color: "#fff",
	arrow_color: "#f9a310",
	dot_color: "black",
	hover_color: "#f9a310",
	active_color: "#f9a310",
	filters: "brightness(50%)",
	heading_size: "3rem",
	tagline_size: "1.5rem"
};
/*SLIDER LOGIC*/
let activeSlide;
const carousel = document.getElementById("slide-container");
let currScript = document.currentScript;

window.onload = () => {
	renderSlides();
	activeSlide = 0;
	updateActiveLink();
	document.getElementById("prevSlide").addEventListener("click", prevSlide);
	document.getElementById("nextSlide").addEventListener("click", nextSlide);

	let autoplaySlider = setInterval(nextSlide, 4000);
	document.getElementById("prevSlide").addEventListener("click", () => {
		clearInterval(autoplaySlider);
	});

	document.getElementById("nextSlide").addEventListener("click", () => {
		clearInterval(autoplaySlider);
		autoplaySlider = setInterval(nextSlide, 4000);
	});
};

function createSlide(item, index) {
	const newSlide = document.createElement("div");
	newSlide.className = "slide";
	newSlide.id = "slide" + parseInt(index); /*Critical: Modify with caution*/
	let image = document.createElement("img");
	image.src = item.url;
	image.alt = "carousel slide " + index + " about " + item.tagline;
	newSlide.appendChild(image);
	let slideText = document.createElement("div");
	slideText.className = "slideText";
	let heading = document.createElement("h3");
	heading.className = "slideHeading";
	heading.innerText = item.heading;
	slideText.appendChild(heading);
	let tagline = document.createElement("p");
	tagline.className = "slideTagline";
	tagline.innerText = item.tagline;
	slideText.appendChild(tagline);
	newSlide.appendChild(slideText);
	return newSlide;
}

function createSlideLink(index) {
	const newLink = document.createElement("a");
	newLink.id = "slideBtn" + parseInt(index); /*Critical: Modify with Caution*/
	let listItem = document.createElement("li");
	listItem.className = "slideBtn";
	newLink.appendChild(listItem);
	newLink.addEventListener("click", async function (event) {
		event.preventDefault();
		const nextSlide = document.getElementById("slide" + index);
		carousel.scroll({
			top: nextSlide.offsetTop,
			left: nextSlide.offsetLeft,
			behavior: "smooth"
		});
		if (event.target.id !== "slideBtn" + activeSlide) {
			await getActiveSlide();
		}
	});
	return newLink;
}

function createStyles() {
	const styles = document.createElement("style");
	styles.id = "styleOptions";
	styles.innerHTML = `
	.slide img {
		filter: ${options.filters};
	}
	.slideHeading {
		font-size: ${options.heading_size};
		color: ${options.heading_color};
        text-shadow: ${options.font_shadow};
	}
	.slideTagline {
		font-size: ${options.tagline_size};
		color: ${options.tagline_color};
        text-shadow: ${options.font_shadow};
	}
	.slideNav svg {
		fill: ${options.arrow_color};
	}
	.slideBtn {
		background-color: ${options.dot_color};
	}
	.pagination a.active > li.slideBtn {
		background-color: ${options.active_color};
	}
	.pagination a:hover > li.slideBtn {
		background-color: ${options.hover_color};
	}
	.prev-slide:hover svg,
	.next-slide:hover svg {
		fill: ${options.hover_color};
	}
	`;
	carousel.appendChild(styles);
}

async function renderSlides() {
	const container = document.querySelector("#slide-container");
	container.innerHTML = "";
	const pagination = document.querySelector("#pagination");
	pagination.innerHTML = "";
	slides.map((item, index) => {
		let slide = createSlide(item, index);
		container.appendChild(slide);
		let link = createSlideLink(index);
		pagination.appendChild(link);
	});
	createStyles();
	getActiveSlide();
}

function getActiveSlide() {
	const allSlides = document.querySelectorAll(".slide");

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0.5) {
					activeSlide = parseInt(entry.target.id.substr(5));
					updateActiveLink();
				}
			});
		},
		{
			root: document.querySelector("#slide-container"),
			rootMargin: "0px",
			threshold: 1.0
		}
	);

	allSlides.forEach((slide) => {
		observer.observe(slide);
	});
}

async function updateActiveLink() {
	let btns = document.querySelectorAll("a[id^='slideBtn']");
	btns.forEach((btn) => {
		btn.classList.toggle("active", "slideBtn" + activeSlide === btn.id);
	});
}

async function prevSlide(evt) {
	evt.preventDefault();
	await getActiveSlide();

	let incomingSlideBtn;
	if (activeSlide > 0) {
		incomingSlideBtn = "slideBtn" + (activeSlide - 1);
	} else {
		incomingSlideBtn = "slideBtn" + (slides.length - 1);
	}

	await document.getElementById(incomingSlideBtn).click();
}

async function nextSlide(evt) {
	evt?.preventDefault();
	await getActiveSlide();

	let incomingSlideBtn;
	if (activeSlide < slides.length - 1) {
		incomingSlideBtn = "slideBtn" + (activeSlide + 1);
	} else {
		incomingSlideBtn = "slideBtn0";
	}

	await document.getElementById(incomingSlideBtn).click();
}
/*END OF SLIDER*/

/*CUSTOMIZING OPTIONS: Add Slides, Delete Slides and Settings
  SPACING/SIZING OPTIONS NOT INCLUDED: You may edit Margins/Padding/Line-Height/Letter-Spacing/Font-Size in the CSS rulesets
  Maybe fork it and add spacing/sizing options?*/
const addSlide = (evt) => {
	evt.preventDefault();
	evt.stopPropagation();
	const newSlide = {
		url: document.querySelector("input[name='url']").value,
		heading: document.querySelector("input[name='heading']").value,
		tagline: document.querySelector("input[name='tagline']").value
	};
	if (!newSlide.url) {
		alert("Ërror: Provide a link for an image");
		return null;
	}
	if (
		slides.some(
			(slide) =>
				slide.heading === newSlide.heading &&
				slide.tagline === newSlide.tagline &&
				slide.url === newSlide.url
		)
	) {
		alert("Error: This exact slide already exists");
		return null;
	}
	slides.push(newSlide);
	renderSlides();
};

const delSlide = (evt) => {
	evt.preventDefault();
	evt.stopPropagation();
	let slideIndex = document
		.querySelector("input[name='slideToDelete']")
		.value.split(",")
		.filter((x) => x !== "")
		.map((x) => {
			let y = parseInt(x.trim());
			if (!isNaN(y)) return y;
		});
	if (!slideIndex?.length) {
		alert("Ërror: Provide at least 1 slide number to delete");
		return null;
	}
	const slidesToDel = [];
	slideIndex.map((ordinalNumber) => {
		let index = ordinalNumber - 1;
		if (slides[index]) {
			slidesToDel.push(slides[index]);
		} else {
			alert("Error: Slide " + ordinalNumber + " does not exist");
			return null;
		}
	});
	slidesToDel.map((forTrash) => {
		let delIndex = slides.indexOf(forTrash);
		if (delIndex !== -1) {
			slides.splice(delIndex, 1);
		}
	});
	renderSlides();
};

const setOptions = (evt) => {
	evt.preventDefault();
	evt.stopPropagation();
	[...evt.target.elements].forEach((optionField) => {
		if (optionField.value) {
			options[optionField.name] = optionField.value;
			if (["heading_font", "tagline_font"].includes(optionField.name)) {
				alert("Remember to add imports to the html/css for fonts");
			}
		}
	});
	renderSlides();
};

function copyToClipboard(event) {
	const output = document.querySelector("textarea[name='codebox']");
	output.select();
	output.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(output.value);
	event.target.innerText = "Copied To Clipboard!";
	event.target.style.backgroundColor = "#00a34c";
	setTimeout(() => {
		event.target.innerText = "Copy To Clipboard";
		event.target.style.backgroundColor = "#627231";
	}, 600);
}

function copyObjects() {
	document.querySelector(
		"#codebox"
	).innerText = `const slides = ${JSON.stringify(slides)} \n\n
  const options = ${JSON.stringify(options)}`;
	document.querySelector(".overlay").style.display = "block";
}

function copyHTML() {
	carousel.removeChild(carousel.querySelector("#styleOptions"));
	let markup = document.querySelector(".slider").innerHTML;
	document.querySelector(
		"#codebox"
	).innerText = `<div class="slider">\n${markup}\n</div>`;
	document.querySelector(".overlay").style.display = "block";
}

function copyCSS() {
	let finalCss = "";
	const stylesheets = document.querySelectorAll("style");
	[...stylesheets].map((sheet) => {
		if (sheet.innerHTML.includes("/* START OF SLIDER STYLES */")) {
			finalCss += sheet.innerHTML.split("/* END OF SLIDER STYLES */")[0];
		} else {
			finalCss += sheet.innerHTML;
		}
	});
	document.querySelector("#codebox").innerText = finalCss;
	document.querySelector(".overlay").style.display = "block";
}

async function copyJS() {
	let finalJS = "";
	document.querySelector(".overlay").style.display = "block";
	document.querySelector("#codebox").innerText = "Loading...";
	await fetch(currScript.src)
		.then(function (response) {
			if (!response.ok) {
				throw new Error(`Failed to get script contents: ${response.status}`);
			}
			return response.text();
		})
		.then(function (response) {
			finalJS = response;
			finalJS = finalJS.split("/*SLIDER LOGIC*/")[1];
			finalJS = finalJS.split("/*END OF SLIDER*/")[0];
			finalJS = `
	const slides = ${JSON.stringify(slides)} \n\n 
	const options = ${JSON.stringify(options)} \n\n\n
	${finalJS}`;
			document.querySelector("#codebox").innerText = finalJS;
		}).catch((e) => {
		alert("Can't get the contents of the script. Please, try re-running with the run command/button");
	});
}

document.getElementById("slidecreator").addEventListener("submit", addSlide);
document.getElementById("slidedeleter").addEventListener("submit", delSlide);
document.getElementById("settings").addEventListener("submit", setOptions);
