import React, { useState } from 'react';

const Form = () => {

    const [formState, setFormState] = useState({
        name: '',
        size: '',
        toppings: '',
        specials: ''    
    })

    const [buttonDisbled, SetButtonDisabled] = useState(true)

    return (
        <form>
            <div>
                <label htmlFor='name'>
                    Name
                    <input type='text' name='name' value={formState.name}/>
                </label>
            </div>
            <br/>            
            <div>
                <label htmlFor='sizes'>
                    Sizes
                    <select name='sizes' value={formState.sizes}>
                        <option>--Choose a Pizza Size--</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </label>    
            </div>
            <br/>            
            <div>
                <label htmlFor='toppings'>
                    Toppings: 
                    <input type='checkbox' name='toppings' value={formState.toppings}/>
                    Pepperoni
                    <input type='checkbox' name='toppings' value={formState.toppings}/>
                    Extra Cheese
                    <input type='checkbox' name='toppings' value={formState.toppings}/>
                    Sausage
                    <input type='checkbox' name='toppings' value={formState.toppings}/>
                    Canadian Bacon
                </label>
            </div>
            <br/>            
            <div>
                <label htmlFor='specials'>
                    Add special orders.
                    <textarea name='specials' value={formState.specials}/>
                </label>
            </div>
            <br/>            
            <div>
                <button>Add to Order</button>
            </div>
        </form>     
    )
}

export default Form;
