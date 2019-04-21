import React, { Component } from 'react'
import Case from './Case';
import axios from 'axios';
import parseJwt from '../../helpers/decryptAuthToken';
import {Redirect} from 'react-router-dom'
export default class ReviewerViewCase extends Component {
    state ={
        cases :[],
        caseid:"",
        reviwerID:"",
        home:0
    };
    async componentDidMount(){

        if (!localStorage.jwtToken) {
            alert("You must login!");
            this.setState({ home: 1 });
            return;
          }
          try{
              await axios.get('api/reviewers/auth')
          }catch(err){
              alert("You are not allowed to access this page");
              this.setState({ home: 1 });
              return;
          }
        await this.setState({home:2});
        const data = parseJwt(localStorage.jwtToken)
        await this.setState({reviwerID:data.id})
        const id =this.state.reviwerID;
       
        const getCases = await axios.get(`api/reviewers/getAllUnsignedCases/${id}`);
        this.setState({cases: getCases.data.data});
    };
    
    async handelClick (index) {
        const id =this.state.reviwerID;
        await axios.get(`api/reviewers/assigncase/${id}/${index}`);
        alert("You Have Taken This Case")
        this.componentDidMount()
    }
    render() {
        if (this.state.home===0) return <div></div>;
        if (this.state.home===1) return <Redirect to={{ pathname: "/" }} />;
        return this.state.cases.length===0?"There are no unassigned cases":
        (this.state.cases.map((x) => (
        <button onClick={() => this.handelClick(x._id)}>
            <Case key={x._id} case={x} />
        </button>
        ))
        )
      }
};

