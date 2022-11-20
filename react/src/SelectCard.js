import React, { useEffect, useState } from 'react'

const SelectCard = ({ handleChange, dStart, dEnd }) => {
    const [dateStart, setDateStart] = useState(dStart)
    const [dateEnd, setDateEnd] = useState(dEnd)

    // useEffect(() => {
    // setDateStart(dStart)
    // setDateEnd(dEnd)
    // console.log(dStart, dEnd);
    // }, [dStart, dEnd])
    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <input type='date' className='form-control' value={dateStart} onChange={e => { setDateStart(e.target.value) }} />
                </div>
                <div className="col-sm-6">
                    <input type='date' className='form-control' value={dateEnd} onChange={e => setDateEnd(e.target.value)} /> </div>
            </div>
            {/* {dStart}, {dEnd} */}
            <select className="form-select mt-2" aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <button type="button" className="btn btn-outline-success mt-2" onClick={() => handleChange({ dateStart }, { dateEnd })}>Success</button>
        </div >
    )
}

export default SelectCard