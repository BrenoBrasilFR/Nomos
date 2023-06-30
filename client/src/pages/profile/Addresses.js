import Country from "./Country"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAddress } from "../../redux/slices/userSlice"
import Address from "./Address"

const Addresses = () => {
   let [street, setstreet] = useState("")
   let [city, setcity] = useState("")
   let [postalCode, setpostalCode] = useState("")
   let [country, setcountry] = useState("")
   let addresses = useSelector(state => state.userSession.addresses)
   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()

      let form = {
         street: street,
         city: city,
         postalCode: postalCode,
         country: country
      }

      form = JSON.stringify(form)

      fetch('/api/user_session/add_address', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: form
      }).then(res => res.json().then(response => {
         switch (res.status) {
            case 200:
               document.getElementById('street-address').value = ''
               document.getElementById('postal-code').value = ''
               document.getElementById('city').value = ''
               document.getElementById('country').value = ''
               toggleDropdown()
               dispatch(addAddress(response[0]))
               break;
            case 500:
               break;
            default:
         }
      }))
   }

   function toggleDropdown() {
      const dropdown = document.querySelector('#dropdownAddress');
      dropdown.classList.toggle('dropdown-show');
   }

   return (
      <div id="addresses">
         <h3>My Addresses</h3>
         <div id="addAddress" onClick={toggleDropdown}>
            <div id="plus"><div id="div1"></div><div id="div2"></div></div>
            <h4>Add New Address</h4>
         </div>
         <div id="dropdownAddress" data-dropdown>
            <div id="closeDropdown" onClick={toggleDropdown}><div id="div1"></div><div id="div2"></div></div>
            <form onSubmit={handleSubmit}>
               <div>
                  <label htmlFor="street-address">Street address</label>
                  <input type="text" id="street-address" name="street-address" onChange={e => setstreet(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor="postal-code">ZIP or postal code</label>
                  <input type="text" id="postal-code" name="postal-code" onChange={e => setpostalCode(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" onChange={e => setcity(e.target.value)} required />
               </div>
               <div>
                  <label htmlFor="country">Country or region</label>
                  <select id="country" name="country" onChange={e => setcountry(e.target.value)} required >
                     <Country />
                  </select>
               </div>
               <button>Add Address</button>
            </form>
         </div>
         <div>
            {addresses.map(address => {
               return <Address address={address} key={address.id} location='profile' />
            })}
         </div>
      </div>
   )
}

export default Addresses