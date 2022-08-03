import { useReducer } from 'react';
 
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,

};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existinCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existinCartItem) {
            const updatedItem = {
                ...existingCartItemIndex,
                amount: existingCartItemIndex.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };


    };
    
    if (action.type === 'REMOVE' ) {
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems
        
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
    }

    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', item: item});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler 
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;

//useReducer 함수의 첫번째 요소는 state 이는 리쥬서에서 관리되는 state의 스냅샷을 반환
//useReducer 함수의 두번째 요소는 action 이는 우리가  코드로 나중에 전달할 것
//provider안의 useReducer 객체의 state의 스냅샷, 두번째는 함수로써 리듀서에 액션을 전달 할 수 있다.
//concat() 메소드는 배열에 새로운 항목을 추가해준다. 이는 메모리에서 이전 배열을 편집하는 대신 완전히 새로운 배열을 준다.
//인간 >> 코드 >> 인간으로 상호작용해서 데이터가 이동한다고 보면 전체적으로 코드 내에서 데이터의 이동을 생각하기가 쉽다.

//수량 추가하는 부분에서 if문 안에 updatedItems = [state.item]에 관해서 물어보기