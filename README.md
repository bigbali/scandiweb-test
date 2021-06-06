##Why .jsx:
	- .jsx looks cooler than .js
	- .jsx sounds cooler than .js
	- .jsx implies module is a React component
	
	
##Why I made the category selector dynamic:
	I prefer dynamic rather than hard coded. Say, someone were to create a new category, what would happen?
	(said category would prove inaccessible by way of simple UI navigation, unless someone took the effort to add it)
	This proved to be a challenge at first, as I had only faint ideas how to accomplish such, 
	but I found the solution was rather simple in the end
	(doesn't mean it was simple figuring it out).
	
##Why I believe this API schema is poorly designed:
	- result.data.category.products, just to get to actual useful data
	- needs processing on front end, should return data already made usable
		(or at least, that is how I would do it)
	- could be:
		- query all categories (which returns just metadata)
		- query a specific category, which returns all related to it (name of it, related products...)
		- query a specific product with all its glorious details
		
# CATEGORY PAGE: select all items by category
	- could be simply products page...
	
## You know how we juniors are... we don't know what we are doing, so we just hack things together till we have something working...
## This font is fuckin' great!