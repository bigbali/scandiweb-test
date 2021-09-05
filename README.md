# Hello
This is a step on the road to getting hired. Yay :)
So, as required, this is pure React and JS, with a bit of TypeScript as sauce (because I had to try TS!).
As you can probably see, this app, if we can call it that, came together in 3 months time.
That is mostly because I had a busy summer, but I also mismanaged my time a bit, so I take responsibility.
I believe I made many mistakes juniors typically make, but at least I got an opportunity to learn something
(and I do intend to learn, very much so!). I'd like to be more than a code printer, which means there's a long way to go.
Truth be told, there is still some stuff to do, but I couldn't really make sense of the design at some places,
so I guess either this gets me an interview or you tell me what I need to work on.

## Down to the technical stuff:

*BUGS AND UNFINISHED STUFF*
- In MinicartItem component, you can select a combination of variation attributes that doesn't exist, so there won't be a quantity indicator
    (because there is no quantity).
- If you navigate to the page of a product that doesn't exist, it will take you to the last item you visited
    (a 404 used to yell at you instead). Not necessarily a bug though. Actually, you can't navigate through products by using URLs at all.

*NOTES*
- I chose to focus on readability instead of performance, and I believe performance might be fairly underwhelming
    (I was able to test the performance, as I had a PC with fairly bad specs, so I could see how well it would perform
    on a weaker machine, but in the meantime I upgraded, so my CPU now just rips through it, and complexity grew as well,
    so now I can't accurately test performance).
- Testing took place using mostly the 'devlog()' and 'console.log()' functions. I didn't Jest.


