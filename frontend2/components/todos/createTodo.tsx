import React, { useState } from 'react';
import axios from 'axios';

type InputElement = React.FormEvent<HTMLInputElement>;
type FormElement = React.FormEvent<HTMLFormElement>

const CreateTodo = (props): JSX.Element => {

	const [description, setDescription] = useState<string>('');
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [uploadPercentage, setUploadPercentage] = useState<number>(0);

	const handleChange = (e: InputElement) => {
		setFile(e.currentTarget.files[0])
	}

	const onSubmit = async (e: FormElement) => {
		e.preventDefault();

		setLoading(true);

		const formData = new FormData();
		formData.append('description', description);
		formData.append('file', file);

		await axios.post('http://localhost:4000/api/todos/' + props.activity, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress(progressEvent) {
				const { loaded, total } = progressEvent
				const percent = (loaded * 100) / total
				setUploadPercentage(percent);
			}
		});

		setDescription('');
		setFile(null);
		setLoading(false);
		setUploadPercentage(0);

		// document.getElementsByName('file')[0].value = null;

		props.getTodos();
	}

	return (
		<form onSubmit={ onSubmit }>
			{ loading && (
				<div className="progress rounded-0">
					<div className="progress-bar bg-success rounded-0"
						role="progressbar"
						style={{width: `${ uploadPercentage }%`}}
						aria-valuenow={ 25 }
						aria-valuemin={ 0 }
						aria-valuemax={ 100 }
					></div>
				</div>
			)}
			<input
				type="text"
				name='description'
				onChange={ e => setDescription(e.target.value) }
				value={ description }
				className="form-control"
				autoFocus
				autoComplete='off'
				placeholder='Descripción'
				required
			/>
			<input
				type="file"
				name="file"
				className="form-control-bg-dark rouded-0 mt-2"
				onChange={ handleChange }
			/>
			
			<button className="btn btn-success btn-block mt-2">Guardar</button>
		</form>
	);
}

export default CreateTodo;