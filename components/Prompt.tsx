import React from 'react'

export const Prompt = () => {
    return (
        <div
            style={{
                padding: 16,
                width: 200,
            }}>
            <h2>Taxiji here!</h2>
            <p>We see you have a taxable transaction!</p>
            <p>Would you like to send your withholding now?</p>
            <div>
                <button>Yes</button>
                <button>Later</button>
            </div>
        </div>
    )
}

export default Prompt;