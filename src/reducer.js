// This file basically deals with the cart basket
export const initialState = {
    basket: [],
    user: null
};

export const getBasketTotal = (basket) => 
    basket.reduce((amount,item) => item.price + amount , 0); // Basically we are adding each items price to amount, whose value initially is zero 

const reducer = (state, action) => {
    switch (action.type){
        case "ADD_TO_BASKET":
            return { // returns initial state of basket and the newly added item
                ...state, //"..." is JavaScript ES6 Spread operator
                basket : [...state.basket, action.item]
            };
        
        case "EMPTY_BASKET":
            return{
                ...state,
                basket: []
            }
        
        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex( // we get the state, we get the basket and then we use the findIndex function. findIndex() goes throgh all of the basket items and sees if does any of the basket items match the action.id
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket]

            if(index >= 0)
            {
                newBasket.splice(index,1); // we basically cut out the element from the newBasket that we want to remove from the cart
            }
            else
            {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                    )
            }

            return {
                ...state,
                basket: newBasket
            }
        case "SET_USER":
            return{
                ...state,
                user:action.user
            }

    default:
        return state;
    }
}

export default reducer;