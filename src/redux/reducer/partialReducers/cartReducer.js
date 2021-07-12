import * as actions from "../../actions/types";
import initialState from "../../initialState";

const cartReducer = (state = null, action) => {

    /*  I could barely keep my eyes open, that's how tired I was...
        and yet I solved the problem like a magician, with magic.
        I don't even know how it happened, it just did.
        Like, I just looked at my screen and 5 minutes later I had a
        solution without looking anything up.
        Now I'm making a sleepy pikachu face. Imagine how that looks.
        :>
    */
    const getX = (x, variation) => {

        // TODO: check if variation already exist, and if so don't add product
        // TODO: documentation -> comments... comments everywhere; Refactor, also!
        if(x){
            return [
                ...x["variations"],
                variation
            ]
        }
        else {
            return [
                variation
            ]
        }
    }
    switch (action.type){
        case actions.CART_ADD:

            let variation = {};

            Object.entries(action.payload.attributes).forEach(attribute => {
                variation = {
                    ...variation,
                    [attribute[0]]: attribute[1]
                }
            });

            let x = state[action.payload.productId];

            console.log(state)

            return {
                [action.payload.productId]: {
                    variations: getX(state[action.payload.productId], variation)
                },
            }
        case actions.CART_REMOVE:
            console.log("rem")
            return "pello"
        case actions.CART_INCREMENT:
            console.log("incr")
            return "pello"
        case actions.CART_DECREMENT:
            console.log("decr")
            return "pello"

        default:
            console.log("def")
            return state;
    }
}

export default cartReducer;