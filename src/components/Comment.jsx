import React from 'react'

export default function Comment({ name, imageUrl, description, date }) {
    return (
        <div className='d-flex align-items-center py-3 border-bottom'>
            <img className='rounded-circle' width="50" src={imageUrl} alt="user-image" />
            <div className='pe-3'>
                <h6 className='mb-1'>{name}</h6>
                <p className='mb-1'>{description}</p>
                <span className='fs-ms text-muted'>
                    {date}
                </span>
            </div>
        </div>
    )
}
