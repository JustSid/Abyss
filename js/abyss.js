(function($) {

	$.fn.bbApplyTransform = function(transform) {

		return this.each(function() {

			var $this = $(this);
			$this.css( { '-webkit-transform': transform } );
			$this.css( { '-moz-transform': transform } );
			$this.css( { '-ms-transform': transform } );
			$this.css( { '-o-transform': transform } );
			$this.css( { 'transform': transform } );
		});

	};

})(jQuery);


var Abyss = (function() {

	var resizeTimer;
	var cover = null;
	var currentAbyss = null;

	function abyss(element)
	{
		var isOpen = false;
		var isClosing = false;
		var closeTimer;

		var self = this;

		this.onresize = undefined;
		this.onclose = undefined;

		if(typeof element === 'undefined' || element === null)
		{
			element = document.createElement('aside');
			element.className = 'abyss-popup';

			document.body.appendChild(element);
		}
		
		var $element = $(element);
		var $window = $(window);

		var borderWidth = 130;
		var borderHeight = 130;

		this.element = element;
		this.resize = function(width, height)
		{
			if(typeof width === 'undefined')
				width = $element.width();

			if(typeof height === 'undefined')
				height = $element.height();

			if(isOpen)
			{
				var scrollTop  = $window.scrollTop();
				var scrollLeft = $window.scrollLeft();

				var windowWidth  = $window.width();
				var windowHeight = $window.height();
				
				var broderOffsetWidth  = borderWidth / 2;
				var borderOffsetHeight = borderHeight / 2;

				$element.css({ 'top': (scrollTop + (windowHeight / 2)) + 'px', 'left': (scrollLeft + (windowWidth / 2)) + 'px' });
				$element.css({ 'margin-left': -((width + broderOffsetWidth) / 2) + 'px', 'margin-top': -((height + borderOffsetHeight) / 2) + 'px' });

				$element.width(width);
				$element.height(height);
			}
			else
			{
				if(isClosing)
				{
					window.setTimeout(function() {
						$element.width(width);
						$element.height(height);
					}, 350);
				}
				else
				{
					$element.width(width);
					$element.height(height);
				}
			}
		}

		this.close = function(immediately)
		{
			if(isOpen)
			{
				$element.removeClass('abyss-active');
				$element.removeClass('abyss-popup-visible');

				$(cover).removeClass('abyss-cover-active');
				$(document.documentElement).removeClass('abyss-active');

				$(document.body).bbApplyTransform('');
				$element.bbApplyTransform('');

				isClosing  = true;
				currentAbyss = null;

				if(typeof immediately !== 'undefined' && immediately === true)
				{
					$(document.documentElement).removeClass('abyss-ready');
					isOpen    = false;
					isClosing = false;
				}
				else
				{
					closeTimer = window.setTimeout(function() {
						$(document.documentElement).removeClass('abyss-ready');
						isOpen    = false;
						isClosing = false;
					}, 350);
				}

				if(typeof self.onclose !== 'undefined')
					self.onclose(self);
			}
		}

		this.show = function()
		{
			if(currentAbyss != null)
				currentAbyss.close(true);

			if(!isOpen || isClosing == true)
			{
				window.clearTimeout(closeTimer);

				currentAbyss = self;
				isOpen     = true;

				var width  = $element.width();
				var height = $element.height();

				self.resize(width, height);

				var scaleX = ($(document.body).width() - borderWidth) / $(document.body).width();
				var scaleY = ($(document.body).height() - borderHeight) / $(document.body).height();

				window.setTimeout(function() {

					$element.addClass('abyss-active');
					$(cover).addClass('abyss-cover-active');

					$element.bbApplyTransform('scale(' + (2.0 - scaleX) + ', ' + (2.0 - scaleY) + ')');

					$(document.documentElement).addClass('abyss-ready');
					$(document.documentElement).addClass('abyss-active');

					window.setTimeout(function() {
						$(document.body).bbApplyTransform('scale(' + scaleX + ', ' + scaleY + ')');
						$element.addClass('abyss-popup-visible');
					}, 0);
				}, 0);
			}
		}
	}




	function scheduleResize() 
	{
		window.clearTimeout(resizeTimer);

		if(currentAbyss !== null)
		{
			resizeTimer = window.setTimeout(function() {
				if(typeof currentAbyss.onresize !== 'undefined')
				{
					currentAbyss.onresize(currentAbyss);
					return;
				}

				var width  = $(currentAbyss.element).width();
				var height = $(currentAbyss.element).height();

				currentAbyss.resize(width, height);
			}, 150);
		}
	}

	$(document).ready(function() {
		cover = document.createElement('div');
		cover.className = 'abyss-cover';

		document.body.appendChild(cover);

		$(cover).click(function(e) {

			if(currentAbyss !== null)
				currentAbyss.close();
		});

		$(document).keyup(function(e) {

			if(e.keyCode === 27 && currentAbyss !== null)
				currentAbyss.close();
		});

		$(window).resize(scheduleResize);
		$(window).scroll(scheduleResize);
	});

	return abyss;
})();
