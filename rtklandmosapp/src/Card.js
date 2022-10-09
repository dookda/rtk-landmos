import React from 'react'

function Card() {
    return (
        <div>
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <h4 class="card-title">Feedback Form</h4>
                        <div class="card-body">
                            <h4 className="card-title">Feedback Form</h4>
                            <p className="card-text">
                                Gummies bonbon apple pie fruitcake icing biscuit apple pie jelly-o sweet
                                roll. Toffee
                                sugar
                                plum sugar
                                plum jelly-o jujubes bonbon dessert carrot cake.
                            </p>
                            <form className="form" method="post">
                                <div className="form-body">
                                    <div className="form-group">
                                        <label for="feedback1" className="sr-only">Name</label>
                                        <input type="text" id="feedback1" className="form-control" placeholder="Name" name="name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="feedback4" className="sr-only">Last Game</label>
                                        <input type="text" id="feedback4" className="form-control" placeholder="Last Name" name="LastName" />
                                    </div>
                                    <div className="form-group">
                                        <label for="feedback2" className="sr-only">Email</label>
                                        <input type="email" id="feedback2" className="form-control" placeholder="Email" name="email" />
                                    </div>
                                    <div className="form-group">
                                        <select name="reason" className="form-control">
                                            <option value="Inquiry">Inquiry</option>
                                            <option value="Complain">complaints</option>
                                            <option value="Quotation">Quotation</option>
                                        </select>
                                    </div>
                                    <div className="form-group form-label-group">
                                        <textarea className="form-control" id="label-textarea" rows="3" placeholder="Suggestion"></textarea>
                                        <label for="label-textarea"></label>
                                    </div>
                                </div>
                                <div className="form-actions d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary me-1">Submit</button>
                                    <button type="reset" className="btn btn-light-primary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card