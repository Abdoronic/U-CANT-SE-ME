import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';

export default class ReviewerViewTasks extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"5ca9eeca72c0c6231cc3c7cf"
    };

    async componentDidMount(){

        const id =this.state.reviwerID;
        const getCases = await axios.get(`http://localhost:5000/api/reviewers/reviewerTasks/${id}`);
        this.setState({cases: getCases.data.Tasks});

    };
    accept=async (caseId)=>
    {
        await axios.put(`http://localhost:5000/api/reviewers/updateCaseStatus/${caseId}/Accepted`);
        this.componentDidMount()
    }
    render() {
        return (this.state.cases.map((x) => (
            <div>
                <Case key={x._id} case={x} />
                <button onClick={() => this.accept(x._id)}>Accept</button>
            </div>
        ))
        )
      }

};