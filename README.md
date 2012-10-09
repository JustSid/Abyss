Abyss is a [Avgrund](http://lab.hakim.se/avgrund/) inspired modal concept. It uses the same effect as Avgrund to give a sense of depth between the page and a displayed popup, however, unlike Avgrund it also works with sites which have more than a screenful of content and supports resizeable popups. 

It also comes with a handy helper that allows you to display images inside an Abyss, all with automatic resizing and everything.  
You can try it out [here](http://widerwille.com/abyss).

## Usage
To use Abyss you need to include `jQuery` and the `abyss.css` and `abyss.js` files. Additionally, if you want to use Abyss picture helper, you need to include `abyss-picture.js`.

Elements you want to display as popups should get the `abyss-popup` class assigned to which will automatically hide the element and enables the fade-in animation.

If you want to blur the background when an Abyss is displayed, you need to assing the `abyss-content` class to the element that hosts your sites content

### Displaying a HTML element
To display a HTML element as popup you need to create a new `Abyss` instance and pass it the element you want to display:

	var element = document.getElementById('my-element');
	var abyss = new Abyss(element);

	abyss.show();
	
Alternativly you can let the Abyss create a new hosting element by either passing nothing or undefined to the constructor. The created element will be automatically added to the DOM and gets the `abyss-popup` class assigned:

	var abyss = new Abyss();
	var element = abyss.element;
	
	element.innerHTML = '<h1>Hello World</h1>';
	abyss.show();

### Displaying a picture using the picture helper
To display a popup with a picture, you need to create a new `AbyssPicture` instance:

	var picture = new AbyssPicture('http://the.url/to/the/image');
	picture.show();
	
### API
An Abyss instance provides the following methods:

	Abyss.show(); // Displays the Abyss.
	Abyss.close(); // Hides the Abyss.
	Abyss.resize(width, height); // Resizes the Abyss to the given size
	
`show()` and `close()` are also available in the AbyssPicture class, `resize()` however is not.
	
Additionally there are the following callbacks:

	Abyss.onclose; // Invoked when the Abyss closes
	Abyss.onresize; // Invoked when the Abyss gets automatically
	// gets automatically resized.
	// If you implement this, you MUST call resize() with the new size yourself

There are also the following properties available:
	
	Abyss.element; // The element that the Abyss displays
	AbyssPicture.image; // The Image instance that contains the image to display
	AbyssPicture.abyss; // The Abyss instance that is used
	AbyssPicture.isLoaded; // true if the picture is loaded, otherwise false

	
## License
Abyss is licensed under the MIT license, see the `LICENSE` file for more information. The picture helper includes code from [`Spin.js`](http://fgnass.github.com/spin.js/) by Felix Gnass which is also released under the MIT license.

