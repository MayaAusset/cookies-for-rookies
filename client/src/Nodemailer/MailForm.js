import React, { Component } from 'react';
import './MailForm.css';
import NodemailerService from '../services/nodemailer.service';

export default class MailForm extends Component {


    state = {
        name: '',
        email: '',
        message: `Check out this recipe ! ${this.recipe}`,
        sent: false
    }

    handleName=(e)=>{
        this.setState({
            name: e.target.value 
        })
    };

    handleEmail=(e)=>{
        this.setState({
            email: e.target.value 
        })
    };

    handleMessage=(e)=>{
        this.setState({
            message: e.target.value 
        })
    };


    formSubmit = (e) => {
        e.preventDefault();

        const service = new NodemailerService();


        let data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }

        service
            .sendMail(data)
            .then((res) => {
                this.setState({
                    sent: true,
                }, this.resetForm())
            })
            .catch(() => {
                console.log("message not sent")
            })
    }

    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            message: `Check out this recipe ! ${this.recipe}`,
        })

        setTimeout(()=> {
            this.setState({
                sent: false,
            })
        }, 4000)
    }




    render() {
        return (
            <div className="container mail-form">
             <img src="/mail-logo.png" alt="mail-logo" width="50px"/>
                    <h1>Send this recipe by Email</h1>
                <div className="row">
                   

                    <form onSubmit={this.formSubmit}>
                    <div className="inside-form">


                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="your name here..."
                            value={this.state.name}
                            onChange={this.handleName}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        className="form-control"
                        type="text"
                        name="email"
                        placeholder="your email here..."
                        value={this.state.email}
                        onChange={this.handleEmail}
                        required
                        />
                        </div>

                        <div className="input-form-msg form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                            className="form-control"
                            name="message"
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="your message here"
                            value={this.state.message}
                            onChange={this.handleMessage}
                            >
                            </textarea>
                        </div>

                        <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>Message has been sent</div>

                        <div className="submit-btn"> 
                            <button type="submit">
                                Send Mail
                            </button>
                        </div>

                    </div>
                    </form>

                </div>    
            </div>
        )
    }
}
