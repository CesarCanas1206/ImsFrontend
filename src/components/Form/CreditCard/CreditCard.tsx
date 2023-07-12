import React from 'react'
// import Card from 'react-credit-cards'

// import {
//   formatCreditCardNumber,
//   formatCVC,
//   formatExpirationDate,
//   formatFormData,
// } from './utils'

// import 'react-credit-cards/es/styles-compiled.css'

export class CreditCard extends React.Component {
  // form: any = {}

  // state: any = {
  //   number: '',
  //   name: '',
  //   expiry: '',
  //   cvc: '',
  //   issuer: '',
  //   focused: '',
  //   formData: null,
  // }

  // handleCallback = ({ issuer }: any, isValid: any) => {
  //   if (isValid) {
  //     this.setState({ issuer })
  //   }
  // }

  // handleInputFocus = ({ target }: any) => {
  //   this.setState({
  //     focused: target.name,
  //   })
  // }

  // handleInputChange = ({ target }: any) => {
  //   if (target.name === 'number') {
  //     target.value = formatCreditCardNumber(target.value)
  //   } else if (target.name === 'expiry') {
  //     target.value = formatExpirationDate(target.value)
  //   } else if (target.name === 'cvc') {
  //     target.value = formatCVC(target.value)
  //   }

  //   this.setState({ [target.name]: target.value })
  // }

  // handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   const formData = [...e.target.elements]
  //     .filter((d) => d.name)
  //     .reduce((acc, d) => {
  //       acc[d.name] = d.value
  //       return acc
  //     }, {})

  //   this.setState({ formData })
  //   this.form.reset()
  // }

  render() {
    // const { name, number, expiry, cvc, focused, issuer, formData } = this.state

    return <>No card</>

    // return (
    //   <div key="Payment">
    //     <div className="App-payment">
    //       <Card
    //         number={number}
    //         name={name}
    //         expiry={expiry}
    //         cvc={cvc}
    //         focused={focused}
    //         callback={this.handleCallback}
    //       />
    //       <form
    //         ref={(c) => (this.form = c)}
    //         className="d-flex gap-2 flex-column mt-2"
    //         onSubmit={this.handleSubmit}
    //       >
    //         <div className="form-group">
    //           <input
    //             type="tel"
    //             name="number"
    //             className="form-control"
    //             placeholder="Card Number"
    //             pattern="[\d| ]{16,22}"
    //             required
    //             onChange={this.handleInputChange}
    //             onFocus={this.handleInputFocus}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input
    //             type="text"
    //             name="name"
    //             className="form-control"
    //             placeholder="Name"
    //             required
    //             onChange={this.handleInputChange}
    //             onFocus={this.handleInputFocus}
    //           />
    //         </div>
    //         <div className="row">
    //           <div className="col-6">
    //             <input
    //               type="tel"
    //               name="expiry"
    //               className="form-control"
    //               placeholder="Valid Thru"
    //               pattern="\d\d/\d\d"
    //               required
    //               onChange={this.handleInputChange}
    //               onFocus={this.handleInputFocus}
    //             />
    //           </div>
    //           <div className="col-6">
    //             <input
    //               type="tel"
    //               name="cvc"
    //               className="form-control"
    //               placeholder="CVC"
    //               pattern="\d{3,4}"
    //               required
    //               onChange={this.handleInputChange}
    //               onFocus={this.handleInputFocus}
    //             />
    //           </div>
    //         </div>
    //         <input type="hidden" name="issuer" value={issuer} />
    //       </form>
    //       {formData && (
    //         <div className="App-highlight">
    //           {formatFormData(formData).map((d, i) => (
    //             <div key={i}>{d}</div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // )
  }
}

export default CreditCard
