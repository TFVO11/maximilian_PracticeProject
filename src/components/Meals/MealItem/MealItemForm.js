import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault()

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        };

        props.onAddToCart(enteredAmountNumber);
    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref={amountInputRef}
            label="Amount" input={{
            id: 'amount' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
        }}/>
        <button>+ Add</button>
        {!amountIsValid &&  <p>Please enter a valid amount (1-5).</p>}
    </form>
};

export default MealItemForm;


//사용자 정의 컴포는트에서는 Ref가 안먹힌다. 그래서 직접 만들어준 컴포넌트에 가서 React.forwardRef로 감싸주어야한다.
//여기의 경우에는 input이 된다.
//.current는 ref에 저장된 인풋요소를 가리키고 그곳의 value를 보려는 것이기 때문에 .current.value는 따라다닌다.
//변수 앞에 +를 붙히는 이유는 문자열을 숫자로 반환하기 위해서이다.
//trim은 공백을 제거하기 위해 쓴다. 그리고 그것의 길이를 보기 위해 length를 쓴다.