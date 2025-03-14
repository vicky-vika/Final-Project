import { useState, useEffect, useRef } from "react";

const url = "http://localhost:3000/students";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [ formFields, setFormFields ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        gender: null,
        otherGender: '',
        password: '',
        confirmPassword: ''
    });
    const [ errors, setErrors ] = useState({
        firstNameError: '',
        comparePasswordError: ''
    });
    const [ disabledGenderOther, setDisabledGenderOther ] = useState(true);
    const [ focusGenderOther, setFocusGenderOther ] = useState(false);

    const otherGenderField = useRef(null);

    useEffect(() => {
        if (focusGenderOther) {
            otherGenderField.current.focus();
        }
    },[focusGenderOther]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        if (name==="gender") {
            if (value==="O") {
                setDisabledGenderOther(false);
                setFocusGenderOther(true);
                setFormFields({
                    ...formFields,
                    gender: 'O'
                })
            } else {
                setDisabledGenderOther(true);
                setFocusGenderOther(false);
                setFormFields({
                    ...formFields,
                    gender: value,
                    otherGender: ''
                })
            }
        } else {
            setFormFields({
                ...formFields,
                [name]: value
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formFields);
        let isThereErrors=false;
        for (let property in errors) {
            if (errors[property]!=="") {
                isThereErrors=true;
            }
        }
        if (!isThereErrors) {
            if (formFields.gender==="O" && formFields.otherGender==="") {
                alert("You need to select or specify a gender!");
            } else {
                const dataToInsert={
                    student_first_name: formFields.firstName,
                    student_last_name: formFields.lastName,
                    email: formFields.email,
                    birthdate: formFields.birthdate,
                    gender: formFields.gender,
                    gender_other: formFields.otherGender,
                    password: formFields.password,
                }
                try {
                    const response = await fetch(`${url}`,{
                        method: 'POST',
                        body: JSON.stringify(dataToInsert),
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    });
                    if (!response.ok) {
                        if (response.status===409) {
                            const result = await response.json();
                            throw Error(result.message);
                        } else {
                            throw Error("There was a problem connecting to the database!");
                        }
                    }
                    const result = await response.json();
                    alert(result.message);
                    await fetchStudents();
                    setFormFields({
                        firstName: '',
                        lastName: '',
                        email: '',
                        birthdate: '',
                        gender: null,
                        otherGender: '',
                        password: '',
                        confirmPassword: ''
                    });
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
            }
        } else {
            alert("There are still some errors.")
        }
    }
    const handleComparePassword = () => {
        if (formFields.confirmPassword!=="") {
            if (formFields.confirmPassword!==formFields.password) {
                setErrors({
                    ...errors,
                    comparePasswordError: "Both passwords must be equal!"
                });
            } else {
                setErrors({
                    ...errors,
                    comparePasswordError: ""
                });
            }
        }
    }

    const fetchStudents = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error("There was a problem connecting to the database!");
            }
            const students = await response.json();
            setStudents(students);
        } catch (error) {
            setErrors({
                ...errors,
                error: error.message
            });
            console.log(error);
        }
    }
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <>
            <h1>Student management</h1>
            <form onSubmit={handleSubmit}>
                {errors.error && <small>{errors.error}</small>}
                <p>
                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formFields.firstName}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formFields.lastName}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formFields.email}
                        onChange={handleChange}
                    />
                </p>
                <p>Gender:
                    <label>
                        <input
                            type="radio"
                            value="M"
                            name="gender"
                            onChange={handleChange}
                            checked={formFields.
                                gender === "M"}
                        /> Male</label>
                    <label>
                        <input
                            type="radio"
                            value="F"
                            name="gender"
                            onChange={handleChange}
                            checked={formFields.gender === "F"

                            }
                        /> Female</label>
                    <label>
                        <input
                            type="radio"
                            value="O"
                            name="gender"
                            onChange={handleChange}
                            checked={formFields.
                                gender === "O"}
                        /> Other</label>
                    <input
                        type="text"
                        name="otherGender"
                        value={formFields.otherGender}
                        onChange={handleChange} disabled={disabledGenderOther}
                        ref={otherGenderField} />
                </p>
                <p><label>Password:
                    <input
                        type="password"
                        name="password"
                        value={formFields.password}
                        onChange={handleChange}
                        onBlur={handleComparePassword}
                    />
                </label>
                </p>
                <p><label>Confirm password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formFields.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleComparePassword}
                    />
                </label>
                </p>
                {errors.comparePasswordError && <small>{errors.comparePasswordError}</small>}
                <p><input type="submit" value="Create student" /></p>
            </form>
            <table className="dataTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Birthdate</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student =>
                        <tr key={student.student_id}>
                            <td>{student.student_first_name + " " + student.student_last_name}</td>
                            <td>{student.email}</td>
                            <td>{student.birthdate}</td>
                            <td>
                                {student.gender}
                                {student.gender_other && <span> ({student.gender_other})</span>}
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">Total number of students: <span>{students.length}</span></td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default Students