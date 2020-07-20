export const initialState = {
    formItems:[
        {
            id: 1,
            classes:"",
            type: "text",
            required: true,
            maxlength:15,
            name: "name",
            value: "Waterlabs",
            placeholder:"Enter Your Name",
            errorText:""
        },
        {
            id: 2,
            classes:"",
            type: "number",
            required: false,
            maxlength:3,
            name: "age",
            value: "10",
            placeholder:"Enter Your Age[optional]",
            errorText:""
        },
        {
            id: 3,
            classes:"",
            type: "email",
            required: true,
            name: "email",
            value: '',
            placeholder:"Enter Your Email",
            errorText:""
        },
    ],
    formResults:[]
}