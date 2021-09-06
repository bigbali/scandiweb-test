# Hello
This is a step on the road to getting hired. Yay :)
So, as required, this is pure React and JS, with a bit of TypeScript as sauce (because I had to try TS!).
As you can probably see, this app, if we can call it that, came together in 3 months time.
That is mostly because I had a busy summer, but I also mismanaged my time a bit, so I take responsibility.
I believe I made many mistakes rookies typically make, but at least I got an opportunity to learn something
(and I do intend to learn, very much so!). I'd like to be more than a code printer, which means there's a long way to go.
Truth be told, there is still some stuff to do, but I couldn't really make sense of the design at some places,
so I guess either this gets me an interview, you tell me what I need to work on, or you tell me to bugger off. ٩(^‿^)۶

## BUGS AND UNFINISHED STUFF
- In MinicartItem component, you can select a combination of variation attributes that doesn't exist, so there won't be a quantity indicator
    (because there is no quantity).
- If you navigate to the page of a product that doesn't exist, it will take you to the last item you visited
    (a 404 used to yell at you instead, but I implemented a feature that changed it, for whatever reason, without thinking about
    this specific scenario). Not necessarily a bug though. Actually, you can't navigate through products by using URLs at all.
- Jacket has attributes of shoe? Even though when testing with GraphQL playground thingy, data is fine, but raw data is different when I 
    send the fetch request from here. Is it my imagination? I think I'm confused.
- There's a horizontal overflow I can't explain. The horizontal scrollbar appears, I open the dev tools, and it's gone and isn't coming back.
    Maybe it's specific to my environment. It's related to the flexbox that holds the product cards, I believe. Maybe you'll know better.


## NOTES
- I chose to focus on readability instead of performance, and I believe performance might be fairly underwhelming
    (I don't know how to test performance for lower end hardware anymore, because a CPU upgrade slipped in meanwhile).
- I do actually prefer simpler solutions, even though at some places my code doesn't represent that.
- Testing took place using mostly the 'devlog()' and 'console.log()' functions. I didn't Jest.

### HOW TO RUN
- Just in case you need it, I tested how you'd run the project:
    1. Open a console window to the project folder, then 'yarn install', or whatever you do to install dependencies
    2. 'yarn start', if you wanna see the 'devlog' thingies, else just compile the project then run it


