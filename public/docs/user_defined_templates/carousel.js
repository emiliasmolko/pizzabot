function MySimpleCarousel(event) {
  this.event = event;
  // Because we render Web Chat to Shadow DOM, we should use `style` tags rather than `link` tags to bring in our CSS.
  this.css =
    '.carousel_container { width: 100px; position: relative; margin: 1em; overflow: hidden; } ' +
    '.carousel_container .carousel_container_content {  min-height: 320px; margin: 0 0 1rem 0;  padding: 0; overflow: hidden; } ' +
    '.carousel_container .carousel_container_content li {  margin: 0;  padding: 0;  width: 100%;  list-style: none; z-index: 2;} ' +
    '.carousel_container.carousel_container_active {  min-height: 320px; } ' +
    '.carousel_container.carousel_container_active li { min-height: 320px; padding: 24px 32px; background: #fff; display:none; } ' +
    '.carousel_container.carousel_container_active li.carousel_container_current { position: absolute; top:0; left:0; z-index: 3; display:block; } ' +
    '.carousel_container .carousel_container_buttons { display: none;} ' +
    '.carousel_container.carousel_container_active .carousel_container_buttons { display: block; } ' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next { position: absolute; right: -1rem; top: 40%; z-index: 10; display: none; } ' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev { position: absolute; left: -1rem; top: 40%; z-index: 10; display: none; } ' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next.carousel_container_visible, .carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev.carousel_container_visible { display: block; border-radius: 0; background: #0f62fe; color: #fff; border: none; margin: 0; padding: 0; width: auto; overflow: visible; font: inherit; line-height: normal; -webkit-font-smoothing: inherit; -moz-osx-font-smoothing: inherit; -webkit-appearance: none; }' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next.carousel_container_visible .carousel_container_icon, .carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev.carousel_container_visible .carousel_container_icon { cursor: pointer; padding: 8px 0px; }' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next.carousel_container_visible:hover, .carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev.carousel_container_visible:hover { background: #0353e9; }' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next.carousel_container_visible:focus, .carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev.carousel_container_visible:focus { outline: 1px solid #0f62fe; outline-offset: 2px; }' +
    '.carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_next.carousel_container_visible .carousel_container_label, .carousel_container.carousel_container_active .carousel_container_buttons .carousel_container_prev.carousel_container_visible .carousel_container_label { background: #000; cursor: pointer; padding: 4px 8px; font-size: 0.6rem; font-weight: bold; text-transform: uppercase;}' +
    '.carousel_container.carousel_container_active li img.carousel_slide_image { display: block; height: 160px; width: 100%; margin-bottom: 8px; } ' +
    '.carousel_container.carousel_container_active li .carousel_slide_title { font-weight: bold; margin-bottom:4px; }';
}

/**
 * Moves the pointer for which is the current active slide.
 *
 * @param direction A number of slides to move pointer from. Usually 1 or -1.
 */
MySimpleCarousel.prototype.navigate = function(direction) {
  // Hide the old current list item
  this.current.classList.remove('carousel_container_current');

  // Calculate th new position
  this.counter = this.counter + direction;

  // If the previous one was chosen and the counter is less than 0 make the counter the last element, thus looping the carousel
  if (direction === -1 && this.counter < 0) {
    this.counter = this.amount - 1;
  }
  // If the next button was clicked and there is no items element, set the counter to 0
  if (direction === 1 && !this.items[this.counter]) {
    this.counter = 0;
  }
  // set new current element and add CSS class
  this.current = this.items[this.counter];
  this.current.classList.add('carousel_container_current');
  if (this.counter === 0) {
    // First slide. Remove "Back".
    this.prev.classList.remove('carousel_container_visible');
    this.next.classList.add('carousel_container_visible');
  } else if (this.counter === this.amount - 1) {
    // Last slide. Remove "Next".
    this.prev.classList.add('carousel_container_visible');
    this.next.classList.remove('carousel_container_visible');
  } else {
    // Show both buttons for all other slides.
    this.prev.classList.add('carousel_container_visible');
    this.next.classList.add('carousel_container_visible');
  }
};

/**
 * Adds HTML and CSS and starts the class.
 */
MySimpleCarousel.prototype.start = function() {
  const self = this;

  // Scaffold.
  this.writeCSS();
  this.writeHTML();

  // Read necessary elements from the DOM once
  this.box = this.event.data.element.querySelector('.carousel_container');
  this.next = this.box.querySelector('.carousel_container_next');
  this.prev = this.box.querySelector('.carousel_container_prev');

  // Define the global counter, the items and the current item.
  this.counter = 0;
  this.items = this.box.querySelectorAll('.carousel_container_content li');
  this.amount = this.items.length;
  this.current = this.items[0];

  // Mark the carousel as started.
  this.box.classList.add('carousel_container_active');

  // Add event handlers to buttons
  this.next.addEventListener('click', function(ev) {
    self.navigate(1);
  });
  this.prev.addEventListener('click', function(ev) {
    self.navigate(-1);
  });

  // Show the first element (when direction is 0 counter doesn't change)
  this.navigate(0);
};

/**
 * Adds CSS.
 */
MySimpleCarousel.prototype.writeCSS = function() {
  const element = document.createElement('style');
  element.setAttribute('type', 'text/css');
  element.innerHTML = this.css;
  this.event.data.element.appendChild(element);
}

/**
 * Adds HTML scaffolding.
 */
MySimpleCarousel.prototype.writeHTML = function() {
  const element = document.createElement('div');
  element.classList.add('carousel_container');
  element.innerHTML =
    '<div class="carousel_container_buttons"><button class="carousel_container_prev"><div class="carousel_container_icon">◀</div><div class="carousel_container_label">Back</div></button><button class="carousel_container_next"><div class="carousel_container_icon">▶</div><div class="carousel_container_label">Next</div></button></div><ol class="carousel_container_content"></ol>';
  const content = element.querySelector('.carousel_container_content');
  const message = this.event.data.message;
  message.user_defined.slides.forEach(function(slide) {
    content.innerHTML +=
      '<li><img class="carousel_slide_image" src="' +
      slide.image +
      '"/><div class="carousel_slide_title">' +
      slide.title +
      '</div><div class="carousel_slide_description">' +
      slide.description +
      '</div></li>';
  });
  this.event.data.element.appendChild(element);
};

/**
 * Handler for the Carousel template.
 *
 * @param event The event passed from Watson Assistant.
 * @param event.type The type of event, in this case "customResponse".
 * @param event.data.message The original message.
 * @param event.data.element An HTML element that is rendered in Web Chat for you to manipulate. If you have set
 * user_defined.silent to true, no HTML element will be created.
 */
function handleCarouselTemplate(event) {
  const carousel = new MySimpleCarousel(event);
  carousel.start();
}
