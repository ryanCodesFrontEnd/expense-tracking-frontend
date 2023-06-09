import {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
// import TextField from '@mui/material/TextField';
import {Select, Button, TextField}  from '@mui/material';



const TransactionEditForm = () => {

  const {user, setUser} = useContext(UserContext)
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false)


  const toggleNewTransactionForm = e => {
    setShowNewTransactionForm(!showNewTransactionForm)
  }

  
  

  const initialTransactionFormValues = {
    vendor_name: '',
    amount_spent: '',
    asset_id: ''

  }

  const [formTransactionData, setFormTransactionData] = useState(initialTransactionFormValues)

const handleTransactionChange = (e) => {
  const {name, value} = e.target
  setFormTransactionData({ ...formTransactionData,[name]: value })
}

const addTransaction = newTransaction => {
  setUser(currentUser => ({...currentUser, transactions: [...currentUser.transactions, newTransaction]}) )
}

const handleTransactionSubmit = e => {
  e.preventDefault()
  fetch('/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formTransactionData) 
  })
  .then(res => {
    if (res.status !== 201) {
      res.json()
      .then(errorObj => console.log(errorObj.error))
    } else {
      res.json()
      .then(addTransaction)

      // .then(t => addTransaction(t))
    }

  })

}

const userAssets = user.assets
console.log(userAssets)
const mappedAssets = userAssets.map(asset =>  (
  <option 
    key ={asset.id} 
    // name={asset.investment_name}
    value={asset.id}
    >{asset.investment_name}</option>
    )
)

// console.log(mappedAssets)    

  return (

    <>
     {showNewTransactionForm ? <span className= 'toggleMenuLabel'>Enter New Transactions</span> : <span className='hideMenuLabel'></span>}

      {showNewTransactionForm ? <span className= 'toggleMenuButton' onClick={toggleNewTransactionForm}>X</span> : <span className= 'hideMenuButton' onClick={toggleNewTransactionForm}> Click here to add new transactions</span>}

      <div className={showNewTransactionForm ? 'transactionMenuActive' : 'transactionMenuHidden'}>
        
        <form 
          className='transactionForm'
          onSubmit={handleTransactionSubmit}>

          <TextField 
            className='addTransactionFormInput'
            type='text'
            label='Place of Purchase'
            name='vendor_name'
            value={user.vendor_name}
            onChange={handleTransactionChange}
          />

          <TextField 
            className='addTransactionFormInput'
            type='text'
            label='Amount'
            name='amount_spent'
            value={user.amount_spent}
            onChange={handleTransactionChange}
          />

          <Select 
            className = 'addTransactionFormInput'
            name='asset_id'
            value={formTransactionData.asset_id}
            onChange={handleTransactionChange}
          >
            {mappedAssets}
          </Select> 
        
          <Button 
            className ='submitButton' 
            color="primary"
            type='submit' 
          >Add Transaction</Button>
          
        </form> 
      </div>
    </>
  )
}

export default TransactionEditForm
