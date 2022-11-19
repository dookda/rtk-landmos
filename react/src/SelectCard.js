import React, { useState } from 'react'

const SelectCard = () => {
    const [dateStart, setDateStart] = useState('2022-11-30')
    const [dateEnd, setDateEnd] = useState('2022-11-30')

    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <input type='date' className='form-control' value={dateStart} onChange={e => setDateStart(e.target.value)} />
                </div>
                <div className="col-sm-6">
                    <input type='date' className='form-control' value={dateEnd} onChange={e => setDateEnd(e.target.value)} /> </div>
            </div>
            {dateStart} {dateEnd}
            <select className="form-select mt-2" aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

            <button type="button" className="btn btn-outline-success mt-2">Success</button>
        </div>
    )
}

export default SelectCard