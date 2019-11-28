import React, { Component } from 'react';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class Homepage extends Component {
	state = {
		data: [],
		modalOpen: false
	};

	// Component did mount
	componentDidMount = () => {
		this.setState({
			data: [
				{
					kegiatan: 'Lari',
					status: true,
					tanggal: '2019-11-25'
				},
				{
					kegiatan: 'Sarapan',
					status: false,
					tanggal: '2019-11-26'
				}
			]
		});
	};

	// Function render todo
	renderTodo = () => {
		return this.state.data.map((val, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{val.kegiatan}</td>
					<td>{val.status ? 'Sudah' : 'Belum'}</td>
					<td>{val.tanggal}</td>
					<td>
						<button className='btn btn-sm btn-warning'>Edit</button>
						<button
							className='btn btn-sm btn-danger ml-1'
							onClick={() => this.btnDelete(index)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	};

	// Function button tambah data
	btnAdd = () => {
		let kegiatan = this.refs.kegiatan.value;
		let tanggal = this.refs.tanggal.value;
		let obj = {
			kegiatan,
			status: false,
			tanggal
		};

		if (kegiatan === '' || tanggal === '') {
			MySwal.fire('Cancelled', 'Data tidak boleh kosong!', 'error');
		} else {
			let newData = [...this.state.data, obj];
			this.setState({ data: newData, modalOpen: false });
			MySwal.fire('Success', 'Data berhasil di tambah!', 'success');
		}
	};

	btnDelete = index => {
		MySwal.fire({
			title: `Apa kamu yakin hapus ${this.state.data[index].kegiatan}?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Hapus',
			cancelButtonText: 'Cancel',
			reverseButtons: true
		}).then(result => {
			if (result.value) {
				let data = this.state.data;
				data.splice(index, 1);
				this.setState({ data });
				MySwal.fire('Deleted!', 'Data berhasil di hapus!.', 'success');
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				MySwal.fire('Cancelled', 'Data tidak jadi di hapus!', 'error');
			}
		});
	};

	render() {
		return (
			<div className='mx-5 my-5'>
				<div>
					<button
						className='btn btn-sm btn-success rounded mb-5'
						onClick={() => this.setState({ modalOpen: true })}>
						Tambah Data
					</button>
				</div>

				<div>
					<Modal
						isOpen={this.state.modalOpen}
						toggle={() => this.setState({ modalOpen: false })}>
						<ModalHeader>Tambah Data</ModalHeader>
						<ModalBody>
							<div className='form-group'>
								<label htmlFor='kegiatan'>Kegiatan</label>
								<input type='text' ref='kegiatan' className='form-control' />
							</div>
							<div className='form-group'>
								<label htmlFor='tanggal'>Tanggal</label>
								<input type='date' ref='tanggal' className='form-control' />
							</div>
						</ModalBody>
						<ModalFooter>
							<button className='btn btn-sm btn-primary' onClick={this.btnAdd}>
								Add
							</button>
							<button
								className='btn btn-sm btn-secondary'
								onClick={() => this.setState({ modalOpen: false })}>
								Cancel
							</button>
						</ModalFooter>
					</Modal>
				</div>

				<Table striped>
					<thead>
						<tr>
							<th>No</th>
							<th>Tanggal</th>
							<th>Kegiatan</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.renderTodo()}</tbody>
				</Table>
			</div>
		);
	}
}

export default Homepage;
