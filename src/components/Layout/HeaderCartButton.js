import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);


    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const { items } = cartCtx;
//구조분해할당
    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighLighted(true);

        const timer  = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;

//useState는 애니메이션 클래스가 조건부로 추가될 때 해당 컴포넌트를 재평가하고 다시 렌더링해야하니까 쓴다. 왜냐하면 클래스
//를 삭제하고 나중에 추가되면 다시 재생되게 하기 때문에