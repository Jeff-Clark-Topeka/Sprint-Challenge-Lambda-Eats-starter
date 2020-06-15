import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios'

const Form = () => {
    
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        toppings: '',
        specials: '' 
    });

    const [post, setPost] = useState([]);

    const [formState, setFormState] = useState({
        name: '',
        size: '',
        toppings: '',
        specials: ''    
    });

    const [buttonDisbled, setButtonDisabled] = useState(true)

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
    };

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field."),
        size: yup.mixed().oneOf(["Small", "Medium", "Large"]).defined(),
        toppings: yup.boolean().oneOf([true]),
        specials: yup.string()
    });

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid); 
        });
    }, [formState]);

    const inputChange = e => {

        e.persist();
        const newFormData = {

            ...formState,
            [e.target.name]:
            e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    };

    const formSubmit = e => {
        e.preventDefault();
        axios
        .post('https://reqres.in/api/users', formState)
        .then(res => {
            setPost(res.data);
            setFormState({
                name: '',
                size: '',
                toppings: '',
                specials: ''
            })
        })
        .catch(err => console.log(err.response))
    }

    return (
        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor='name'>
                    Name
                    <input type='text' name='name' value={formState.name} onChange={inputChange}/>
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label>
            </div>
            <br/>            
            <div>
                <label htmlFor='size'>
                    Sizes
                    <select name='size' value={formState.size} onChange={inputChange}>
                        <option>--Choose a Pizza Size--</option>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                    {errors.size.length > 0 ? <p className="error">{errors.size}</p> : null}
                </label>    
            </div>
            <br/>            
            <div>
                <label htmlFor='toppings'>
                    Toppings: 
                    <input type='checkbox' name='toppings' value={formState.toppings} onChange={inputChange}/>
                    Pepperoni
                    <input type='checkbox' name='toppings' value={formState.toppings} onChange={inputChange}/>
                    Extra Cheese
                    <input type='checkbox' name='toppings' value={formState.toppings} onChange={inputChange}/>
                    Sausage
                    <input type='checkbox' name='toppings' value={formState.toppings} onChange={inputChange}/>
                    Canadian Bacon
                </label>
            </div>
            <br/>            
            <div>
                <label htmlFor='specials'>
                    Add special orders.
                    <textarea name='specials' value={formState.specials} onChange={inputChange}/>
                    {errors.specials.length > 0 ? <p className="error">{errors.specials}</p> : null}
                </label>
            </div>
            <br/>            
            <div>
                <pre>{JSON.stringify(post, null, 1)}</pre>
                <button disabled={buttonDisbled}>Add to Order</button>
            </div>
        </form>     
    );
}

export default Form;
