import React, { Component } from 'react'
import axios from 'axios';

export default class CreateTodo extends Component {

	state = {
		description: '',
		file: null,
		loading: false,
		uploadPercentage: 0
	}

	onInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.files[0]
		})
	}

	onSubmit = async (e) => {
		e.preventDefault();

		this.setState({loading: true});
		const self = this;

		const formData = new FormData();
		formData.append('description', this.state.description);
		formData.append('file', this.state.file);

		console.log(formData);

		await axios.post('http://localhost:4000/api/todos/' + this.props.activity, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress(progressEvent) {
				const { loaded, total } = progressEvent
				const percent = parseInt((loaded * 100) / total)
				self.setState({uploadPercentage: percent});
			}
		});

		this.setState({
			description: '',
			file: null,
			loading: false,
			uploadPercentage: 0
		});

		document.getElementsByName('file')[0].value = null;

		this.props.getTodos();
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				{this.state.Loading && (
				<div className="progress rounded-0">
						<div className="progress-bar bg-success rounded-0"
							role="progressbar"
							style={{width: `${this.state.uploadPercentage}%`}}
							aria-valuenow="25"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				)}
				<input
					type="text"
					name='description'
					onChange={this.onInputChange}
					value={this.state.description}
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
					onChange={this.handleChange}
				/>
				
				<button className="btn btn-success btn-block mt-2">Guardar</button>
			</form>
		)
	}
}
