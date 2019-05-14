import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5 center'>
					<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} />
					<button className='w-30 f4 grow link ph3 pv2 dib white bg-blue' onClick={onPictureSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;